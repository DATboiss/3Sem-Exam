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
        
        String pattern = "YYYY-MM-DD-HH-MM";
        SimpleDateFormat sdf = new SimpleDateFormat(pattern);
        
        
        Date depDate1 = sdf.parse("2018-01-01-07-05");
        Date arrDate1 = sdf.parse("2018-01-02-07-05");
        Flight f1 = new Flight("DATFlights", "CPH", "TKY", depDate1, arrDate1, 1440, 1000, 200, "AR2046", "Boeing 747", 300);
        
        Date depDate2 = sdf.parse("2018-02-10-07-05");
        Date arrDate2 = sdf.parse("2018-02-10-08-05");
        Flight f2 = new Flight("DATFlights", "CPH", "LDN", depDate2, arrDate2, 120, 500, 50, "DC1017", "Lillefly 15", 50);
        
        Date depDate3 = sdf.parse("2018-03-13-10-05");
        Date arrDate3 = sdf.parse("2018-03-13-15-10");
        Flight f3 = new Flight("DATFlights", "CPH", "DUB", depDate3, arrDate3, 305, 950, 200, "BL1111", "Boeing 50", 200);
        
        Date depDate4 = sdf.parse("2018-04-21-10-00");
        Date arrDate4 = sdf.parse("2018-04-21-15-37");
        Flight f4 = new Flight("DATFlights", "LDN", "AMD", depDate4, arrDate4, 337, 450, 200, "AR2046", "Boeing 474", 300);
        
        try{
            em.getTransaction().begin();
            em.persist(f1);
            em.persist(f2);
            em.persist(f3);
            em.persist(f4);
            em.getTransaction().commit();
        }finally{
            em.close();
        }
        
    }
    
}
