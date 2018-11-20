package utils;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import entity.Flight;
import java.util.List;

/**
 *
 * @author emilv
 */
public class JSONConverter
{

    private static Gson gson = new GsonBuilder().setPrettyPrinting().create();

    public static Flight getFlightFromJson(String json)
    {
        return gson.fromJson(json, Flight.class);
    }

    public static String getJSONFromFlight(Flight f)
    {
        return gson.toJson(f);
    }

    public static String getJSONFromPets(List<Flight> flights)
    {
        return gson.toJson(flights);
    }
}
