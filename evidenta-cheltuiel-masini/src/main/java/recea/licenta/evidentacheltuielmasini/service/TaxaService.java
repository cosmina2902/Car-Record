package recea.licenta.evidentacheltuielmasini.service;

import org.springframework.web.multipart.MultipartFile;
import recea.licenta.evidentacheltuielmasini.dto.FileUploadDto;
import recea.licenta.evidentacheltuielmasini.dto.TaxeDto;
import recea.licenta.evidentacheltuielmasini.enitity.Taxe;

import java.io.IOException;
import java.time.LocalDate;
import java.time.Month;
import java.util.List;

public interface TaxaService {

    TaxeDto adaugareTaxa(TaxeDto taxeDto, MultipartFile[] file) throws IOException;

    List<TaxeDto> getTaxe ();

    TaxeDto getTaxaDupaId(Long id);

    TaxeDto updateTaxa(Long id, TaxeDto taxeDto, MultipartFile[] files, boolean updateFiles) throws IOException;

    String stergereTaxa(Long id);

    List<TaxeDto> getTaxeByNumarInmatriculare (String numarInmatriculare);
    List<TaxeDto> getCheltuieliPentruMasinaInLuna(String numarInmatriculare, int year, Month month);
    List<TaxeDto> getByNumarInmatriculareAndAn(String numarInmatriculare, int an);
    List<TaxeDto> getCheltuieliPentruMasinaInPerioada(String numarInmatriculare, LocalDate startDate, LocalDate endDate);

    Integer getToateCheltuieleMasina(String numarInmatriculare);
     List<Taxe> getTaxeByCategorieId(Long categorieId, String numarInmatricuare);
     List<Taxe> getTaxeExpirate(String numarInmatriculare, LocalDate dataExpirare);
    List<TaxeDto> getTaxeByUserId(Long userId);
    List<Taxe> findTaxesThatWillExpireSoon(int daysInAdvance);

    List<FileUploadDto> getFileUploadByIdCheltuieli(Long id);
}
