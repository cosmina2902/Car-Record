package recea.licenta.evidentacheltuielmasini.service;

import recea.licenta.evidentacheltuielmasini.dto.TaxeDto;

import java.util.List;
import java.util.Set;

public interface AdminService {

    Long getUserLoggati();

    Long getMasiniInregistrate();

    Long getCheltuieli();

    Set<String> getMarci();

    List<TaxeDto> getTaxeByMarca(String marca);

    Long getSumaTaxeByMarca(String marca);
}
