package recea.licenta.evidentacheltuielmasini.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.AddressException;

public interface EmailSenderService {
    void sendEmail(String toEmail,
                   String subject,
                   String body);

    void sendEmailForgotPassword(String toEmail,
                            String subject, Long number) throws MessagingException;
}
