package recea.licenta.evidentacheltuielmasini.service;

import org.springframework.web.multipart.MultipartFile;
import recea.licenta.evidentacheltuielmasini.dto.FileUploadDto;
import recea.licenta.evidentacheltuielmasini.enitity.Cheltuieli;


import java.io.IOException;

public interface  FileUploadService {

     FileUploadDto adaugareFisiere(MultipartFile file, Cheltuieli cheltuiela) throws IOException;

     void deleteFile(Long fileId) throws IOException;
}
