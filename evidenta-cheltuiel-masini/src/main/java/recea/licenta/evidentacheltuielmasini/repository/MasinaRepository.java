package recea.licenta.evidentacheltuielmasini.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import recea.licenta.evidentacheltuielmasini.enitity.Masina;

import java.util.List;
import java.util.Set;

public interface MasinaRepository  extends JpaRepository<Masina, Long> {
    Masina findByNumarInmatriculare(String numarInmatriculare);

    List<Masina> findByUserId(Long userId);
    @Query("SELECT m FROM Masina m WHERE m.user.username = :username")
    List<Masina> findByUsername(@Param("username") String username);

    @Query("SELECT m.marca FROM Masina m")
    Set<String> findAllMarcas();

    List<Masina> findAllByUserId(Long userId);

}
