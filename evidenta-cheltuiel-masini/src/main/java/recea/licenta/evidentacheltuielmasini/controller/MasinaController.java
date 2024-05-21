package recea.licenta.evidentacheltuielmasini.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;
import recea.licenta.evidentacheltuielmasini.dto.MasinaDto;
import recea.licenta.evidentacheltuielmasini.dto.TaxeDto;
import recea.licenta.evidentacheltuielmasini.enitity.User;
import recea.licenta.evidentacheltuielmasini.exception.MasiniApiException;
import recea.licenta.evidentacheltuielmasini.repository.UserRepository;
import recea.licenta.evidentacheltuielmasini.service.MasinaService;
import recea.licenta.evidentacheltuielmasini.service.PozaMasinaService;
import recea.licenta.evidentacheltuielmasini.service.TaxaService;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/masini")
@AllArgsConstructor
@CrossOrigin
public class MasinaController {
    private MasinaService masinaService;
    private UserRepository userRepository;
    private PozaMasinaService pozaMasinaService;
    private TaxaService taxaService;



    @PostMapping
    public ResponseEntity<MasinaDto> adaugareMasina(@RequestParam("masina") String masinaJson,
                                                    @RequestParam("image") MultipartFile file) {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            MasinaDto masinaDto = objectMapper.readValue(masinaJson, MasinaDto.class);
            System.out.println("Deserializare reusita: " + masinaDto);

            User user = getCurrentUser();
            masinaDto.setIdUser(user.getId());

            if (file != null && !file.isEmpty() && Arrays.asList("image/jpeg", "image/png", "image/jpg").contains(file.getContentType())) {
                MasinaDto saveMasinaDto = masinaService.adaugareMasina(masinaDto, file);
                return new ResponseEntity<>(saveMasinaDto, HttpStatus.CREATED);
            } else {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid or missing image file");
            }
        } catch (Exception e) {
            System.out.println("Eroare la procesare: " + e.getMessage());
            e.printStackTrace(); // Acesta va afișa stack trace-ul în consolă
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @GetMapping
    public ResponseEntity<List<MasinaDto>> toateMasinile() {
        User user = getCurrentUser();

        List<MasinaDto> masini = masinaService.getMasiniDupaUser(user.getUsername());
        return ResponseEntity.ok(masini);
    }

    @GetMapping("/masina/{id}")
    public ResponseEntity<MasinaDto> getMasinaByid(@PathVariable Long id) {
        User user = getCurrentUser();

        MasinaDto masina = masinaService.getMasinaDupaID(id);
        if (masina == null) {
            throw new MasiniApiException(HttpStatus.NOT_FOUND, "Mașina nu a fost găsită.");
        }

        if (!masina.getIdUser().equals(user.getId())) {
            throw new MasiniApiException(HttpStatus.UNAUTHORIZED, "Nu aveți permisiunea să accesați această mașină.");
        }

        return ResponseEntity.ok(masina);
    }


    @PutMapping("masina/{id}")
    public ResponseEntity<MasinaDto> updateMasian(@PathVariable Long id,
                                                  @RequestParam("masina") String masinaJson,
                                                  @RequestParam(value = "image", required = false) MultipartFile file) {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            MasinaDto masinaDto = objectMapper.readValue(masinaJson, MasinaDto.class);

            User user = getCurrentUser();
            MasinaDto existingMasina = masinaService.getMasinaDupaID(id);
            if (!existingMasina.getIdUser().equals(user.getId())) {
                throw new MasiniApiException(HttpStatus.UNAUTHORIZED, "Nu aveți permisiunea să actualizați această mașină.");
            }

            MasinaDto updateMasina = masinaService.updateMasina(id, masinaDto, file);

            return ResponseEntity.ok(updateMasina);
        } catch (Exception e) {
            System.out.println("Eroare la procesare: " + e.getMessage());
            e.printStackTrace(); // Acesta va afișa stack trace-ul în consolă
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @DeleteMapping("/masina/{id}")
    public ResponseEntity<String> deleteMasina(@PathVariable Long id) {
        User user = getCurrentUser();
        MasinaDto existingMasina = masinaService.getMasinaDupaID(id);
        if (!existingMasina.getIdUser().equals(user.getId())) {
            throw new MasiniApiException(HttpStatus.UNAUTHORIZED, "Nu aveți permisiunea să actualizați această mașină.");
        }
        List<TaxeDto> taxe = taxaService.getTaxeByNumarInmatriculare(existingMasina.getNumarInmatriculare());
        for (TaxeDto taxa: taxe){
            Long idTaxa = taxa.getIdTaxa();
            taxaService.stergereTaxa(idTaxa);
        }
        Long idPoza = existingMasina.getPozaMasina().getId();
        pozaMasinaService.deleteImage(idPoza);
        String mesaj = masinaService.stergereMasina(id);

        return ResponseEntity.ok(mesaj);
    }

    @GetMapping("/nrInmatriculare/{nrInmatriculare}")
    public ResponseEntity<MasinaDto> idNr(@PathVariable String nrInmatriculare) {
        User user = getCurrentUser();
        MasinaDto masina = masinaService.numarInmatriculare(nrInmatriculare);
        if (masina == null) {
            throw new MasiniApiException(HttpStatus.NOT_FOUND, "Mașina nu a fost găsită.");
        }

        if (!masina.getIdUser().equals(user.getId())) {
            throw new MasiniApiException(HttpStatus.UNAUTHORIZED, "Nu aveți permisiunea să accesați această mașină.");
        }

        return ResponseEntity.ok(masina);
    }

    @GetMapping("/userLogat")
    public ResponseEntity<Long> getIdUser(){
        User user = getCurrentUser();
        Long idUserLogat = user.getId();

        return ResponseEntity.ok(idUserLogat);
    }

    @GetMapping("/{fileName}")
    public ResponseEntity<?> downloadImage(@PathVariable String fileName){


        byte [] image = pozaMasinaService.downloadImage(fileName);

        return ResponseEntity.status(HttpStatus.OK)
                .contentType(MediaType.valueOf("image/png"))
                .contentType(MediaType.valueOf("image/jpg"))
                .contentType(MediaType.valueOf("image/jpeg"))
                .body(image);
    }


    private User getCurrentUser() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new MasiniApiException(HttpStatus.NOT_FOUND, "Username-ul nu a fost gasit"));
    }

}
