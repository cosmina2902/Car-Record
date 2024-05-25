package recea.licenta.evidentacheltuielmasini.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import recea.licenta.evidentacheltuielmasini.dto.LoginDto;
import recea.licenta.evidentacheltuielmasini.dto.NumberResetDto;
import recea.licenta.evidentacheltuielmasini.dto.RegisterDto;
import recea.licenta.evidentacheltuielmasini.dto.UserDto;
import recea.licenta.evidentacheltuielmasini.enitity.User;
import recea.licenta.evidentacheltuielmasini.exception.MasiniApiException;
import recea.licenta.evidentacheltuielmasini.repository.UserRepository;
import recea.licenta.evidentacheltuielmasini.service.AuthService;
import recea.licenta.evidentacheltuielmasini.service.NumberResetService;

@RestController
@RequestMapping("/auth")
@AllArgsConstructor
@CrossOrigin
public class AuthController {

    private final AuthService authService;

    private UserRepository userRepository;

    private NumberResetService numberResetService;

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody RegisterDto registerDto) {
        String raspuns = authService.register(registerDto);
        return new ResponseEntity<>(raspuns, HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginDto loginDto) {
        String raspuns = authService.login(loginDto);
        return ResponseEntity.ok(raspuns);
    }

    @PutMapping("/forgot")
    public ResponseEntity<String> forgotPassword(@RequestParam String email) {
        String message = authService.resetPassword(email);
        return ResponseEntity.ok(message);
    }

    @PutMapping("/set-new-password")
    public ResponseEntity<String> setPassword(@RequestParam String email, @RequestParam Long number,
                                              @RequestHeader String password ) {
        String message = authService.setNewPassword(email, password, number);
        return ResponseEntity.ok(message);
    }

    @GetMapping("user/{id}")
    public ResponseEntity<UserDto> getUserById(@PathVariable Long id) {
        UserDto user = authService.getUserById(id);
        return ResponseEntity.ok(user);
    }

    @GetMapping("user/email/{email}")
    public ResponseEntity<UserDto> getUserByEmail(@PathVariable String email) {
        UserDto user = authService.getUserByEmail(email);
        return ResponseEntity.ok(user);
    }

    @PostMapping("/number")
    public ResponseEntity<String> addNumberReset (){

        User currentUser = getCurrentUser();

        String numberResetDto = numberResetService.addNumberReset(currentUser.getUsername());

        return new ResponseEntity<>(numberResetDto, HttpStatus.CREATED);

    }

    @GetMapping("/number")
    public ResponseEntity<Long> getNumberReset(){
        User currentUser = getCurrentUser();

        Long numberReset = numberResetService.getNumberReset(currentUser.getUsername());

        return ResponseEntity.ok(numberReset);
    }



    private User getCurrentUser() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new MasiniApiException(HttpStatus.NOT_FOUND, "Utilizatorul nu a fost găsit"));
    }
}
