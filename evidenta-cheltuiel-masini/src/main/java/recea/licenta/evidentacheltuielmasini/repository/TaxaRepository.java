package recea.licenta.evidentacheltuielmasini.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import recea.licenta.evidentacheltuielmasini.enitity.Taxe;

import java.time.LocalDate;
import java.util.List;

public interface TaxaRepository extends JpaRepository<Taxe, Long> {
    List<Taxe> findByNumarInmatriculare(String numarInmatriculare);

    @Query("SELECT t FROM Taxe t JOIN Masina m ON t.numarInmatriculare " +
            "= m.numarInmatriculare WHERE m.numarInmatriculare = " +
            ":numarInmatriculare AND t.data BETWEEN :startDate AND :endDate")
    List<Taxe> findByNumarInmatriculareAndDataBetween(@Param("numarInmatriculare") String numarInmatriculare,
                                                      @Param("startDate") LocalDate startDate,
                                                      @Param("endDate") LocalDate endDate);

    List<Taxe> findByCategorieCheltuieliIdAndNumarInmatriculare(Long categorieId, String numarInmatriculare);
    List<Taxe> findByNumarInmatriculareAndDataExpirareBefore(String numarInamtriculare, LocalDate dataExpirare);
    List<Taxe> findByDataExpirareBetween(LocalDate start, LocalDate end);
}
