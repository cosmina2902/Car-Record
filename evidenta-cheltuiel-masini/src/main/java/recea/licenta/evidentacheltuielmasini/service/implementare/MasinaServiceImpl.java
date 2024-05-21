package recea.licenta.evidentacheltuielmasini.service.implementare;

import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import recea.licenta.evidentacheltuielmasini.dto.MasinaDto;
import recea.licenta.evidentacheltuielmasini.enitity.Masina;
import recea.licenta.evidentacheltuielmasini.enitity.PozaMasina;
import recea.licenta.evidentacheltuielmasini.enitity.User;
import recea.licenta.evidentacheltuielmasini.exception.ResourceNotFound;
import recea.licenta.evidentacheltuielmasini.repository.MasinaRepository;
import recea.licenta.evidentacheltuielmasini.repository.UserRepository;
import recea.licenta.evidentacheltuielmasini.service.MasinaService;
import recea.licenta.evidentacheltuielmasini.service.PozaMasinaService;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor

public class MasinaServiceImpl implements MasinaService {

    private MasinaRepository masinaRepository;

    private UserRepository userRepository;

    private PozaMasinaService pozaMasinaService;

    private ModelMapper modelMapper;

    @Override
    public MasinaDto adaugareMasina(MasinaDto masinaDto, MultipartFile file) throws IOException {

        Masina masina = modelMapper.map(masinaDto, Masina.class);

        if (file != null && !file.isEmpty()) {
            PozaMasina pozaMasina = pozaMasinaService.uploadImage(file);
            masina.setPozaMasina(pozaMasina);
        }

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
    public MasinaDto updateMasina(Long id, MasinaDto masinaDto, MultipartFile file) throws IOException {
        Masina masina = masinaRepository.findById(id)
                .orElseThrow( ()-> new ResourceNotFound("Masina cu id-ul " + id + " nu a gost gasita"));
        masina.setAn(masinaDto.getAn());
        masina.setCapacitate(masinaDto.getCapacitate());
        masina.setCombustibil(masinaDto.getCombustibil());
        masina.setMarca(masinaDto.getMarca());
        masina.setModel(masinaDto.getModel());
        masina.setNumarInmatriculare(masinaDto.getNumarInmatriculare());
        if (file != null && !file.isEmpty()) {
            PozaMasina pozaMasina = pozaMasinaService.uploadImage(file);
            masina.setPozaMasina(pozaMasina);
        }

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
    public MasinaDto numarInmatriculare(String nrInmatriculare) {
        Masina masina = masinaRepository.findByNumarInmatriculare(nrInmatriculare);

        return modelMapper.map(masina, MasinaDto.class);
    }

    @Override
    public List<MasinaDto> getMasiniDupaUser(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFound("Utilizatorul nu a fost gasit"));

        List<Masina> userMasini = masinaRepository.findByUserId(user.getId());

        return userMasini.stream()
                .map(masina -> modelMapper.map(masina, MasinaDto.class))
                .collect(Collectors.toList());
    }

    @Override
    public String stergereCheltuialaMasina(Long id) {
        return null;
    }

}
