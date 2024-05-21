package recea.licenta.evidentacheltuielmasini.service;

import org.springframework.web.multipart.MultipartFile;
import recea.licenta.evidentacheltuielmasini.enitity.PozaMasina;

import java.io.IOException;

public interface PozaMasinaService {

     PozaMasina uploadImage(MultipartFile file) throws IOException;

     byte [] downloadImage(String fileName);

     String deleteImage (Long id);




}
