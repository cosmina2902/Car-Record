package recea.licenta.evidentacheltuielmasini.dto;


import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import recea.licenta.evidentacheltuielmasini.enitity.Cheltuieli;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class FileUploadDto {

    private Long id;
    private String fileName;
    private String fileCode;
    private long size;
    private Cheltuieli cheltuieli;
}
