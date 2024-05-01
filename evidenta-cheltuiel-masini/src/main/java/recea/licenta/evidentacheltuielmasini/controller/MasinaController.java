package recea.licenta.evidentacheltuielmasini.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import recea.licenta.evidentacheltuielmasini.dto.MasinaDto;
import recea.licenta.evidentacheltuielmasini.service.MasinaService;

import java.util.List;

@RestController
@RequestMapping("/masini")
@AllArgsConstructor
@CrossOrigin
public class MasinaController {
    private MasinaService masinaService;


    @PostMapping
    public ResponseEntity<MasinaDto> adaugareMasina(@RequestBody MasinaDto masinaDto){
        MasinaDto saveMasinaDto = masinaService.adaugareMasina(masinaDto);

        return new ResponseEntity<>(saveMasinaDto, HttpStatus.CREATED);
    }
    @GetMapping
    public ResponseEntity<List<MasinaDto>> toateMasinile(){
        List<MasinaDto> masini = masinaService.getMasini();

       return ResponseEntity.ok(masini);
    }

    @GetMapping("/masina/{id}")
    public ResponseEntity<MasinaDto> getMasinaByid(@PathVariable Long id){

        MasinaDto masina = masinaService.getMasinaDupaID(id);

        return ResponseEntity.ok(masina);
    }

    @PutMapping ("masina/{id}")
    public ResponseEntity<MasinaDto> updateMasian(@PathVariable Long id, @RequestBody MasinaDto masinaDto){

        MasinaDto updateMasina = masinaService.updateMasina(id, masinaDto);

        return ResponseEntity.ok(updateMasina);
    }

    @DeleteMapping("/masina/{id}")
    public ResponseEntity<String> deleteMasina(@PathVariable Long id){
        String mesaj = masinaService.stergereMasina(id);

        return ResponseEntity.ok(mesaj);
    }

    @GetMapping("/{nrInmatriculare}")
    public ResponseEntity<Long> idNr(@PathVariable String nrInmatriculare){
        Long id = masinaService.numarInmatriculare(nrInmatriculare);

        return ResponseEntity.ok(id);
    }
}
