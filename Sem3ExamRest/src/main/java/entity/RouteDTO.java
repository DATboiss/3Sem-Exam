package entity;

import java.util.Date;

/**
 *
 * @author adams
 */
public class RouteDTO implements Comparable<RouteDTO> {

    private final String airline;
    private final String departure;
    private final String destination;
    private final String gender;
    private final String depTime;
    private final String arrTime;
    private final int duration;
    private final int price;
    private final int cancelInsurance;
    private final String airplane;
    private final String model;
    private final String capacity;

    public RouteDTO(String airline, String departure, String destination, String gender, String depTime, String arrTime, int duration, int price, int cancelInsurance, String airplane, String model, String capacity) {
        this.airline = airline;
        this.departure = departure;
        this.destination = destination;
        this.gender = gender;
        this.depTime = depTime;
        this.arrTime = arrTime;
        this.duration = duration;
        this.price = price;
        this.cancelInsurance = cancelInsurance;
        this.airplane = airplane;
        this.model = model;
        this.capacity = capacity;
    }

    

 

    public String getAirline() {
        return airline;
    }

    public String getDeparture() {
        return departure;
    }

    public String getDestination() {
        return destination;
    }

    public String getGender() {
        return gender;
    }

    public String getDepTime() {
        return depTime;
    }

    public String getArrTime() {
        return arrTime;
    }

    public int getDuration() {
        return duration;
    }

    public int getPrice() {
        return price;
    }

    public int getCancelInsurance() {
        return cancelInsurance;
    }

    public String getAirplane() {
        return airplane;
    }

    public String getModel() {
        return model;
    }

    public String getCapacity() {
        return capacity;
    }

    @Override
    public String toString() {
        return "RouteDTO{" + "airline=" + airline + ", departure=" + departure + ", destination=" + destination + ", gender=" + gender + ", depTime=" + depTime + ", arrTime=" + arrTime + ", duration=" + duration + ", price=" + price + ", cancelInsurance=" + cancelInsurance + ", airplane=" + airplane + ", model=" + model + ", capacity=" + capacity + '}';
    }

    @Override
    public int compareTo(RouteDTO o) {
        return this.price - o.getPrice();
    }

    

    
}
