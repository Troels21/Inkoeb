package Service;

import DAO.HibernateController;
import Model.ListeVare;
import Model.Vare;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import com.google.gson.Gson;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.query.criteria.JpaCriteriaQuery;

import java.util.List;


//test
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
@Path("vare")
public class vareService {
    Gson gson = new Gson();
    private static final HibernateController hibernateController = new HibernateController("pos-db.troelskiib.dk:6543/data");
    private static final SessionFactory sessionFactory = hibernateController.getSessionFactory();


    @GET
    public List<Vare> getVare() {
        Session session = sessionFactory.openSession();
        JpaCriteriaQuery<Vare> query = session.getCriteriaBuilder().createQuery(Vare.class);
        query.from(Vare.class);
        List<Vare> data = session.createQuery(query).getResultList();

        Transaction readTransaction = session.beginTransaction();
        readTransaction.commit();
        session.close();
        System.out.println("Got from database: " +data.toString());
        return data;
    }

    @POST
    public String postVareListe(String s) {
        ListeVare varliste = gson.fromJson(s, ListeVare.class);
        System.out.println(varliste.toString());
        String added = "";
        Session session = sessionFactory.openSession();
        for (int i = 0; i < varliste.getSize(); i++) {
            session.merge(varliste.getVare(i));
            added = added + varliste.getVare(i);
        }
        Transaction transaction = session.beginTransaction();
        transaction.commit();
        session.close();
        return "thanks added: " + added;
    }

    @DELETE
    public String deleteVare(String name){
        System.out.println(name);
        Vare vare;
        Session session = sessionFactory.openSession();
        vare = (Vare) session.get(Vare.class,name);
        session.remove(vare);
        Transaction transaction = session.beginTransaction();
        transaction.commit();
        session.close();
        return "removed"+vare;
    }

    @Path("single")
    @POST
    public String postVare(String name){
        System.out.println(name);
        Session session = sessionFactory.openSession();
        Vare vare = new Vare();
        vare.setName(name);
        session.persist(vare);
        Transaction transaction = session.beginTransaction();
        transaction.commit();
        session.close();
        return "got: " + name;
    }
}