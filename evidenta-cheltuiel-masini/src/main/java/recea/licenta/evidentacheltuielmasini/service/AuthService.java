package recea.licenta.evidentacheltuielmasini.service;

import recea.licenta.evidentacheltuielmasini.dto.LoginDto;
import recea.licenta.evidentacheltuielmasini.dto.RegisterDto;
import recea.licenta.evidentacheltuielmasini.dto.UserDto;
import recea.licenta.evidentacheltuielmasini.enitity.User;

import java.util.List;

public interface AuthService {
    String register(RegisterDto registerDto);

    String login(LoginDto loginDto);

    String resetPassword (String email);

    UserDto getUserById(Long id);

    UserDto getUserByEmail(String email );

    String setNewPassword(String email, String password, Long resetNumber);
}
