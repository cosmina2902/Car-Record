package recea.licenta.evidentacheltuielmasini.dto;

import jakarta.persistence.*;
import recea.licenta.evidentacheltuielmasini.enitity.User;

import java.time.LocalDateTime;

public class NumberResetDto {

    private Long id;

    private Long number;
    private LocalDateTime createdAt;

    private User user;
}
