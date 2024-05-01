package recea.licenta.evidentacheltuielmasini.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import recea.licenta.evidentacheltuielmasini.enitity.CategorieCheltuieli;

import java.time.LocalDate;
import java.time.LocalDateTime;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TaxeDto {
    private Long idTaxa;
    private Long idCategorieCheltuieli;
    private String tip;
    private int suma;
    private LocalDate data;
    private LocalDate dataExpirare;
    private String imagini;
    private String numarInmatriculare;

}
