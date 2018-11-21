package rest;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import entity.RouteDTO;
import java.net.URL;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Objects;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;
import java.util.stream.Collectors;

/**
 *
 * @author adams
 */
public class RouteFuture {

    private List<Future<String>> routeFutures = new ArrayList();
    private List<RouteDTO> routeList = new ArrayList();
    private final Gson GSON = new GsonBuilder().setPrettyPrinting().create();
    private final String url1 = "https://e7972226.ngrok.io/api/flights";
    private final String url2 = "https://e7972226.ngrok.io/api/flights";
    private final String url3 = "https://e7972226.ngrok.io/api/flights";
    
    public String routeFetcher(String departure, String destination) throws InterruptedException, ExecutionException {
        try {

            ExecutorService executor = Executors.newFixedThreadPool(3);
            
            RouteCallable callable = new RouteCallable(url1);
            Future<String> future1 = executor.submit(callable);
//            Future<String> future1 = executor.submit(()->{});
            if (Objects.nonNull(future1)) {
                routeFutures.add(future1);
            }

            for (Future<String> future2 : routeFutures) {
                routeList.add(GSON.fromJson(future2.get(), RouteDTO.class));
            }
            
            callable = new RouteCallable(url2);
            future1 = executor.submit(callable);
            if (Objects.nonNull(future1)) {
                routeFutures.add(future1);
            }
            
            for (Future<String> future2 : routeFutures) {
                routeList.add(GSON.fromJson(future2.get(), RouteDTO.class));
            }
            
            callable = new RouteCallable(url3);
            future1 = executor.submit(callable);
            if (Objects.nonNull(future1)) {
                routeFutures.add(future1);
            }

            for (Future<String> future2 : routeFutures) {
                routeList.add(GSON.fromJson(future2.get(), RouteDTO.class));
            }
            executor.shutdown();
            
            List<RouteDTO> filteredRouteList = routeList.stream()
                                .filter(route -> route.getDeparture().equals(departure) && route.getDestination().equals(destination))
                                .collect(Collectors.toList());
            
            Collections.sort(filteredRouteList);
            
            return GSON.toJson(filteredRouteList);
        } catch (InterruptedException e) {
            throw new InterruptedException(e.getMessage());
        }
    }
}
