package com.contiq.userservice.service;

import com.contiq.userservice.dto.UserDTO;
import com.contiq.userservice.entity.User;

import java.util.List;

public interface UserService {
    List<UserDTO> findAll();

    UserDTO findById(int userId);

   UserDTO saveUser(User user);

    UserDTO updateUserById(int userId,String password);

    UserDTO getUserByEmail(String email);

    UserDTO getUserByEmailAndPassword(String  email,String password);

}
