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

    public Vare getVare(int index){
        return vareliste.get(index);
    }

    public int getSize(){
        return vareliste.size();
    }
}

