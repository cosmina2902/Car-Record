package recea.licenta.evidentacheltuielmasini.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import recea.licenta.evidentacheltuielmasini.enitity.NumberResset;
import recea.licenta.evidentacheltuielmasini.enitity.User;

import java.time.LocalDateTime;

public interface NumberResetRepository extends JpaRepository<NumberResset, Long> {

    NumberResset findByUser(User user);
    void deleteAllByCreatedAtBefore(LocalDateTime dateTime);
}

