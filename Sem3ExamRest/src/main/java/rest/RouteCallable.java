package rest;

import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.Scanner;
import java.util.concurrent.Callable;

/**
 *
 * @author adams
 */
public class RouteCallable implements Callable<String> {

    private String url;

    public RouteCallable(String url) {
        this.url = url;
    }

    @Override
    public String call() throws InterruptedException  {
        try {
            System.out.println("starting " + Thread.currentThread().getId());
            return getRouteData();
        } catch (IOException e) {
            throw new InterruptedException(e.getMessage());
        }
    }

    public String getRouteData() throws MalformedURLException, IOException {
        URL url = new URL(this.url);
        HttpURLConnection con = (HttpURLConnection) url.openConnection();
        con.setRequestMethod("GET");
        con.setRequestProperty("Accept", "application/json;charset=UTF-8");
        con.setRequestProperty("User-Agent", "server");
        Scanner scan = new Scanner(con.getInputStream());
        String jsonStr = "";
        while (scan.hasNext()) {
            jsonStr += scan.nextLine();
        }
        scan.close();
        System.out.println("jsonstr" + jsonStr);
        return jsonStr;
    }
}
