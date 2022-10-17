package Model;

import jakarta.persistence.*;
import lombok.Data;


@Entity
@Table(name = "DBVARE")
@Data
public class Vare {
    @Id
    @Column(name = "name")
    String name;

    public Vare() {

    }
}


