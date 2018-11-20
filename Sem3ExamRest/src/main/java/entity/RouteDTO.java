package entity;

import java.util.Date;

/**
 *
 * @author adams
 */
public class RouteDTO {

    private final String airline;
    private final String departure;
    private final String destination;
    private final String gender;
    private final Date depTime;
    private final Date arrTime;
    private final String duration;
    private final String price;
    private final String cancelInsurance;
    private final String airplane;
    private final String model;
    private final String capacity;

    public RouteDTO(String airline, String departure, String destination, String gender, Date depTime, Date arrTime, String duration, String price, String cancelInsurance, String airplane, String model, String capacity) {
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

    public Date getDepTime() {
        return depTime;
    }

    public Date getArrTime() {
        return arrTime;
    }

    public String getDuration() {
        return duration;
    }

    public String getPrice() {
        return price;
    }

    public String getCancelInsurance() {
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

    

    
}
