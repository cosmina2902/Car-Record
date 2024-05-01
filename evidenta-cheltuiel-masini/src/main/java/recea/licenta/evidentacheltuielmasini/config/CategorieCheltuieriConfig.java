package recea.licenta.evidentacheltuielmasini.config;

import lombok.AllArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import recea.licenta.evidentacheltuielmasini.enitity.CategorieCheltuieli;
import recea.licenta.evidentacheltuielmasini.repository.CategorieCheltuieliRepository;
import recea.licenta.evidentacheltuielmasini.utils.EnumCategorieCheltuieli;

@Component
@AllArgsConstructor
public class CategorieCheltuieriConfig implements CommandLineRunner {
    private CategorieCheltuieliRepository categorieCheltuieliRepository;
    @Override
    public void run(String... args) throws Exception {
         if (categorieCheltuieliRepository.count() == 0) {
            adaugaCategorieCheltuieli(EnumCategorieCheltuieli.CHELTUIELI_CU_TAXA);
            adaugaCategorieCheltuieli(EnumCategorieCheltuieli.CHELTUIELI_CU_COMBUSTIBIL);
            adaugaCategorieCheltuieli(EnumCategorieCheltuieli.CHELTUIELI_CU_CAUCIUCURI);
            adaugaCategorieCheltuieli(EnumCategorieCheltuieli.CHELTUILEI_CU_BATERIA);
            adaugaCategorieCheltuieli(EnumCategorieCheltuieli.CHELTUIELI_CU_SERVICE);
        } else {
            System.out.println("Tabela categorie_cheltuieli nu este goală. Nu se vor adăuga date noi.");
        }

    }

    private void adaugaCategorieCheltuieli(EnumCategorieCheltuieli enumCategorieCheltuieli) {
        CategorieCheltuieli categorieCheltuieli = new CategorieCheltuieli();
        categorieCheltuieli.setNumeCategorie(enumCategorieCheltuieli);
        categorieCheltuieliRepository.save(categorieCheltuieli);
    }
}
