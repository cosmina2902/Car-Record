package recea.licenta.evidentacheltuielmasini.enitity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "taxe")
public class Taxe {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idTaxa;
    @ManyToOne
    @JoinColumn(name = "id_categorie_cheltuieli")
    private CategorieCheltuieli categorieCheltuieli;
    @Column(nullable = false)
    private String tip;
    @Column(nullable = false)
    private int suma;
    @Column(nullable = false)
    private LocalDate data;
    private LocalDate dataExpirare;
    private String imagini;
    private String numarInmatriculare;

}
