package recea.licenta.evidentacheltuielmasini;

import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.annotation.Bean;
import org.springframework.context.event.EventListener;
import org.springframework.scheduling.annotation.EnableScheduling;
import recea.licenta.evidentacheltuielmasini.service.EmailSenderService;

@SpringBootApplication
@AllArgsConstructor
@EnableScheduling
public class EvidentaCheltuielMasiniApplication {

	private EmailSenderService senderService;

	@Bean
	public ModelMapper modelMapper(){
		return new ModelMapper();
	}


	public static void main(String[] args) {

		SpringApplication.run(EvidentaCheltuielMasiniApplication.class, args);
	}
//	@EventListener(ApplicationReadyEvent.class)
//	public void sendEmail(){
//		senderService.sendEmail("diadiandra54@gmail.com",
//				"Cosmina te iubeste",
//				"Vezi ca trebuie sa-ti platesti itp-ul");
//	}

}
