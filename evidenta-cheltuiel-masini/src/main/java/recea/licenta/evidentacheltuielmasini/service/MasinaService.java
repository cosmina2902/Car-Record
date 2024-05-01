package recea.licenta.evidentacheltuielmasini.service;

import recea.licenta.evidentacheltuielmasini.dto.MasinaDto;

import java.util.List;

public interface MasinaService {
    MasinaDto adaugareMasina(MasinaDto masinaDto);

    List<MasinaDto> getMasini ();

    MasinaDto getMasinaDupaID(Long id);

    MasinaDto updateMasina(Long id, MasinaDto masinaDto);

    String stergereMasina(Long id);

    Long numarInmatriculare(String nrInmatriculare);
}
