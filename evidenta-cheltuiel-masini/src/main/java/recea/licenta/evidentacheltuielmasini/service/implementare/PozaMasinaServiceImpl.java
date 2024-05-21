package recea.licenta.evidentacheltuielmasini.service.implementare;

import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import recea.licenta.evidentacheltuielmasini.enitity.PozaMasina;
import recea.licenta.evidentacheltuielmasini.repository.PozaMasinaRepository;
import recea.licenta.evidentacheltuielmasini.service.PozaMasinaService;
import recea.licenta.evidentacheltuielmasini.utils.PozaMasinaUtils;

import java.io.IOException;
import java.util.Optional;

@Service
@AllArgsConstructor
public class PozaMasinaServiceImpl implements PozaMasinaService {

    private PozaMasinaRepository pozaMasinaRepository;


    @Override
    public PozaMasina uploadImage(MultipartFile file) throws IOException {

        PozaMasina poza = PozaMasina.builder()
                .name(file.getOriginalFilename())
                .type(file.getContentType())
                .imageData(PozaMasinaUtils.compressImage(file.getBytes()))
                .build();

        PozaMasina savedPoza = pozaMasinaRepository.save(poza);
        if (savedPoza != null) {
            return savedPoza;
        } else {
            throw new IOException("Failed to save image.");
        }
    }

    @Override
    public byte[] downloadImage(String fileName) {
        Optional<PozaMasina> dbimageData = pozaMasinaRepository.findByName(fileName);

        byte[] image = PozaMasinaUtils.decompressImage(dbimageData.get().getImageData());

        return image;
    }

    @Override
    public String deleteImage(Long id) {
        pozaMasinaRepository.deleteById(id);

        return "Poza stearsa cu success!";
    }
}
