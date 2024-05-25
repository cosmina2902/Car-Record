package recea.licenta.evidentacheltuielmasini.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import recea.licenta.evidentacheltuielmasini.enitity.User;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByUsername(String username);

    Boolean existsByEmail(String email);
    Boolean existsByUsername(String username);

    Optional<User> findByUsernameOrEmail(String username, String email);

    Optional <User> findByEmail(String email);
}
