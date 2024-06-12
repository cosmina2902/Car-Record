package recea.licenta.evidentacheltuielmasini.service.implementare;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import recea.licenta.evidentacheltuielmasini.enitity.Benzinarie;
import recea.licenta.evidentacheltuielmasini.repository.BenzinarieRepository;
import recea.licenta.evidentacheltuielmasini.service.BenzinarieService;

import java.util.List;
@Service
@AllArgsConstructor
public class BenzinarieServiceImpl implements BenzinarieService {
    private BenzinarieRepository benzinarieRepository;
    @Override
    public List<Benzinarie> getBenzinariiByOras(String oras) {
        return benzinarieRepository.findByOras(oras);
    }
}
