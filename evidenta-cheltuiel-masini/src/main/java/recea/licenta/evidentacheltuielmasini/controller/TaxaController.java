package recea.licenta.evidentacheltuielmasini.controller;

import lombok.AllArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import recea.licenta.evidentacheltuielmasini.dto.TaxeDto;
import recea.licenta.evidentacheltuielmasini.enitity.Taxe;
import recea.licenta.evidentacheltuielmasini.service.MasinaService;
import recea.licenta.evidentacheltuielmasini.service.TaxaService;

import java.time.LocalDate;
import java.time.Month;
import java.util.List;

@RestController
@RequestMapping("/masini/taxe")
@AllArgsConstructor
//@CrossOrigin
public class TaxaController {

    private TaxaService taxaService;
    private MasinaService masinaService;

    @PostMapping
    public ResponseEntity<TaxeDto> adaugareTaxa (@RequestBody TaxeDto taxeDto){

        TaxeDto salvareTaxa = taxaService.adaugareTaxa(taxeDto);

        return new ResponseEntity<>(salvareTaxa, HttpStatus.CREATED);
    }
    @GetMapping
    public ResponseEntity<List<TaxeDto>> getTaxe (){
        List<TaxeDto> taxe = taxaService.getTaxe();

        return ResponseEntity.ok(taxe);
    }
    @GetMapping("/taxa/{id}")
    public ResponseEntity<TaxeDto> gasireTaxaDupaId (@PathVariable Long id){
        TaxeDto taxa = taxaService.getTaxaDupaId(id);

        return ResponseEntity.ok(taxa);
    }
    @PutMapping("/taxa/{id}")
    public ResponseEntity<TaxeDto> updateTaxa (@PathVariable Long id, @RequestBody TaxeDto taxeDto){
        TaxeDto taxa = taxaService.updateTaxa(id, taxeDto);

        return ResponseEntity.ok(taxa);
    }

    @DeleteMapping("/taxa/{id}")
    public ResponseEntity<String> stergereTaxa(@PathVariable Long id){
        String message = taxaService.stergereTaxa(id);

        return ResponseEntity.ok(message);
    }

    @GetMapping("/taxa/numarInmatriculare/{numarInmatriculare}")
    public ResponseEntity<List<TaxeDto>> getTaxePentruMasina(@PathVariable String numarInmatriculare){
        List<TaxeDto> taxe = taxaService.getTaxeByNumarInmatriculare(numarInmatriculare);

        return ResponseEntity.ok(taxe);
    }

    @GetMapping("/taxa/numarInmatriculare/{numarInmatriculare}/{an}/{luna}")
    public ResponseEntity<List<TaxeDto>> getTaxepentruLuna(@PathVariable String numarInmatriculare,
                                                           @PathVariable int an,
                                                           @PathVariable("luna") String lunaString){

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

}
