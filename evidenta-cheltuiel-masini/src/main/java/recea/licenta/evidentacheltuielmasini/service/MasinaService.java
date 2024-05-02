package recea.licenta.evidentacheltuielmasini.service;

import recea.licenta.evidentacheltuielmasini.dto.MasinaDto;
import recea.licenta.evidentacheltuielmasini.enitity.Masina;

import java.util.List;

public interface MasinaService {
    MasinaDto adaugareMasina(MasinaDto masinaDto);

    List<MasinaDto> getMasini ();

    MasinaDto getMasinaDupaID(Long id);

    MasinaDto updateMasina(Long id, MasinaDto masinaDto);

    String stergereMasina(Long id);

    MasinaDto numarInmatriculare(String nrInmatriculare);

    List<MasinaDto> getMasiniDupaUser(String username);
}
