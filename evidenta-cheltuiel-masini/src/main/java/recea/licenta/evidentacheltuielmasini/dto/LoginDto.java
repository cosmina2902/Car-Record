package recea.licenta.evidentacheltuielmasini.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Setter
public class LoginDto {
    private String usernameOrEmail;
    private String password;
}
