package com.contiq.userservice.service;

import com.contiq.userservice.config.UserMapper;
import com.contiq.userservice.controller.UserController;
import com.contiq.userservice.dto.UserDTO;
import com.contiq.userservice.entity.User;
import com.contiq.userservice.exception.UserNotFoundException;
import com.contiq.userservice.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;



@AutoConfigureMockMvc
class UserServiceImplementationTest {
    @Mock
    private UserRepository userRepository;
    @Autowired
    private MockMvc mockMvc;

    @InjectMocks
    private UserServiceImplementation userService;
    @Mock
    private UserMapper userMapper;
    @Mock
    private UserService userService1;

    @InjectMocks
    private UserController userController;



    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testFindAll() {
        List<User> users = new ArrayList<>();
        ZonedDateTime currentDateTimeIST = ZonedDateTime.now(ZoneId.of("Asia/Kolkata"));

        users.add(new User(1, "John", "Doe@gmail.com", "password", currentDateTimeIST, currentDateTimeIST));
        users.add(new User(2, "Alice", "Smith@gmail.com", "password2", currentDateTimeIST, currentDateTimeIST));

        List<UserDTO> userDTOs = new ArrayList<>();
        userDTOs.add(new UserDTO(1, "John", "Doe@gmail.com", currentDateTimeIST, currentDateTimeIST));
        userDTOs.add(new UserDTO(2, "Alice", "Smith@gmail.com", currentDateTimeIST, currentDateTimeIST));

        when(userRepository.findAll()).thenReturn(users);
        when(userMapper.convertEntityToDTO(users.get(0))).thenReturn(userDTOs.get(0));
        when(userMapper.convertEntityToDTO(users.get(1))).thenReturn(userDTOs.get(1));

        List<UserDTO> result = userService.findAll();

        assertEquals(userDTOs, result);
    }

    @Test
    void testFindById() {
        int userId = 1;
        ZonedDateTime currentDateTimeIST = ZonedDateTime.now(ZoneId.of("Asia/Kolkata"));

        User user = new User(1, "Joe", "joe@gmail.com", "password", currentDateTimeIST, currentDateTimeIST);
        UserDTO userDTO = new UserDTO(userId, "Joe", "Joe@gmail.com", currentDateTimeIST, currentDateTimeIST);

        when(userRepository.findById(userId)).thenReturn(Optional.of(user));
        when(userMapper.convertEntityToDTO(user)).thenReturn(userDTO);

        UserDTO result = userService.findById(userId);

        assertEquals(userDTO, result);
    }

    @Test
    void testFindByIdUserNotFound() {
        int userId = 1;
        when(userRepository.findById(userId)).thenReturn(Optional.empty());

        assertThrows(UserNotFoundException.class, () -> userService.findById(userId));
    }

    @Test
    void testSaveUser() {
        int userId = 1;
        ZonedDateTime currentDateTimeIST = ZonedDateTime.now(ZoneId.of("Asia/Kolkata"));

        User user = new User(1, "Doe", "Doejh@gmail.com", "password", currentDateTimeIST, currentDateTimeIST);
        UserDTO userDTO = new UserDTO(userId, "Doe", "Doejh@gmail.com", currentDateTimeIST, currentDateTimeIST);

        when(userMapper.convertDTOToEntity(userDTO)).thenReturn(user);
        when(userRepository.save(user)).thenReturn(user);
        when(userMapper.convertEntityToDTO(user)).thenReturn(userDTO);

        UserDTO result = userService.saveUser(user);

        assertEquals(userDTO, result);
    }


