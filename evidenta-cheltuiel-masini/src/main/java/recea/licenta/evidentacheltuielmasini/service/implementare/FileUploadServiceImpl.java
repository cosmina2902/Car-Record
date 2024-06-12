package recea.licenta.evidentacheltuielmasini.service.implementare;

import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import recea.licenta.evidentacheltuielmasini.dto.FileUploadDto;
import recea.licenta.evidentacheltuielmasini.enitity.Cheltuieli;
import recea.licenta.evidentacheltuielmasini.enitity.FileUpload;
import recea.licenta.evidentacheltuielmasini.repository.CheltuieliRepository;
import recea.licenta.evidentacheltuielmasini.repository.FileUploadRepository;
import recea.licenta.evidentacheltuielmasini.service.FileUploadService;
import recea.licenta.evidentacheltuielmasini.upload.FileUploadUtil;
import recea.licenta.evidentacheltuielmasini.exception.ResourceNotFound;

import java.io.IOException;
import java.util.Objects;

@Service
@AllArgsConstructor
public class FileUploadServiceImpl implements FileUploadService {

    private ModelMapper modelMapper;
    private FileUploadRepository fileUploadRepository;
    private CheltuieliRepository cheltuieliRepository;

    @Override
    public FileUploadDto adaugareFisiere(MultipartFile file, Cheltuieli cheltuiala) throws IOException {
        FileUpload fileUpload = new FileUpload();
        if (file != null && !file.isEmpty()) {
            String fileName = StringUtils.cleanPath(Objects.requireNonNull(file.getOriginalFilename()));
            String fileCode = FileUploadUtil.saveFile(fileName, file);
            fileUpload.setFileCode(fileCode);
            fileUpload.setFileName(fileName);
            fileUpload.setSize(file.getSize());
            fileUpload.setCheltuieli(cheltuiala);
        }

        FileUpload saveFisiere = fileUploadRepository.save(fileUpload);
        return modelMapper.map(saveFisiere, FileUploadDto.class);
    }

    @Override
    public void deleteFile(Long fileId) throws IOException {

        FileUpload fileUpload = fileUploadRepository.findById(fileId)
                .orElseThrow(() -> new ResourceNotFound("File not found with id " + fileId));

        fileUploadRepository.delete(fileUpload);
        FileUploadUtil.deleteFile(fileUpload.getFileCode(), fileUpload.getFileName());

    }

}
