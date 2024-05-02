package recea.licenta.evidentacheltuielmasini.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import recea.licenta.evidentacheltuielmasini.dto.MasinaDto;
import recea.licenta.evidentacheltuielmasini.enitity.User;
import recea.licenta.evidentacheltuielmasini.exception.MasiniApiException;
import recea.licenta.evidentacheltuielmasini.repository.UserRepository;
import recea.licenta.evidentacheltuielmasini.service.MasinaService;

import java.util.List;

@RestController
@RequestMapping("/masini")
@AllArgsConstructor
@CrossOrigin
public class MasinaController {
    private MasinaService masinaService;
    private UserRepository userRepository;

    @PostMapping
    public ResponseEntity<MasinaDto> adaugareMasina(@RequestBody MasinaDto masinaDto) {
        User user = getCurrentUser();
        masinaDto.setIdUser(user.getId());


        MasinaDto saveMasinaDto = masinaService.adaugareMasina(masinaDto);

        return new ResponseEntity<>(saveMasinaDto, HttpStatus.CREATED);
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
    public ResponseEntity<MasinaDto> updateMasian(@PathVariable Long id, @RequestBody MasinaDto masinaDto) {
        User user = getCurrentUser();
        MasinaDto existingMasina = masinaService.getMasinaDupaID(id);
        if (!existingMasina.getIdUser().equals(user.getId())) {
            throw new MasiniApiException(HttpStatus.UNAUTHORIZED, "Nu aveți permisiunea să actualizați această mașină.");
        }

        MasinaDto updateMasina = masinaService.updateMasina(id, masinaDto);

        return ResponseEntity.ok(updateMasina);
    }

    @DeleteMapping("/masina/{id}")
    public ResponseEntity<String> deleteMasina(@PathVariable Long id) {
        User user = getCurrentUser();
        MasinaDto existingMasina = masinaService.getMasinaDupaID(id);
        if (!existingMasina.getIdUser().equals(user.getId())) {
            throw new MasiniApiException(HttpStatus.UNAUTHORIZED, "Nu aveți permisiunea să actualizați această mașină.");
        }
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


    private User getCurrentUser() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new MasiniApiException(HttpStatus.NOT_FOUND, "Username-ul nu a fost gasit"));
    }

}
