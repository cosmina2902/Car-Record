package recea.licenta.evidentacheltuielmasini.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import recea.licenta.evidentacheltuielmasini.utils.EnumCategorieCheltuieli;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CategorieCheltuieliDto {
    private Long id;
    EnumCategorieCheltuieli numeCategorie;
}
