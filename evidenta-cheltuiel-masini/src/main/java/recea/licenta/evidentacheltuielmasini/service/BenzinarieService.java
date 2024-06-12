package recea.licenta.evidentacheltuielmasini.service;

import recea.licenta.evidentacheltuielmasini.enitity.Benzinarie;

import java.util.List;

public interface BenzinarieService {
    List<Benzinarie> getBenzinariiByOras(String oras);
}
