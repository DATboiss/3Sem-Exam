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
    private static final String url1 = "https://d37d1a96.ngrok.io/api/flights";
    private static final String url2 = "https://d37d1a96.ngrok.io/api/flights";
    private static final String url3 = "https://d37d1a96.ngrok.io/api/flights";

    public static List<String> getAirlineURLs()
    {

        airlineURLs.add(url1);
        airlineURLs.add(url2);
        airlineURLs.add(url3);
        return airlineURLs;
    }

}
