package recea.licenta.evidentacheltuielmasini.controller;

import lombok.AllArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import recea.licenta.evidentacheltuielmasini.dto.MasinaDto;
import recea.licenta.evidentacheltuielmasini.dto.TaxeDto;
import recea.licenta.evidentacheltuielmasini.enitity.Masina;
import recea.licenta.evidentacheltuielmasini.enitity.Taxe;
import recea.licenta.evidentacheltuielmasini.enitity.User;
import recea.licenta.evidentacheltuielmasini.exception.MasiniApiException;
import recea.licenta.evidentacheltuielmasini.repository.UserRepository;
import recea.licenta.evidentacheltuielmasini.service.MasinaService;
import recea.licenta.evidentacheltuielmasini.service.TaxaService;

import java.time.LocalDate;
import java.time.Month;
import java.util.List;

@RestController
@RequestMapping("/masini/taxe")
@AllArgsConstructor
@CrossOrigin
public class TaxaController {

    private TaxaService taxaService;
    private MasinaService masinaService;
    private UserRepository userRepository;

    @PostMapping
    public ResponseEntity<TaxeDto> adaugareTaxa(@RequestBody TaxeDto taxeDto) {
        User user = getCurrentUser();
        MasinaDto masinaDto = masinaService.numarInmatriculare(taxeDto.getNumarInmatriculare());
        if (masinaDto == null || !masinaDto.getIdUser().equals(user.getId())) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN,
                    "Nu aveți permisiunea să adăugați taxe pentru această mașină.");
        }
        taxeDto.setNumarInmatriculare(masinaDto.getNumarInmatriculare());

        TaxeDto salvareTaxa = taxaService.adaugareTaxa(taxeDto);
        return new ResponseEntity<>(salvareTaxa, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<TaxeDto>> getTaxe() {
        User user = getCurrentUser();
        List<TaxeDto> taxe = taxaService.getTaxeByUserId(user.getId());
        return ResponseEntity.ok(taxe);
    }

    @PutMapping("/taxa/{id}")
    public ResponseEntity<TaxeDto> updateTaxa(@PathVariable Long id, @RequestBody TaxeDto taxeDto) {
        verificareMasinaUser(id);

        TaxeDto taxaActualizata = taxaService.updateTaxa(id, taxeDto);
        return ResponseEntity.ok(taxaActualizata);
    }


    @DeleteMapping("/taxa/{id}")
    public ResponseEntity<String> stergereTaxa(@PathVariable Long id){
        verificareMasinaUser(id);
        String message = taxaService.stergereTaxa(id);

        return ResponseEntity.ok(message);
    }

    @GetMapping("/taxa/numarInmatriculare/{numarInmatriculare}")
    public ResponseEntity<List<TaxeDto>> getTaxePentruMasina(@PathVariable String numarInmatriculare){
        User user = getCurrentUser();
        MasinaDto masinaDto = masinaService.numarInmatriculare(numarInmatriculare);
        if (masinaDto == null || !masinaDto.getIdUser().equals(user.getId())) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN,
                    "Nu aveți permisiunea să accesați taxele pentru această mașină.");
        }

        List<TaxeDto> taxe = taxaService.getTaxeByNumarInmatriculare(numarInmatriculare);

        return ResponseEntity.ok(taxe);
    }

    @GetMapping("/taxa/numarInmatriculare/{numarInmatriculare}/{an}/{luna}")
    public ResponseEntity<List<TaxeDto>> getTaxepentruLuna(@PathVariable String numarInmatriculare,
                                                           @PathVariable int an,
                                                           @PathVariable("luna") String lunaString){
        User user = getCurrentUser();
        MasinaDto masinaDto = masinaService.numarInmatriculare(numarInmatriculare);
        if (masinaDto == null || !masinaDto.getIdUser().equals(user.getId())) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN,
                    "Nu aveți permisiunea să accesați taxele pentru această mașină.");
        }

        Month luna = Month.of(Integer.parseInt(lunaString));

        List<TaxeDto> taxe = taxaService.getCheltuieliPentruMasinaInLuna(numarInmatriculare, an, luna);

        return ResponseEntity.ok(taxe);
    }
    @GetMapping("/taxa/numarInmatriculare/{numarInmatriculare}/{an}")
    public ResponseEntity<List<TaxeDto>> getTaxePentruAn(@PathVariable String numarInmatriculare,
                                                         @PathVariable int an) {
        List<TaxeDto> taxe = taxaService.getByNumarInmatriculareAndAn(numarInmatriculare, an);
        return ResponseEntity.ok(taxe);
    }
    @GetMapping("/taxa/numarInmatriculare/{numarInmatriculare}/perioada/{startDate}/endDate/{endDate}")
    public ResponseEntity<List<TaxeDto>> getTaxePentruPerioada(@PathVariable String numarInmatriculare,
                                                               @PathVariable LocalDate startDate,
                                                               @PathVariable LocalDate endDate) {
        System.out.println(startDate);

        List<TaxeDto> taxe = taxaService.getCheltuieliPentruMasinaInPerioada(numarInmatriculare, startDate, endDate);
        return ResponseEntity.ok(taxe);
    }

    @GetMapping("/taxa/numarInmatriculare/{numarInmatriculare}/sumaTotala")
    ResponseEntity<String> getSumaTotalaMasina (@PathVariable String numarInmatriculare){
        int suma_totala = taxaService.getToateCheltuieleMasina(numarInmatriculare);
        String message =
                "Pentru masina cu nr inamtriculare " + numarInmatriculare + " s-a cheltuit suma de "+suma_totala;
        return ResponseEntity.ok(message);
    }

    @GetMapping("/taxa/categorie/{categorieId}/{numarInamtriculare}")
    public ResponseEntity<List<Taxe>> getTaxeByCategorieId(@PathVariable long categorieId,
                                                           @PathVariable String numarInamtriculare) {
        List<Taxe> taxe = taxaService.getTaxeByCategorieId(categorieId, numarInamtriculare);
        return ResponseEntity.ok(taxe);
    }
    @GetMapping("/expirate/{numarInamtriculare}")
    public ResponseEntity<List<Taxe>> getTaxeExpirate(@PathVariable String numarInamtriculare) {
        LocalDate dataCurenta = LocalDate.now();
        List<Taxe> taxe = taxaService.getTaxeExpirate(numarInamtriculare, dataCurenta);
        return ResponseEntity.ok(taxe);
    }
    private User getCurrentUser() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new MasiniApiException(HttpStatus.NOT_FOUND, "Utilizatorul nu a fost găsit"));
    }

    private void verificareMasinaUser(Long id){
        User user = getCurrentUser();
        TaxeDto taxaExistenta = taxaService.getTaxaDupaId(id);
        if (taxaExistenta == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Taxa specificată nu a fost găsită.");
        }

        MasinaDto masina = masinaService.numarInmatriculare(taxaExistenta.getNumarInmatriculare());
        if (masina == null || !masina.getIdUser().equals(user.getId())) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Nu aveți permisiunea să stergeti această taxă.");
        }
    }



}
