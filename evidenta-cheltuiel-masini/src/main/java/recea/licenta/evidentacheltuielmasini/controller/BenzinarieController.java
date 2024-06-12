package recea.licenta.evidentacheltuielmasini.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import recea.licenta.evidentacheltuielmasini.enitity.Benzinarie;
import recea.licenta.evidentacheltuielmasini.service.BenzinarieService;

import java.util.List;

@RestController
@RequestMapping("/benzinarii")
@AllArgsConstructor
@CrossOrigin
public class BenzinarieController {
    private static final String GOOGLE_GEOCODE_API_URL = "https://maps.googleapis.com/maps/api/geocode/json";
    private static final String GOOGLE_PLACES_API_URL = "https://maps.googleapis.com/maps/api/place/nearbysearch/json";
    private static final String API_KEY = "AIzaSyDhnG11E_hWe1Gx5OP0Th0hYQUr2Uf6oyA";

    @GetMapping("/geocode/{address}")
    public ResponseEntity<String> getGeocode(@PathVariable String address) {
        String url = String.format("%s?address=%s&key=%s", GOOGLE_GEOCODE_API_URL, address, API_KEY);
        RestTemplate restTemplate = new RestTemplate();
        String response = restTemplate.getForObject(url, String.class);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/places")
    public ResponseEntity<String> getPlaces(double lat, double lng) {
        String url = String.format("%s?location=%s,%s&radius=5000&type=gas_station&key=%s", GOOGLE_PLACES_API_URL, lat, lng, API_KEY);
        RestTemplate restTemplate = new RestTemplate();
        String response = restTemplate.getForObject(url, String.class);
        return ResponseEntity.ok(response);
    }
}
