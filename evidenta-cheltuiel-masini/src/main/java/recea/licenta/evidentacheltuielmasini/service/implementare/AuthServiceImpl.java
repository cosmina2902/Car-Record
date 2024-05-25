package recea.licenta.evidentacheltuielmasini.service.implementare;

import jakarta.mail.MessagingException;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import recea.licenta.evidentacheltuielmasini.dto.LoginDto;
import recea.licenta.evidentacheltuielmasini.dto.MasinaDto;
import recea.licenta.evidentacheltuielmasini.dto.RegisterDto;
import recea.licenta.evidentacheltuielmasini.dto.UserDto;
import recea.licenta.evidentacheltuielmasini.enitity.Masina;
import recea.licenta.evidentacheltuielmasini.enitity.NumberResset;
import recea.licenta.evidentacheltuielmasini.enitity.Role;
import recea.licenta.evidentacheltuielmasini.enitity.User;
import recea.licenta.evidentacheltuielmasini.exception.MasiniApiException;
import recea.licenta.evidentacheltuielmasini.exception.ResourceNotFound;
import recea.licenta.evidentacheltuielmasini.repository.NumberResetRepository;
import recea.licenta.evidentacheltuielmasini.repository.RolesRepository;
import recea.licenta.evidentacheltuielmasini.repository.UserRepository;
import recea.licenta.evidentacheltuielmasini.service.AuthService;
import recea.licenta.evidentacheltuielmasini.service.EmailSenderService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class AuthServiceImpl implements AuthService {
    private static final Logger logger = LoggerFactory.getLogger(AuthService.class);

    private UserRepository userRepository;
    private RolesRepository rolesRepository;
    private PasswordEncoder passwordEncoder;

    private NumberResetRepository numberResetRepository;

    private NumberResetServiceImpl numberResetService;
    private AuthenticationManager authenticationManager;

    private ModelMapper modelMapper;

    private EmailSenderService emailSenderService;
    @Override
    public String register(RegisterDto registerDto) {

    if(userRepository.existsByUsername(registerDto.getUsername())){
        throw new MasiniApiException(HttpStatus.BAD_REQUEST, "Username-ul deja exista");

    }
        if(userRepository.existsByEmail(registerDto.getEmail())){
            throw new MasiniApiException(HttpStatus.BAD_REQUEST, "Email-ul deja exista");

        }
        User user = new User();
        user.setName(registerDto.getName());
        user.setEmail(registerDto.getEmail());
        user.setUsername(registerDto.getUsername());
        user.setPassword(passwordEncoder.encode(registerDto.getPassword()));
        Set<Role> roles = new HashSet<>();

      Role userRole =  rolesRepository.findByName("ROLE_USER");
      roles.add(userRole);

        user.setRoles(roles);
        userRepository.save(user);

        return "User inregistrat cu success";
    }

    @Override
    public String login(LoginDto loginDto) {
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                loginDto.getUsernameOrEmail(),
                loginDto.getPassword()
        ));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        return "User login cu success";
    }

    @Override
    public String resetPassword(String email) {
         User existUser = userRepository.findByEmail(email)
                 .orElseThrow(()-> new ResourceNotFound("User-ul cu email-ul " + email + " nu exista!"));

         numberResetService.addNumberReset(existUser.getUsername());

         Long resetNumber = numberResetRepository.findByUser(existUser).getNumber();

         try{
             emailSenderService.sendEmailForgotPassword(existUser.getEmail(), "Resetare Parola", resetNumber);


         } catch (MessagingException e) {
             throw new RuntimeException("Nu s-a putut trimite email-ul");
         }

        return  "Verifica email-ul primit pentru a reseta parola";
    }

    @Override
    public UserDto getUserById(Long id) {

        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFound("User-ul cu id-ul " + id + " nu a fost gasit"));

        return modelMapper.map(user, UserDto.class);

    }

    @Override
    public UserDto getUserByEmail(String email ) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFound("User-ul cu email-ul " + email + " nu a fost gasit"));

        return modelMapper.map(user, UserDto.class);

    }

    @Override
    public String setNewPassword(String email, String newPassword, Long resetNumber) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFound("User-ul cu email-ul " + email + " nu a fost gasit"));
        NumberResset numberResset = numberResetRepository.findByUser(user);
        System.out.println(resetNumber);
        System.out.println(numberResset.getNumber());
        if(resetNumber.equals(numberResset.getNumber())){
            user.setPassword(passwordEncoder.encode(newPassword));
            userRepository.save(user);
        }
        else{
            throw new ResourceNotFound("Numarul generat nu corespunde cu numarul atribuit!");
        }


        return "Noua parola a fost reactualizata incearca sa te loggezi din nou";
    }


}
