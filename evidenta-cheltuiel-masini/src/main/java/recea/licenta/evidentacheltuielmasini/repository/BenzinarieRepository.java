package recea.licenta.evidentacheltuielmasini.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import recea.licenta.evidentacheltuielmasini.enitity.Benzinarie;

import java.util.List;

public interface BenzinarieRepository extends JpaRepository<Benzinarie, Long> {

    List<Benzinarie> findByOras(String oras);
}
