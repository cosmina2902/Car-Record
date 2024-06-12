package recea.licenta.evidentacheltuielmasini.service.implementare;

import lombok.AllArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import recea.licenta.evidentacheltuielmasini.download.FileDownloadUtil;
import recea.licenta.evidentacheltuielmasini.enitity.Cheltuieli;
import recea.licenta.evidentacheltuielmasini.enitity.FileUpload;
import recea.licenta.evidentacheltuielmasini.exception.ResourceNotFound;
import recea.licenta.evidentacheltuielmasini.repository.CheltuieliRepository;
import recea.licenta.evidentacheltuielmasini.repository.FileUploadRepository;
import recea.licenta.evidentacheltuielmasini.service.FileDownloadService;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.concurrent.atomic.AtomicReference;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


@Service
@AllArgsConstructor
public class FileDownloadServiceImpl implements FileDownloadService {

    private static final Logger logger = LoggerFactory.getLogger(FileDownloadServiceImpl.class);


    private  FileUploadRepository fileUploadRepository;
    private CheltuieliRepository cheltuieliRepository;
    @Override
    public Resource downloadareFisiere(Long idCheltuiala) throws IOException {

        Cheltuieli cheltuiala = cheltuieliRepository.findById(idCheltuiala-7)
                .orElseThrow(() -> new ResourceNotFound("Cheltuiala nu a fost gasita"));

        List<FileUpload> fileUploads = fileUploadRepository.findByCheltuieli(cheltuiala);

        if (fileUploads.isEmpty()) {
            return null;
        }


        Path zipPath = Paths.get("Files-Upload", "cheltuiala-" + idCheltuiala + ".zip");

        try (ZipOutputStream zipOutputStream = new ZipOutputStream(Files.newOutputStream(zipPath))) {
            for (FileUpload fileUpload : fileUploads) {
                Path filePath = Paths.get("Files-Upload", fileUpload.getFileCode() + "-" + fileUpload.getFileName());
                if (Files.exists(filePath)) {
                    logger.info("Adaugă fișierul în arhivă: " + filePath.toString());
                    zipOutputStream.putNextEntry(new ZipEntry(fileUpload.getFileName()));
                    Files.copy(filePath, zipOutputStream);
                    zipOutputStream.closeEntry();
                } else {
                    logger.warn("Fișierul nu există: " + filePath.toString());
                }
            }
        }

        if (Files.exists(zipPath) && Files.size(zipPath) > 0) {
            return new UrlResource(zipPath.toUri());
        } else {
            throw new ResourceNotFound("Niciun fișier nu a fost adăugat în arhivă");
        }
    }

    public Resource getFileAsResource(String fileCode) throws IOException {
        Path dirPath = Paths.get("Files-Upload");

        Path foundFile = null;

        for (Path file : (Iterable<Path>) Files.list(dirPath)::iterator) {
            if (file.getFileName().toString().startsWith(fileCode)) {
                foundFile = file;
                break;
            }
        }

        if (foundFile != null) {
            return new UrlResource(foundFile.toUri());
        }

        return null;
    }
}
