package recea.licenta.evidentacheltuielmasini.service.implementare;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.AddressException;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;
import lombok.AllArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import recea.licenta.evidentacheltuielmasini.service.EmailSenderService;

@Service
@AllArgsConstructor
public class EmailSenderServiceImpl implements EmailSenderService {
    private JavaMailSender javaMailSender;

    public void sendEmail(String toEmail,
                          String subject,
                          String body){
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("recea.cosmina@gmail.com");
        message.setTo(toEmail);
        message.setText(body);
        message.setSubject(subject);

        javaMailSender.send(message);

        System.out.println("Mail Sent successfully...");
    }

    public void sendEmailForgotPassword(String toEmail, String subject, Long number) throws MessagingException {
        MimeMessage message = javaMailSender.createMimeMessage();
        message.setFrom(new InternetAddress("recea.cosmina@gmail.com"));
        message.setRecipients(MimeMessage.RecipientType.TO, toEmail);
        message.setSubject(subject);

        String htmlTemplate = """
        <div>
            <p>Codul pentru resetarea parolei este: %d</p>
            <p>Codul este valabil pentru 3 minute</p>
            <a href="http://localhost:3000/reset-password?email=%s" target="_blank">
            Mergi aici pentru a seta o noua parola </a>
        </div>
    """;

        String htmlContent = String.format(htmlTemplate, number, toEmail);
        message.setContent(htmlContent, "text/html; charset=utf-8");

        javaMailSender.send(message);

        System.out.println("Mail Sent successfully...");
    }

}
