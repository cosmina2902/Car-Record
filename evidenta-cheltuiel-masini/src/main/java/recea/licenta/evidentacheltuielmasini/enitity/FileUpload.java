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
@Table(name = "fileUploadCheltuieli")
public class FileUpload {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String fileName;
    private String fileCode;
    private long size;
    @ManyToOne
    @JoinColumn(name = "id_cheltuiala")
    private Cheltuieli cheltuieli;
}
