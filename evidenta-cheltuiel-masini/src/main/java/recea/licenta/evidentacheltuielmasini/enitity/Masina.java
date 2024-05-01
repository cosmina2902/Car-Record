package recea.licenta.evidentacheltuielmasini.enitity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

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
    @Column(name = "id_user")
    private Long idUser;
    @Column(nullable = false)
    private String marca;
    private String model;
    @Column(nullable = false)
    private int an;
    private double capacitate;
    private String combustibil;
    @Column(nullable = false, unique = true, name = "numarInmatriculare")
    private String numarInmatriculare;


}