    @Test
    void testUpdateUser() throws Exception {
        int userId = 1;
        String newPassword = "newPassword";
        ZonedDateTime currentDateTimeIST = ZonedDateTime.now(ZoneId.of("Asia/Kolkata"));

        User existingUser = new User(userId, "John", "john@example.com", "oldPassword", currentDateTimeIST, currentDateTimeIST);
        UserDTO userDTO = new UserDTO(userId, "John", "john@example.com", currentDateTimeIST, currentDateTimeIST);

        when(userRepository.existsById(userId)).thenReturn(true);
        when(userRepository.findById(userId)).thenReturn(Optional.of(existingUser));
        when(userRepository.save(existingUser)).thenReturn(existingUser);
        when(userMapper.convertEntityToDTO(existingUser)).thenReturn(userDTO);

        UserDTO updatedUserDTO = userService.updateUserById(userId, newPassword);


        assertEquals(newPassword, existingUser.getPassword());

        assertEquals(userId, updatedUserDTO.getId());
        assertEquals(existingUser.getUsername(), updatedUserDTO.getUsername());
        assertEquals(existingUser.getEmail(), updatedUserDTO.getEmail());
    }


@Test
    void testUpdateUserByIdUserNotFound() {
        int userId = 1;
        when(userRepository.existsById(userId)).thenReturn(false);

        assertThrows(UserNotFoundException.class, () -> userService.updateUserById(userId, "password"));
    }

    @Test
    void testGetUserByEmail() {
        String email = "test@example.com";

        ZonedDateTime currentDateTimeIST = ZonedDateTime.now(ZoneId.of("Asia/Kolkata"));

        User user = new User(1, "John", "john@gmail.com", "password", currentDateTimeIST, currentDateTimeIST);
        UserDTO userDTO = new UserDTO(1,  "John", "john@gmail.com", currentDateTimeIST, currentDateTimeIST);

        when(userRepository.findByEmail(email)).thenReturn(Optional.of(user));
        when(userMapper.convertEntityToDTO(user)).thenReturn(userDTO);

        UserDTO result = userService.getUserByEmail(email);

        assertEquals(userDTO, result);
    }

    @Test
    void testGetUserByEmailAndPassword() {
        String email = "test@example.com";
        String password="password";
        ZonedDateTime currentDateTimeIST = ZonedDateTime.now(ZoneId.of("Asia/Kolkata"));

        User user = new User(1, "John", "john@gmail.com", "password", currentDateTimeIST, currentDateTimeIST);
        UserDTO userDTO = new UserDTO(1,  "John", "john@gmail.com", currentDateTimeIST, currentDateTimeIST);

        when(userRepository.findByEmailAndPassword(email,password)).thenReturn(Optional.of(user));
        when(userMapper.convertEntityToDTO(user)).thenReturn(userDTO);

        UserDTO result = userService.getUserByEmailAndPassword(email,password);

        assertEquals(userDTO, result);
    }


    @Test
    void testGetUserByEmailNotFound() {
        String email = "test@example.com";
        when(userRepository.findByEmail(email)).thenReturn(Optional.empty());

        assertThrows(UserNotFoundException.class, () -> userService.getUserByEmail(email));
    }

    @Test
    void testGetUserByEmailAndPasswordNotFound() {
        String email = "test@example.com";
        String password="password";
        when(userRepository.findByEmailAndPassword(email,password)).thenReturn(Optional.empty());

        assertThrows(UserNotFoundException.class, () -> userService.getUserByEmailAndPassword(email,password));
    }

    @Test
    void testUpdateUserWithSamePassword() throws Exception {
        int userId = 1;
        String newPassword = "password";
        ZonedDateTime currentDateTimeIST = ZonedDateTime.now(ZoneId.of("Asia/Kolkata"));

        User existingUser = new User(userId, "John", "john@example.com", "password", currentDateTimeIST, currentDateTimeIST);
        UserDTO userDTO = new UserDTO(userId, "John", "john@example.com", currentDateTimeIST, currentDateTimeIST);

        when(userRepository.existsById(userId)).thenReturn(true);
        when(userRepository.findById(userId)).thenReturn(Optional.of(existingUser));
        when(userRepository.save(existingUser)).thenReturn(existingUser);
        when(userMapper.convertEntityToDTO(existingUser)).thenReturn(userDTO);

        // Invoke the updateUserById method
        IllegalArgumentException exception = assertThrows(IllegalArgumentException.class, () -> {
            userService.updateUserById(userId, newPassword);
        });

        // Assert the exception message
        assertEquals("New password cannot be the same as the old password.", exception.getMessage());


    }

}
