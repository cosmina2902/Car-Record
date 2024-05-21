package recea.licenta.evidentacheltuielmasini.enitity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "poze")
public class PozaMasina {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private  Long id;

    private String name;

    private String type;

    @Lob
    @Column(name = "image_data", length = 1000000000)
    private byte [] imageData;

}
