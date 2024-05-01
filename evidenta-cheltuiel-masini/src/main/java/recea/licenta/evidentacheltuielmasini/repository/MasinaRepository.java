package recea.licenta.evidentacheltuielmasini.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import recea.licenta.evidentacheltuielmasini.enitity.Masina;

public interface MasinaRepository  extends JpaRepository<Masina, Long> {
    Masina findByNumarInmatriculare(String numarInmatriculare);

}
