package com.contiq.userservice.config;

import com.contiq.userservice.dto.UserDTO;
import com.contiq.userservice.entity.User;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {
    private ModelMapper modelMapper;

    public UserMapper(ModelMapper modelmapper)
    {
        this.modelMapper=modelmapper;
    }

    public UserDTO convertEntityToDTO(User user)
    {
        return modelMapper.map(user,UserDTO.class);
    }
    public User convertDTOToEntity(UserDTO userDTO)
    {
        return modelMapper.map(userDTO,User.class);
    }

}
