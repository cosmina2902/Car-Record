package recea.licenta.evidentacheltuielmasini.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import recea.licenta.evidentacheltuielmasini.enitity.PozaMasina;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MasinaDto {

    private Long idMasina;
    private Long idUser;
    private String marca;
    private String model;
    private int an;
    private double capacitate;
    private String combustibil;
    private String numarInmatriculare;

    private PozaMasina pozaMasina;




}
