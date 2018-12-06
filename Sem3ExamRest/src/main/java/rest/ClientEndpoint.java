package rest;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import entity.UserDTO;
import entity.UserFacade;
import exceptions.AuthenticationException;
import java.util.concurrent.ExecutionException;
import javax.annotation.security.RolesAllowed;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.SecurityContext;
import javax.ws.rs.core.UriInfo;

/**
 *
 * @author adams
 */
@Path("client")
public class ClientEndpoint {

    @Context
    private UriInfo context;
    @Context
    SecurityContext securityContext;
    private final Gson GSON = new GsonBuilder().setPrettyPrinting().create();

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("user")
    @RolesAllowed("user")
    public String getFromUser() throws AuthenticationException {
        String username = securityContext.getUserPrincipal().getName();
        UserDTO user = UserFacade.getInstance().getUserDTO(username);
        return GSON.toJson(user);
    }


    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("admin")
    @RolesAllowed("admin")
    public String getFromAdmin() {
        String user = securityContext.getUserPrincipal().getName();
        return "\"" + user + "\"";
    }
    

}
