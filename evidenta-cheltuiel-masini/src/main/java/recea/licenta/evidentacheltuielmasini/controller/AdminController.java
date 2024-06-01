package recea.licenta.evidentacheltuielmasini.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import recea.licenta.evidentacheltuielmasini.dto.TaxeDto;
import recea.licenta.evidentacheltuielmasini.service.AdminService;

import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/admin")
@AllArgsConstructor
@CrossOrigin
public class AdminController {
    private AdminService adminService;

    @GetMapping("/userNumber")
    ResponseEntity <Long> getUsers(){

        Long users = adminService.getUserLoggati();

        return ResponseEntity.ok(users);
    }

    @GetMapping("/masiniInregistrate")
    ResponseEntity <Long> getMasiniInregistrate(){

        Long masini = adminService.getMasiniInregistrate();

        return ResponseEntity.ok(masini);
    }

    @GetMapping("/cheltuieliInregistrate")
    ResponseEntity <Long> getCheltuieliInregistrate(){

        Long cheltuieli = adminService.getCheltuieli();

        return ResponseEntity.ok(cheltuieli);
    }
    @GetMapping("/marciInregistrate")
    ResponseEntity <Set<String>> getMarciInregistrate(){

         Set<String> marci = adminService.getMarci();

        return ResponseEntity.ok(marci);
    }

    @GetMapping("/taxe/marca/{marca}")
    ResponseEntity <List<TaxeDto>> getTaxeByMarca(@PathVariable String marca){

        List<TaxeDto> taxe = adminService.getTaxeByMarca(marca);

        return ResponseEntity.ok(taxe);
    }

    @GetMapping("/taxe/suma/{marca}")
    ResponseEntity <Long> geSumaByMarca(@PathVariable String marca){

        Long taxe = adminService.getSumaTaxeByMarca(marca);

        return ResponseEntity.ok(taxe);
    }
}
