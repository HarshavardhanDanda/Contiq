package com.contiq.userservice.service;

import com.contiq.userservice.config.UserMapper;
import com.contiq.userservice.dto.UserDTO;
import com.contiq.userservice.entity.User;
import com.contiq.userservice.exception.UserNotFoundException;
import com.contiq.userservice.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.List;
import java.util.Optional;

@Service
@Slf4j
public class UserServiceImplementation implements  UserService{


    private UserRepository userRepository;
    private UserMapper userMapper;
    @Autowired
    public UserServiceImplementation(UserRepository userRepository,UserMapper userMapper)
    {
        this.userRepository=userRepository;
        this.userMapper=userMapper;
    }

    @Override
    public List<UserDTO> findAll() {
        List<User> users=userRepository.findAll();
        return users.stream()
                .map(userMapper::convertEntityToDTO)
                .toList();
    }

    @Override
    public UserDTO findById(int userId) {
        Optional<User> user=userRepository.findById(userId);
        if(user.isPresent()){
            return userMapper.convertEntityToDTO(user.get());
        } else{
            log.error("User not found with given Id: {}", userId);
            throw new UserNotFoundException("User doesnot exist with id: "+userId);
        }
    }

    @Override
    public UserDTO saveUser(User user) {
        ZonedDateTime currentDateTimeIST = ZonedDateTime.now(ZoneId.of("Asia/Kolkata"));
        user.setUpdatedAt(currentDateTimeIST);
        user.setCreatedAt(currentDateTimeIST);
        userRepository.save(user);
        return userMapper.convertEntityToDTO(user);
    }

    @Override
    public UserDTO updateUserById(int userId, String newPassword) {
        if (userRepository.existsById(userId)) {
            User user = userRepository.findById(userId).get();

            if (user.getPassword().equals(newPassword)) {
                log.error("New password cannot be the same as the old password.");
                throw new IllegalArgumentException("New password cannot be the same as the old password.");
            }

            user.setPassword(newPassword);
            ZonedDateTime currentDateTimeIST = ZonedDateTime.now(ZoneId.of("Asia/Kolkata"));
            user.setUpdatedAt(currentDateTimeIST);
            userRepository.save(user);
            return userMapper.convertEntityToDTO(user);
        } else {
            log.error("User not found with given Id: {}", userId);
            throw new UserNotFoundException("User is not found at " + userId);
        }
    }


    @Override
    public UserDTO getUserByEmail(String email) {
        Optional<User> user=userRepository.findByEmail(email);
        if(user.isPresent())
            return userMapper.convertEntityToDTO(user.get());
        else {
            log.error("User not found with given Email: {}", email);
            throw new UserNotFoundException("The user doesnot exist with email " + email);
        }
    }

    @Override
    public UserDTO getUserByEmailAndPassword(String email, String password) {
        Optional<User> user=userRepository.findByEmailAndPassword(email,password);
        if(user.isPresent())
            return userMapper.convertEntityToDTO(user.get());
        else{
            log.error("User not found with given Email: {}", email);
            throw new UserNotFoundException("The user doesnot exist with an email "+email);
    }}

}
