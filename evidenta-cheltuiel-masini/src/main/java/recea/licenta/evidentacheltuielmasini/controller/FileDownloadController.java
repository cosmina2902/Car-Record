package recea.licenta.evidentacheltuielmasini.controller;

import lombok.AllArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import recea.licenta.evidentacheltuielmasini.download.FileDownloadUtil;
import recea.licenta.evidentacheltuielmasini.service.FileDownloadService;

import java.io.IOException;

@RestController
@RequestMapping("/")
@AllArgsConstructor
@CrossOrigin
public class FileDownloadController {

    private FileDownloadService fileDownloadService;


    @GetMapping("/downloadFiles/{idCheltuiala}")
    public ResponseEntity<?> downloadFiles(@PathVariable("idCheltuiala") Long idCheltuiala) {
        Resource resource = null;
        try {
            resource = fileDownloadService.downloadareFisiere(idCheltuiala);
        } catch (IOException e) {
            return ResponseEntity.internalServerError().build();
        }

        if (resource == null) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body("Niciun fișier nu a fost găsit pentru descărcare.");
        }

        String contentType = "application/zip";
        String headerValue = "attachment; filename=\"" + resource.getFilename() + "\"";

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType))
                .header(HttpHeaders.CONTENT_DISPOSITION, headerValue)
                .body(resource);
    }
}
