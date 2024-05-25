package recea.licenta.evidentacheltuielmasini.dto;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import recea.licenta.evidentacheltuielmasini.enitity.Masina;
import recea.licenta.evidentacheltuielmasini.enitity.Role;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {

    private Long id;
    private String name;

    private String username;

    private String email;

    private String password;

    private Set<Role> roles;

    private List<Masina> masini = new ArrayList<>();
}
