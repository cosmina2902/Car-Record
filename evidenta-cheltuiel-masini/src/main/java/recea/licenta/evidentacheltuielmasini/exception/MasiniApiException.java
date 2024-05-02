package recea.licenta.evidentacheltuielmasini.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@AllArgsConstructor
@Getter
public class MasiniApiException extends RuntimeException{
    private HttpStatus status;
    private String mesaj;
}
