package recea.licenta.evidentacheltuielmasini.service;

import org.springframework.core.io.Resource;

import java.io.IOException;

public interface FileDownloadService {

    Resource downloadareFisiere(Long idCheltuiala) throws IOException;

    Resource getFileAsResource(String fileCode) throws IOException;
}
