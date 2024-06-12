package recea.licenta.evidentacheltuielmasini;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import recea.licenta.evidentacheltuielmasini.enitity.Taxe;
import recea.licenta.evidentacheltuielmasini.repository.TaxaRepository;

import java.time.LocalDate;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
class EvidentaCheltuielMasiniApplicationTests {

	@Autowired
	private TaxaRepository taxaRepository;


	@Test
	void testGetToateCheltuieliMasina() {

		Taxe taxe1 = new Taxe(1L, null, "Impozit", 100, LocalDate.now(), LocalDate.now().plusYears(1), "image1.jpg", "ABC125");
		taxaRepository.save(taxe1);


		List<Taxe> taxes = taxaRepository.findByNumarInmatriculare("ABC125");
		
		assertEquals(1, taxes.size());
	}

}
