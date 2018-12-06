package entity;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;
import exceptions.AuthenticationException;
import javax.persistence.Query;

/**
 *
 * @author lam@cphbusiness.dk
 */
public class UserFacade {

    //Default EntityManagerFactory
    EntityManagerFactory emf = Persistence.createEntityManagerFactory("pu");
    private static final UserFacade instance = new UserFacade();
    
    private UserFacade(){}
    
    public static UserFacade getInstance(){
        return instance;
    }
    
    public User getVeryfiedUser(String username, String password) throws AuthenticationException {
        EntityManager em = emf.createEntityManager();
        User user;
        try {
            user = em.createQuery("SELECT u FROM User u where u.username = :username", User.class).setParameter("username", username).getSingleResult();
            if (user == null || !user.verifyPassword(password)) { 
                throw new AuthenticationException("Invalid user name or password");
            }
        } finally {
            em.close();
        }
        return user;
    }
    public UserDTO getUserDTO(String username) throws AuthenticationException {
        EntityManager em = emf.createEntityManager();
        UserDTO user;
        try {
            user = em.createQuery("SELECT new entity.UserDTO(u) FROM User u where u.username = :username", UserDTO.class).setParameter("username", username).getSingleResult();
        } finally {
            em.close();
        }
        return user;
    }
    
    public User createNewUser(User user) {
        EntityManager em = emf.createEntityManager();
        try {
            Role userRole = new Role("user");
            em.getTransaction().begin();
            user.addRole(userRole);
            em.merge(user);
            em.getTransaction().commit();
        } finally {
            em.close();
        }
        return user;
    }

}
