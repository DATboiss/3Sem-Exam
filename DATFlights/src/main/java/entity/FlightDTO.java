package entity;

import java.util.Date;

/**
 *
 * @author emilv
 */
public class FlightDTO {

    private final String airline;
    private final String departure;
    private final String destination;
    private final String depTime;
    private final String arrTime;
    private final int duration;
    private final int price;
    private final int cancelInsurance;
    private final String airplane;
    private final String model;
    private final int capacity;

    public FlightDTO(Flight f) {
        this.airline = f.getAirline();
        this.departure = f.getDeparture();
        this.destination = f.getDestination();
        this.depTime = f.getDepTime();
        this.arrTime = f.getArrTime();
        this.duration = f.getDuration();
        this.price = f.getPrice();
        this.cancelInsurance = f.getCancelInsurance();
        this.airplane = f.getAirplane();
        this.model = f.getModel();
        this.capacity = f.getCapacity();
    }

    @Override
    public String toString() {
        return "FlightDTO{" + "airline=" + airline + ", departure=" + departure + ", destination=" + destination + ", depTime=" + depTime + ", arrTime=" + arrTime + ", duration=" + duration + ", price=" + price + ", cancelInsurance=" + cancelInsurance + ", airplane=" + airplane + ", model=" + model + ", capacity=" + capacity + '}';
    }

    
}
