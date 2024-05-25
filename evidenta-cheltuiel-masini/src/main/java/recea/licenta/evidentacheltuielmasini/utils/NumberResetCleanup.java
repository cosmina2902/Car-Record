package recea.licenta.evidentacheltuielmasini.utils;

import lombok.AllArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import recea.licenta.evidentacheltuielmasini.repository.NumberResetRepository;

import java.time.LocalDateTime;

@Component
@AllArgsConstructor

public class NumberResetCleanup {
    private NumberResetRepository numberResetRepository;
    @Scheduled(fixedRate = 180000)
    @Transactional
    public void cleanUpOldNumberRessets() {
        LocalDateTime threeMinutesAgo = LocalDateTime.now().minusMinutes(3);
        numberResetRepository.deleteAllByCreatedAtBefore(threeMinutesAgo);
        System.out.println("Tabela resetata cu succes!");
    }
}
