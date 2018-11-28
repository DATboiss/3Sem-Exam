package security;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonObject;
import entity.User;
import entity.UserFacade;
import exceptions.AuthenticationException;
import exceptions.GenericExceptionMapper;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

/**
 *
 * @author adams
 */
@Path("register")
public class RegisterEndPoint {

    private static final Gson GSON = new GsonBuilder().setPrettyPrinting().create();

    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public Response register(String jsonString) throws AuthenticationException {
        try {
            User user = GSON.fromJson(jsonString, User.class);
            user.encryptUserPass();
            user = UserFacade.getInstance().createNewUser(user);
            String userJson = GSON.toJson(user);
            JsonObject responseJson = new JsonObject();
            responseJson.addProperty("user", userJson);
            return Response.ok(new Gson().toJson(responseJson)).build();
        } catch (Exception ex) {
            if (ex instanceof AuthenticationException) {
                throw (AuthenticationException) ex;
            }
            Logger.getLogger(GenericExceptionMapper.class.getName()).log(Level.SEVERE, null, ex);
        }
        throw new AuthenticationException("Email or Username is already in use");
    }
}
