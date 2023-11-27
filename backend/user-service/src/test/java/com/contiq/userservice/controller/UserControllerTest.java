package com.contiq.userservice.controller;

import com.contiq.userservice.dto.UserDTO;
import com.contiq.userservice.entity.User;
import com.contiq.userservice.service.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.ws.rs.core.MediaType;
import org.junit.Rule;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.MockitoJUnit;
import org.mockito.junit.MockitoRule;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.util.NestedServletException;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doReturn;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

 class UserControllerTest {
    private MockMvc mockMvc;

    @Rule
    public MockitoRule mockitoRule = MockitoJUnit.rule();

    @Mock
    private UserService userService;

    @InjectMocks
    private UserController userController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(userController).build();
    }


    @Test
    void testFindAllUsers() throws Exception {
        List<UserDTO> userDTOList = new ArrayList<>();
        ZonedDateTime currentDateTimeIST = ZonedDateTime.now(ZoneId.of("Asia/Kolkata"));

        userDTOList.add(new UserDTO(1, "John", "Doe@gmail.com", currentDateTimeIST, currentDateTimeIST));
        userDTOList.add(new UserDTO(2, "Alice", "Smith@gmail.com", currentDateTimeIST, currentDateTimeIST));

        when(userService.findAll()).thenReturn(userDTOList);



        mockMvc.perform(MockMvcRequestBuilders.get("/api/users"))
                .andExpect(status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.length()").value(userDTOList.size()));
    }
     @Test
     void testUpdateUser() throws Exception {
         int userId = 1;
         String newPassword = "newPassword";
         ZonedDateTime currentDateTimeIST = ZonedDateTime.now(ZoneId.of("Asia/Kolkata"));
         UserDTO updatedUserDTO = new UserDTO(userId, "John", "Doe@gmail.com", currentDateTimeIST, currentDateTimeIST);

         when(userService.updateUserById(userId, newPassword)).thenReturn(updatedUserDTO);

         mockMvc.perform(MockMvcRequestBuilders.patch("/api/users/{userId}", userId)
                         .contentType(MediaType.APPLICATION_JSON)
                         .content("{\"password\": \"" + newPassword + "\"}")) // Include the password in the request body
                 .andExpect(status().isOk())
                 .andExpect(MockMvcResultMatchers.jsonPath("$.id").value(updatedUserDTO.getId()));
     }
    @Test
   void testCreateUser() throws Exception {
        User newUser = new User();
        newUser.setId(1);
        newUser.setUsername("John");
        newUser.setEmail("Doe@gmail.com");
        newUser.setPassword("password");
        ZonedDateTime currentDateTimeIST = ZonedDateTime.now(ZoneId.of("Asia/Kolkata"));

        UserDTO newUserDTO = new UserDTO(1, "John", "Doe@gmail.com", currentDateTimeIST, currentDateTimeIST);

        when(userService.saveUser(any(User.class))).thenReturn(newUserDTO);

        mockMvc.perform(MockMvcRequestBuilders.post("/api/users")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content((new ObjectMapper().writeValueAsString(newUser))))
                .andExpect(MockMvcResultMatchers.jsonPath("$.id").value(newUserDTO.getId()))
                .andExpect(MockMvcResultMatchers.jsonPath("$.username").value(newUserDTO.getUsername()))
                .andExpect(MockMvcResultMatchers.jsonPath("$.email").value(newUserDTO.getEmail()));
    }

    @Test
    void testGetUserByEmail() throws Exception {
        String email = "test@example.com";
        ZonedDateTime currentDateTimeIST = ZonedDateTime.now(ZoneId.of("Asia/Kolkata"));
        UserDTO userDTO = new UserDTO(1, "John", email, currentDateTimeIST, currentDateTimeIST);

        when(userService.getUserByEmail(email)).thenReturn(userDTO);

        mockMvc.perform(MockMvcRequestBuilders.get("/api/users/email?email={email}", email))
                .andExpect(status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.email").value(email));
    }

    @Test
    void testFindUserById() throws Exception {
        int userId = 1;
        ZonedDateTime currentDateTimeIST = ZonedDateTime.now(ZoneId.of("Asia/Kolkata"));
        UserDTO userDTO = new UserDTO(1, "John", "john@gmail.com", currentDateTimeIST, currentDateTimeIST);

        when(userService.findById(userId)).thenReturn(userDTO);

        mockMvc.perform(MockMvcRequestBuilders.get("/api/users/{userId}", userId))
                .andExpect(status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.id").value(userId));
    }

    @Test
    void testGetUserByEmailAndPassword() throws Exception {
        String email = "test@example.com";
        String password="password";
        ZonedDateTime currentDateTimeIST = ZonedDateTime.now(ZoneId.of("Asia/Kolkata"));
        UserDTO userDTO = new UserDTO(1, "John", email, currentDateTimeIST, currentDateTimeIST);

        when(userService.getUserByEmailAndPassword(email,password)).thenReturn(userDTO);

        mockMvc.perform(MockMvcRequestBuilders.get("/api/users/login?password={password}&email={email}", password,email))
                .andExpect(status().isOk());
    }

     @Test
     void testFindUserByIdNotFound() throws Exception {
         int userId = 1;
         doReturn(null).when(userService).findById(userId);

         mockMvc.perform(MockMvcRequestBuilders.get("/api/users/{userId}", userId))
                 .andExpect(MockMvcResultMatchers.status().isNotFound());
     }
     @Test
     void testUpdateUserNotFound() throws Exception {
         int userId = 1;
         String newPassword = "newPassword";
         doReturn(null).when(userService).updateUserById(userId, newPassword);

         mockMvc.perform(MockMvcRequestBuilders.patch("/api/users/{userId}", userId)
                         .contentType(MediaType.APPLICATION_JSON)
                         .content("{\"password\": \"" + newPassword + "\"}")) // Include the password in the request body
                 .andExpect(status().isNotFound());  // Ensure that the response status is NOT_FOUND
     }

     @Test
     void testGetUserByEmailNotFound() throws Exception {
         String email = "test@example.com";
         doReturn(null).when(userService).getUserByEmail(email);

         mockMvc.perform(MockMvcRequestBuilders.get("/api/users/email")
                         .param("email", email))
                 .andExpect(MockMvcResultMatchers.status().isNotFound());
     }

     @Test
     void testGetUserByEmailAndPasswordUnauthorized() throws Exception {
         String email = "test@example.com";
         String password = "password";
         doReturn(null).when(userService).getUserByEmailAndPassword(email, password);

         mockMvc.perform(MockMvcRequestBuilders.get("/api/users/login")
                         .param("email", email)
                         .param("password", password))
                 .andExpect(MockMvcResultMatchers.status().isUnauthorized());
     }

     @Test
     void testUpdateUserWithEmptyPassword() throws Exception {
         int userId = 1;
         String newPassword = ""; // Empty password
         mockMvc.perform(MockMvcRequestBuilders.patch("/api/users/{userId}", userId)
                         .param("password", newPassword)
                         .contentType(MediaType.APPLICATION_JSON))
                 .andExpect(status().isBadRequest());
     }

     @Test
     void testUpdateUserWithNullPassword() throws Exception {
         int userId = 1;
         String newPassword = null; // Null password
         mockMvc.perform(MockMvcRequestBuilders.patch("/api/users/{userId}", userId)
                         .param("password", newPassword)
                         .contentType(MediaType.APPLICATION_JSON))
                 .andExpect(status().isBadRequest());
     }


 }








