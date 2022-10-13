package Model;

import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class ListeVare {
    List<Vare> vareliste = new ArrayList<>();

    public void addVare(Vare vare){
        vareliste.add(vare);
    }
}

