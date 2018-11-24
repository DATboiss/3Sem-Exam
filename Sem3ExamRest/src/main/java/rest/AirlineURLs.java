package rest;

import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author anders
 */
public class AirlineURLs
{

    private static List<String> airlineURLs = new ArrayList();
    private static final String url1 = "https://emilvh.dk/DATFlights/api/flights";
    private static final String url2 = "https://emilvh.dk/DATFlights/api/flights";
    private static final String url3 = "https://emilvh.dk/DATFlights/api/flights";

    public static List<String> getAirlineURLs()
    {
        if (airlineURLs.isEmpty()) {
        airlineURLs.add(url1);
        airlineURLs.add(url2);
        airlineURLs.add(url3);
        }
        return airlineURLs;
    }

}
