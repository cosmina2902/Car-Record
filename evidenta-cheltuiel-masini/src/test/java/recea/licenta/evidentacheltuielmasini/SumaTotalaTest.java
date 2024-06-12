package recea.licenta.evidentacheltuielmasini;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import recea.licenta.evidentacheltuielmasini.enitity.Taxe;
import recea.licenta.evidentacheltuielmasini.repository.TaxaRepository;
import recea.licenta.evidentacheltuielmasini.service.TaxaService;
import recea.licenta.evidentacheltuielmasini.service.implementare.TaxaServiceImpl;

import java.time.LocalDate;
import java.util.Arrays;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class SumaTotalaTest {

    @Mock
    private TaxaRepository taxaRepository;

    @InjectMocks
    private TaxaServiceImpl taxaService;


    @Test
    void testGetToateCheltuielileMasina(){

        String numarInmatriculare = "ABC123";
        LocalDate today = LocalDate.now();

        Taxe taxe1 = new Taxe(1L, null, "Impozit", 100, today, today.plusYears(1), "image1.jpg", numarInmatriculare);
        Taxe taxe2 = new Taxe(2L, null, "Vigneta", 200, today, today.plusYears(1), "image2.jpg", numarInmatriculare);
        Taxe taxe3 = new Taxe(3L, null, "Asigurare", 300, today, today.plusYears(1), "image3.jpg", numarInmatriculare);

        when(taxaRepository.findByNumarInmatriculare(numarInmatriculare))
                .thenReturn(Arrays.asList(taxe1, taxe2, taxe3));

        Integer expected = 600;
        Integer actual = taxaService.getToateCheltuieleMasina(numarInmatriculare);

        assertEquals(expected, actual);

        verify(taxaRepository).findByNumarInmatriculare(numarInmatriculare);

    }
}
