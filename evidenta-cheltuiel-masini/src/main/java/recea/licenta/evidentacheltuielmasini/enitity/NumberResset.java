package recea.licenta.evidentacheltuielmasini.enitity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "numbers_reset")
public class NumberResset {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private Long number;
    @Column(nullable = false)
    private LocalDateTime createdAt;
    @OneToOne
    @JoinColumn(name = "id_user", nullable = false)
    private User user;
}
