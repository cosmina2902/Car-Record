package recea.licenta.evidentacheltuielmasini.enitity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import recea.licenta.evidentacheltuielmasini.utils.EnumCategorieCheltuieli;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "categorie_cheltuieli")
public class CategorieCheltuieli {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "nume_categorie")
    @Enumerated(EnumType.STRING)
    EnumCategorieCheltuieli numeCategorie;
}
