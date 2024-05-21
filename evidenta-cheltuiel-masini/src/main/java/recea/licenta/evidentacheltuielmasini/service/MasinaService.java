package recea.licenta.evidentacheltuielmasini.service;

import org.springframework.web.multipart.MultipartFile;
import recea.licenta.evidentacheltuielmasini.dto.MasinaDto;
import recea.licenta.evidentacheltuielmasini.enitity.Masina;

import java.io.IOException;
import java.util.List;

public interface MasinaService {
    MasinaDto adaugareMasina(MasinaDto masinaDto, MultipartFile file) throws IOException;

    List<MasinaDto> getMasini ();

    MasinaDto getMasinaDupaID(Long id);

    MasinaDto updateMasina(Long id, MasinaDto masinaDto, MultipartFile file) throws IOException;

    String stergereMasina(Long id);

    MasinaDto numarInmatriculare(String nrInmatriculare);

    List<MasinaDto> getMasiniDupaUser(String username);

    String stergereCheltuialaMasina (Long id);
}
