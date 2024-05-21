package recea.licenta.evidentacheltuielmasini.enitity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "masina")
public class Masina {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_masina")
    private Long idMasina;
    @ManyToOne
    @JoinColumn(name = "id_user")
    private User user;
    @Column(nullable = false)
    private String marca;
    private String model;
    @Column(nullable = false)
    private int an;
    private double capacitate;
    private String combustibil;
    @Column(nullable = false, unique = true, name = "numarInmatriculare")
    private String numarInmatriculare;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "id_poza", referencedColumnName = "id")
    private PozaMasina pozaMasina;

    @OneToMany(mappedBy = "masina", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Cheltuieli> cheltuieli;

}
