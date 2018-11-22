/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package utils;

import entity.Flight;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

/**
 *
 * @author emilv
 */
public class SchemaBuilder {

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) throws ParseException {
        Persistence.generateSchema("pu", null);
        EntityManagerFactory emf = Persistence.createEntityManagerFactory("pu");
        EntityManager em = emf.createEntityManager();

        Flight f1 = new Flight("DATFlights", "CPH", "TKY", "2019-01-01T07-05", "2018-01-02T07-05", 1440, 1000, 200, "AR2046", "Boeing 747", 300);
        Flight r1 = new Flight("DATFlights", "TKY", "CPH", "2019-01-08T15-00", "2018-01-009T15-00", 1440, 1000, 200, "AR2046", "Boeing 747", 300);

        Flight f2 = new Flight("DATFlights", "CPH", "LDN", "2019-02-10T07-05", "2018-02-10T09-05", 120, 500, 50, "DC1017", "Lillefly 15", 50);
        Flight r2 = new Flight("DATFlights", "LDN", "CPH", "2019-02-17T00-00", "2018-02-10T02-00", 120, 500, 50, "DC1017", "Lillefly 15", 50);

        Flight f2v2 = new Flight("DATFlights", "CPH", "LDN", "2019-03-10T07-05", "2018-03-10T09-05", 120, 650, 65, "DC1017", "Lillefly 15v2", 55);
        Flight r2v2 = new Flight("DATFlights", "LDN", "CPH", "2019-03-17T00-00", "2018-03-10T02-00", 120, 650, 65, "DC1017", "Lillefly 15v2", 55);

        Flight f2v3 = new Flight("DATFlights", "CPH", "LDN", "2019-03-10T15-05", "2018-03-10T17-05", 120, 700, 65, "DC1017", "Lillefly 15v2", 55);
        Flight r2v3 = new Flight("DATFlights", "LDN", "CPH", "2019-03-17T10-00", "2018-03-10T12-00", 120, 700, 65, "DC1017", "Lillefly 15v2", 55);

        Flight f3 = new Flight("DATFlights", "CPH", "DUB", "2019-03-13T10-05", "2018-03-13T15-10", 305, 950, 200, "BL1111", "Boeing 50", 200);
        Flight r3 = new Flight("DATFlights", "DUB", "CPH", "2019-03-20T11-05", "2018-03-13T15-05", 305, 950, 200, "BL1111", "Boeing 50", 200);

        Flight f4 = new Flight("DATFlights", "LDN", "AMD", "2019-04-21T10-00", "2018-04-21T15-37", 337, 450, 200, "AR2046", "Boeing 474", 300);
        Flight r4 = new Flight("DATFlights", "AMD", "LDN", "2019-04-28T10-00", "2018-04-21T15-37", 337, 450, 200, "AR2046", "Boeing 474", 300);

        Flight f5 = new Flight("DATFlights", "MUN", "STK", "2019-05-01T09-00", "2019-05-01T11-00", 120, 300, 70, "TK7654", "DC 100", 300);
        Flight r5 = new Flight("DATFlights", "STK", "MUN", "2019-05-08T15-00", "2019-05-08T17-00", 120, 300, 70, "TK7654", "DC 100", 300);

        Flight f6 = new Flight("DATFlights", "CPH", "LAX", "2019-06-16T10-37", "2019-06-01T19-37", 527, 2000, 500, "CL2929", "Boeing 747", 300);
        Flight r6 = new Flight("DATFlights", "LAX", "CPH", "2019-06-23T23-00", "2019-06-24T07-37", 527, 2000, 500, "CL2929", "Boeing 747", 300);

        Flight f7 = new Flight("DATFlights", "ROM", "AMS", "2019-07-31T23-00", "2019-08-01T00-30", 90, 600, 70, "RA2345", "DC 200", 300);
        Flight r7 = new Flight("DATFlights", "AMS", "ROM", "2019-08-08T11-30", "2019-07-08T13-00", 90, 600, 70, "RA2345", "DC 200", 300);

        Flight f8 = new Flight("DATFlights", "TKY", "AMS", "2019-08-01T09-00", "2019-08-02T09-00", 1440, 2500, 70, "TA9919", "Boeing 747", 300);
        Flight r8 = new Flight("DATFlights", "AMS", "TKY", "2019-08-09T15-00", "2019-08-10T15-00", 1440, 2500, 70, "TA9919", "Boeing 747", 300);

        Flight f9 = new Flight("DATFlights", "JFK", "UGN", "2019-09-11T09-00", "2019-09-01T18-00", 540, 1750, 70, "JU5403", "AL 765", 300);
        Flight r9 = new Flight("DATFlights", "UGN", "JFK", "2019-09-19T15-00", "2019-09-08T23-00", 540, 1750, 70, "JU5403", "AL765", 300);

        Flight f10 = new Flight("DATFlights", "CPH", "TUN", "2019-10-10T15-00", "2019-10-08T18-00", 180, 750, 70, "TD1058", "Medibig 50", 300);
        Flight r10 = new Flight("DATFlights", "TUN", "CPH", "2019-10-18T09-00", "2019-10-01T12-00", 180, 750, 70, "TD1058", "Medibig 50", 300);

        try {
            em.getTransaction().begin();
            em.persist(f1);
            em.persist(r1);
            
            em.persist(f2);
            em.persist(r2);
            
            em.persist(f2v2);
            em.persist(r2v2);
            
            em.persist(f2v3);
            em.persist(r2v3);
            
            em.persist(f2);
            em.persist(r2);
            
            em.persist(f3);
            em.persist(r3);
            
            em.persist(f4);
            em.persist(r4);
            
            em.persist(f5);
            em.persist(r5);
            
            em.persist(f6);
            em.persist(r6);
            
            em.persist(f7);
            em.persist(r7);
            
            em.persist(f8);
            em.persist(r8);
            
            em.persist(f9);
            em.persist(r9);
            
            em.persist(f10);
            em.persist(r10);
            em.getTransaction().commit();
        } finally {
            em.close();
        }

    }

}
