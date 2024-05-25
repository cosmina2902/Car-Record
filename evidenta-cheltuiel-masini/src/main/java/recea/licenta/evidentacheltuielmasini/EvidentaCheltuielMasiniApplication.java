package recea.licenta.evidentacheltuielmasini;

import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.annotation.Bean;
import org.springframework.context.event.EventListener;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import recea.licenta.evidentacheltuielmasini.service.EmailSenderService;

@SpringBootApplication
@AllArgsConstructor
@EnableScheduling
@EnableTransactionManagement
public class EvidentaCheltuielMasiniApplication {


	@Bean
	public ModelMapper modelMapper(){
		return new ModelMapper();
	}


	public static void main(String[] args) {

		SpringApplication.run(EvidentaCheltuielMasiniApplication.class, args);
	}

}
