package recea.licenta.evidentacheltuielmasini.enitity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "cheltuieli")
public class Cheltuieli {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column (name = "id_cheltuiala")
    private Long idCheltuiala;
    @ManyToOne
    @JoinColumn(name = "id_masina")
    private Masina masina;
    @ManyToOne
    @JoinColumn(name = "id_categorie")
    private CategorieCheltuieli categorieCheltuieli;


}
