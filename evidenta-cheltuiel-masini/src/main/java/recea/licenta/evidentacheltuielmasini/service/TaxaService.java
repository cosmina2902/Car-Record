package recea.licenta.evidentacheltuielmasini.service;

import recea.licenta.evidentacheltuielmasini.dto.TaxeDto;
import recea.licenta.evidentacheltuielmasini.enitity.Taxe;

import java.time.LocalDate;
import java.time.Month;
import java.util.List;

public interface TaxaService {

    TaxeDto adaugareTaxa(TaxeDto taxeDto);

    List<TaxeDto> getTaxe ();

    TaxeDto getTaxaDupaId(Long id);

    TaxeDto updateTaxa(Long id, TaxeDto taxeDto);

    String stergereTaxa(Long id);

    List<TaxeDto> getTaxeByNumarInmatriculare (String numarInmatriculare);
    List<TaxeDto> getCheltuieliPentruMasinaInLuna(String numarInmatriculare, int year, Month month);
    List<TaxeDto> getByNumarInmatriculareAndAn(String numarInmatriculare, int an);
    List<TaxeDto> getCheltuieliPentruMasinaInPerioada(String numarInmatriculare, LocalDate startDate, LocalDate endDate);

    Integer getToateCheltuieleMasina(String numarInmatriculare);
     List<Taxe> getTaxeByCategorieId(Long categorieId, String numarInmatricuare);
     List<Taxe> getTaxeExpirate(String numarInmatriculare, LocalDate dataExpirare);
}
