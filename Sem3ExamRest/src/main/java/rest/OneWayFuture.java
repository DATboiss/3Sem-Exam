package rest;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import entity.OneWayDTO;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;
import java.util.stream.Collectors;

/**
 *
 * @author sebastian
 */
public class OneWayFuture
{

    private List<Future<String>> routeFutures = new ArrayList();
    private List<OneWayDTO> routeList = new ArrayList();
    private final Gson GSON = new GsonBuilder().setPrettyPrinting().create();
    private final List<String> airlineURLs = AirlineURLs.getAirlineURLs();

    public String routeFetcher(String departure, String destination, String date) throws InterruptedException, ExecutionException
    {
        try
        {

            ExecutorService executor = Executors.newFixedThreadPool(3);

            for (String url : airlineURLs)
            {
                RouteCallable callable = new RouteCallable(url);
                Future<String> future = executor.submit(callable);
                OneWayDTO[] routes = GSON.fromJson(future.get(), OneWayDTO[].class);
                for (OneWayDTO route : routes)
                {
                    String[] debParts = route.getDeparture().split(",");
                    String[] destParts = route.getDestination().split(",");
                    if (debParts.length > 1) {
                        route.setDeparture(debParts[1].trim());
                        route.setDestination(destParts[1].trim());
                    }
                    routeList.add(route);
                }
            }

            executor.shutdown();
            
            System.out.println(routeList);
            
            List<OneWayDTO> filteredRouteList = routeList.stream()
                    .filter(route -> route.getDeparture().equals(departure) && route.getDestination().equals(destination) && route.getDepTime().substring(0, 10).equals(date))
                    .collect(Collectors.toList());

            Collections.sort(filteredRouteList);

            return GSON.toJson(filteredRouteList);
        } catch (InterruptedException e)
        {
            throw new InterruptedException(e.getMessage());
        }
    }
}
