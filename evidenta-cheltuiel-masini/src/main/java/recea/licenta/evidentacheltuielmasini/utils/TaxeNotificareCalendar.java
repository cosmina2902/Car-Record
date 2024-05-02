package recea.licenta.evidentacheltuielmasini.utils;

import lombok.AllArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import recea.licenta.evidentacheltuielmasini.dto.MasinaDto;
import recea.licenta.evidentacheltuielmasini.enitity.Masina;
import recea.licenta.evidentacheltuielmasini.enitity.Taxe;
import recea.licenta.evidentacheltuielmasini.enitity.User;
import recea.licenta.evidentacheltuielmasini.repository.UserRepository;
import recea.licenta.evidentacheltuielmasini.service.EmailSenderService;
import recea.licenta.evidentacheltuielmasini.service.MasinaService;
import recea.licenta.evidentacheltuielmasini.service.TaxaService;

import java.util.List;
import org.slf4j.Logger;

@Component
@AllArgsConstructor
public class TaxeNotificareCalendar {
    private TaxaService taxaService;
    private EmailSenderService emailSenderService;
    private UserRepository userRepository;
    private MasinaService masinaService;


    @Scheduled(cron = "0 39 1 * * ?")
    public void sendTaxExpirationNotices() {

        int daysInAdvance = 7;
        System.out.println(("Checking for taxes expiring in " + daysInAdvance + " days."));
        List<Taxe> upcomingExpirations = taxaService.findTaxesThatWillExpireSoon(daysInAdvance);
        System.out.println(("Found " + upcomingExpirations.size() + " taxes expiring soon."));
        for (Taxe tax : upcomingExpirations) {
            System.out.println(("Processing tax for car: " + tax.getNumarInmatriculare()));
            MasinaDto masinaDto = masinaService.numarInmatriculare(tax.getNumarInmatriculare());
            if (masinaDto != null && masinaDto.getIdUser() != null) {
                User user = userRepository.findById(masinaDto.getIdUser()).orElse(null);
                if (user != null) {
                    String subject = "Expirare taxă în " + daysInAdvance + " zile";
                    String body = "Taxa de tipul " + tax.getTip() + " pentru " + tax.getNumarInmatriculare() + " va expira pe " + tax.getDataExpirare() + ".";
                    System.out.println(("Sending email to: " + user.getEmail()));
                    emailSenderService.sendEmail(user.getEmail(), subject, body);
                } else {
                    System.out.println(("No user found for car: " + tax.getNumarInmatriculare()));
                }
            } else {
                System.out.println(("No car found for tax record: " + tax.getIdTaxa()));
            }
        }
    }
}
