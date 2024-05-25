package recea.licenta.evidentacheltuielmasini.security;

import lombok.AllArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import recea.licenta.evidentacheltuielmasini.enitity.User;
import recea.licenta.evidentacheltuielmasini.exception.ResourceNotFound;
import recea.licenta.evidentacheltuielmasini.repository.UserRepository;

import java.util.Set;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {
    UserRepository userRepository;
    @Override
    public UserDetails loadUserByUsername(String usernameOrEmail) throws UsernameNotFoundException {

        User user = userRepository.findByUsernameOrEmail(usernameOrEmail, usernameOrEmail )
                .orElseThrow(()-> new ResourceNotFound("User-ul " + usernameOrEmail + " nu a fost gasit"));

        Set<GrantedAuthority> authority = user.getRoles().stream()
                .map(role -> new SimpleGrantedAuthority(role.getName())).collect(Collectors.toSet());


        return new org.springframework.security.core.userdetails.User(
                usernameOrEmail,
                user.getPassword(),
                authority
        );
    }
}
