/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package rest;

import javax.ws.rs.core.Context;
import javax.ws.rs.core.UriInfo;
import javax.ws.rs.Produces;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PUT;
import javax.ws.rs.core.MediaType;

/**
 * REST Web Service
 *
 * @author emilv
 */
@Path("flights")
public class Flights {

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
    @Path("{test}")
    @Produces(MediaType.APPLICATION_JSON)
    public String getFlight() {
        return "{"
                + "“airline”:”British Airways”,"
                + "“departure”:”CPH”,"
                + "“destination”:”LHR”,"
                + "”depTime”:”YYYY-MM-DD-HH-MM”,"
                + "”arrTime”:”YYYY-MM-DD-HH-MM”,"
                + "”duration”: “125”,"
                + "”price”: “1019”,"
                + "“cancelInsurance”: “200”,"
                + "”airplane”: ”BA811”,"
                + "“model”: ”Airbus A321”,"
                + "”capacity”: “236”"
                + "}";
    }

    /**
     * PUT method for updating or creating an instance of Flights
     *
     * @param content representation for the resource
     */
    @PUT
    @Consumes(MediaType.APPLICATION_JSON)
    public void putJson(String content) {
    }
}
