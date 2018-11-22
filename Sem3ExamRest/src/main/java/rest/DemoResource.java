package rest;

import java.util.concurrent.ExecutionException;
import javax.annotation.security.RolesAllowed;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.UriInfo;
import javax.ws.rs.Produces;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.SecurityContext;


/**
 *
 * @author anders & sebastian
 */
@Path("flights")
public class DemoResource
{

    @Context
    private UriInfo context;

    @Context
    SecurityContext securityContext;

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/oneway")
    public String getRoutes(
            @QueryParam("departure") String departure,
            @QueryParam("destination") String destination,
            @QueryParam("date") String date)
            throws InterruptedException, ExecutionException
    {
        try
        {
            OneWayFuture of = new OneWayFuture();
            return of.routeFetcher(departure, destination, date);
        } catch (ExecutionException e)
        {
            throw new InterruptedException(e.getMessage());
        }
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/return")
    public String getRoutes(
            @QueryParam("departure") String departure,
            @QueryParam("destination") String destination,
            @QueryParam("date1") String date1,
            @QueryParam("date2") String date2)
            throws InterruptedException, ExecutionException
    {
        try
        {
            ReturnFuture rf = new ReturnFuture();
            return rf.routeFetcher(departure, destination, date1, date2);
        } catch (ExecutionException e)
        {
            throw new InterruptedException(e.getMessage());
        }
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("user")
    @RolesAllowed("user")
    public String getFromUser()
    {
        String user = securityContext.getUserPrincipal().getName();
        return "\"Hello from USER: " + user + "\"";
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("admin")
    @RolesAllowed("admin")
    public String getFromAdmin()
    {
        String user = securityContext.getUserPrincipal().getName();
        return "\"Hello from ADMIN: " + user + "\"";
    }
}
