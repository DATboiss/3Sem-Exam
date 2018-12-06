/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package rest;

import facade.FacadeFlight;
import java.text.ParseException;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.UriInfo;
import javax.ws.rs.Produces;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PUT;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import utils.JSONConverter;
import utils.SchemaBuilder;

/**
 * REST Web Service
 *
 * @author emilv
 */
@Path("flights")
public class Flights {

    FacadeFlight fp = new FacadeFlight();
    @Context
    private UriInfo context;

    /**
     * Creates a new instance of Flights
     */
    public Flights() {
    }

    /**
     * Retrieves representation of an instance of rest.Flights
     *
     * @return an instance of java.lang.String
     */
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getFlights() {
        String json = JSONConverter.getJSONFromFlights(fp.getFlights());
        return Response.status(Response.Status.ACCEPTED).entity(json).build();
    }
    
    @GET
    @Path("test")
    @Produces(MediaType.APPLICATION_JSON)
    public Response test() {
        return Response.status(Response.Status.ACCEPTED).entity("Hej det virker").build();
    }
//    @GET
//    @Path("create")
//    @Produces(MediaType.APPLICATION_JSON)
//    public Response createSchema() throws ParseException {
//        SchemaBuilder.generate();
//        return Response.status(Response.Status.ACCEPTED).entity("Generated").build();
//    }
}
