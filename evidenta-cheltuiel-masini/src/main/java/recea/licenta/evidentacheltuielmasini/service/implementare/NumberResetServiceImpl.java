package recea.licenta.evidentacheltuielmasini.service.implementare;

import lombok.AllArgsConstructor;
import net.sf.jsqlparser.expression.DateTimeLiteralExpression;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import recea.licenta.evidentacheltuielmasini.dto.NumberResetDto;
import recea.licenta.evidentacheltuielmasini.enitity.NumberResset;
import recea.licenta.evidentacheltuielmasini.enitity.User;
import recea.licenta.evidentacheltuielmasini.exception.ResourceNotFound;
import recea.licenta.evidentacheltuielmasini.repository.NumberResetRepository;
import recea.licenta.evidentacheltuielmasini.repository.UserRepository;
import recea.licenta.evidentacheltuielmasini.service.NumberResetService;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.random.RandomGenerator;

@Service
@AllArgsConstructor
public class NumberResetServiceImpl implements NumberResetService {
    private UserRepository userRepository;

    private NumberResetRepository numberResetRepository;

    @Override
    public String addNumberReset(String username) {
        LocalDateTime currentDate = LocalDateTime.now();

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFound("Username-ul nu a fost gasit"));
        RandomGenerator randomGenerator = RandomGenerator.getDefault();
        int min = 1000;
        int max = 9999;
        int number = randomGenerator.nextInt(max - min + 1) + min;

        NumberResset numberResset = new NumberResset();
        numberResset.setNumber((long) number);
        numberResset.setCreatedAt(currentDate);
        numberResset.setUser(user);
        numberResetRepository.save(numberResset);

        return "Numar generat cu succes";
    }

    @Override
    public Long getNumberReset(String username) {
        User user =  userRepository.findByUsername(username)
                .orElseThrow(()-> new ResourceNotFound("Username-ul nu a fost gasit"));

        NumberResset number = numberResetRepository.findByUser(user);

        return number.getNumber();


    }
}
