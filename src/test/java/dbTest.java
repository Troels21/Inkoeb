import DAO.HibernateController;
import Model.Vare;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.junit.jupiter.api.Test;

public class dbTest {
    @Test
    public void testCreate(){
        HibernateController hibernateController =
                new HibernateController("pos-db.troelskiib.dk:6543/data");
        SessionFactory sessionFactory = hibernateController.getSessionFactory();
        Session session = sessionFactory.openSession();
        Transaction transaction = session.beginTransaction();
        Vare vare = new Vare();
        vare.setName("123");
        session.merge(vare);
        transaction.commit();
        Transaction readTransaction = session.beginTransaction();
        Vare readVare = session.get(Vare.class, vare.getName());
        System.out.println("Read user back: " + readVare.toString());
        readTransaction.commit();
        session.close();
    }
}
