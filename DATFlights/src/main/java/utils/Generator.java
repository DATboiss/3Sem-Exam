package utils;

import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.Random;
import java.util.Set;
import javax.json.JsonArray;
import javax.json.JsonNumber;
import javax.json.JsonString;
import javax.json.JsonValue;

/**
 *
 * @author emilv
 */
public class Generator
{
    
    private Generator()
    {
    }

    private static String[] airports =
    {
        "ATL","PEK","CPH","LDN","AMD","PAR","LHR","DXB", "AMS","ROM","MAD","JFK","MUC", "BER", "STH"
    };

    public static List<JsonObject> generate(int iterations, int startingId)
    {
//        Random rand = new Random();
//        String hour = rand.nextInt(20)
//        String departure;
//        String depTime = "2019-06-09" + hour + rand.nextInt(60);
//        String depTime = "2019-06-09" + (hour+2) + rand.nextInt(60);
//        String arrTime = 
//        
//        
//        List<JsonObject> jOs = new ArrayList();
//        for (int i = startingId; i < (startingId + iterations); i++)
//        {
//            departure = airports[rand.nextInt(airports.length)];
//            JsonObject jo = new JsonObject();
//            jo.addProperty("airline", "DATFlights");
//            jo.addProperty("departure", departure);
//            jo.addProperty("destination", notSameAirport(departure));
//            jo.addProperty("depTime", "");
//            jo.addProperty("arrTime", [rand.nextInt(lNames.length)]);
//            jo.addProperty("duration", rand.nextInt(54)+17);
//            jo.addProperty("price", rand.nextInt(54)+17);
//            jo.addProperty("cancelInsurance", rand.nextInt(54)+17);
//            jo.addProperty("airplane", rand.nextInt(54)+17);
//            jo.addProperty("model", rand.nextInt(54)+17);
//            jo.addProperty("model", rand.nextInt(54)+17);
//            jo.addProperty("capacity", rand.nextInt(54)+17);
//            jOs.add(jo);
//        }
        return null; //jOs
    }
    
    private static String notSameAirport(String name)
    {
        Random rand = new Random();
        String airport = airports[rand.nextInt(airports.length)];
        while (airport.equals(name))
        {
            airport = airports[rand.nextInt(airports.length)];
        }
        return airport;
    }
}
