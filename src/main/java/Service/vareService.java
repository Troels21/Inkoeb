package Service;

import Model.ListeVare;
import Model.Vare;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;


@Produces(MediaType.APPLICATION_JSON)
@Path("vare")
public class vareService {
    //TODO: replace with real database
    public ListeVare makeVare() {
        Vare vare1 = new Vare("vand");
        Vare vare2 = new Vare("hest");
        Vare vare3 = new Vare("bønner");
        Vare vare4 = new Vare("kokus");

        ListeVare listevare = new ListeVare();

        listevare.addVare(vare1);
        listevare.addVare(vare2);
        listevare.addVare(vare3);
        listevare.addVare(vare4);

        return listevare;
    }

    @GET
    public ListeVare getGiraffes() {
        return makeVare();
    }
}