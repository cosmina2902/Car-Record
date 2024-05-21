package recea.licenta.evidentacheltuielmasini.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import recea.licenta.evidentacheltuielmasini.enitity.PozaMasina;

import java.util.Optional;

public interface PozaMasinaRepository extends JpaRepository<PozaMasina, Long> {

    Optional <PozaMasina> findByName(String fileName);
}
