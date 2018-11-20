package facade;

import entity.Flight;
import java.util.Date;
import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

/**
 *
 * @author emilv
 */
public class FacadeFlight {

    EntityManagerFactory emf;

    public FacadeFlight() {
        emf = Persistence.createEntityManagerFactory("pu", null);
    }

    public EntityManager getEntityManager() {
        return emf.createEntityManager();
    }

    public List<Flight> getFlights() {
        EntityManager em = emf.createEntityManager();

        List<Flight> flights = null;
        try {
            em.getTransaction().begin();
            flights = em.createQuery("Select f FROM Flight f", Flight.class).getResultList();
            em.getTransaction().commit(); 
            return flights;
        } finally {
            em.close();
        }
    }
}
