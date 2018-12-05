package rest;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import entity.ReturnDTO;
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
 * @author anders
 */
public class ReturnFuture {

    private List<Future<String>> routeFutures = new ArrayList();
    private List<OneWayDTO> routeList = new ArrayList();
    private final Gson GSON = new GsonBuilder().setPrettyPrinting().create();
    private final List<String> airlineURLs = AirlineURLs.getAirlineURLs();

    public String routeFetcher(String departure, String destination, String date1, String date2) throws InterruptedException, ExecutionException {
        try {

            ExecutorService executor = Executors.newFixedThreadPool(3);

            for (String url : airlineURLs) {
                RouteCallable callable = new RouteCallable(url);
                Future<String> future = executor.submit(callable);
                OneWayDTO[] routes = GSON.fromJson(future.get(), OneWayDTO[].class);
                for (OneWayDTO route : routes) {
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

            List<OneWayDTO> filteredRouteList1 = routeList.stream()
                    .filter(route -> route.getDeparture().equals(departure) && route.getDestination().equals(destination) && route.getDepTime().substring(0, 10).equals(date1))
                    .collect(Collectors.toList());

            List<OneWayDTO> filteredRouteList2 = routeList.stream()
                    .filter(route -> route.getDeparture().equals(destination) && route.getDestination().equals(departure) && route.getDepTime().substring(0, 10).equals(date2))
                    .collect(Collectors.toList());

            List<ReturnDTO> returnRoutes = new ArrayList();
            for (int i = 0; i < filteredRouteList1.size(); i++) {
                for (int j = 0; j < filteredRouteList2.size(); j++) {
                    returnRoutes.add(new ReturnDTO(filteredRouteList1.get(i), filteredRouteList2.get(j)));
                }

            }

            Collections.sort(returnRoutes);

            return GSON.toJson(returnRoutes);
        } catch (InterruptedException e) {
            throw new InterruptedException(e.getMessage());
        }
    }
}
