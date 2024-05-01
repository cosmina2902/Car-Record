package recea.licenta.evidentacheltuielmasini.service.implementare;

import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import recea.licenta.evidentacheltuielmasini.dto.MasinaDto;
import recea.licenta.evidentacheltuielmasini.enitity.Masina;
import recea.licenta.evidentacheltuielmasini.exception.ResourceNotFound;
import recea.licenta.evidentacheltuielmasini.repository.MasinaRepository;
import recea.licenta.evidentacheltuielmasini.service.MasinaService;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor

public class MasinaServiceImpl implements MasinaService {

    MasinaRepository masinaRepository;

    private ModelMapper modelMapper;

    @Override
    public MasinaDto adaugareMasina(MasinaDto masinaDto) {

        Masina masina = modelMapper.map(masinaDto, Masina.class);

        Masina saveMasina = masinaRepository.save(masina);

        MasinaDto saveMasinaDto = modelMapper.map(saveMasina, MasinaDto.class);



        return saveMasinaDto;

    }

    @Override
    public List<MasinaDto> getMasini() {
        List<Masina> toateMasinile = masinaRepository.findAll();


        return toateMasinile.stream().map(masinaDto
                -> modelMapper.map(masinaDto, MasinaDto.class)).collect(Collectors.toList());
    }

    @Override
    public MasinaDto getMasinaDupaID(Long id) {
        Masina masina = masinaRepository.findById(id)
                .orElseThrow( ()-> new ResourceNotFound("Masina cu id-ul " + id + " nu a gost gasita"));

        return modelMapper.map(masina, MasinaDto.class);
    }

    @Override
    public MasinaDto updateMasina(Long id, MasinaDto masinaDto) {
        Masina masina = masinaRepository.findById(id)
                .orElseThrow( ()-> new ResourceNotFound("Masina cu id-ul " + id + " nu a gost gasita"));
        masina.setAn(masinaDto.getAn());
        masina.setCapacitate(masinaDto.getCapacitate());
        masina.setCombustibil(masinaDto.getCombustibil());
        masina.setMarca(masinaDto.getMarca());
        masina.setModel(masinaDto.getModel());
        masina.setNumarInmatriculare(masinaDto.getNumarInmatriculare());

        Masina updateMasina = masinaRepository.save(masina);

        return modelMapper.map(updateMasina, MasinaDto.class);
    }

    @Override
    public String stergereMasina(Long id) {
        Masina masina = masinaRepository.findById(id)
                .orElseThrow( ()-> new ResourceNotFound("Masina cu id-ul " + id + " nu a gost gasita"));
        masinaRepository.delete(masina);

        return "Masina cu id-ul " + id + " a fost stearsa cu succes";
    }

    @Override
    public Long numarInmatriculare(String nrInmatriculare) {
        Long id = masinaRepository.findByNumarInmatriculare(nrInmatriculare).getIdMasina();

        return id;
    }
}
