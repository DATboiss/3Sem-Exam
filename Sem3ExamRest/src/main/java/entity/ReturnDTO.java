package entity;

import java.util.Date;

/**
 *
 * @author anders
 */
public class ReturnDTO implements Comparable<ReturnDTO>
{

    private final String airline1;
    private final String departure1;
    private final String destination1;
    private final String depTime1;
    private final String arrTime1;
    private final int duration1;
    private final int price1;
    private final int cancelInsurance1;
    private final String airplane1;
    private final String model1;
    private final String capacity1;
    private final String airline2;
    private final String departure2;
    private final String destination2;
    private final String depTime2;
    private final String arrTime2;
    private final int duration2;
    private final int price2;
    private final int cancelInsurance2;
    private final String airplane2;
    private final String model2;
    private final String capacity2;
    private final int totalPrice;

    public ReturnDTO(String airline1, String departure1, String destination1, String depTime1, String arrTime1, int duration1, int price1, int cancelInsurance1, String airplane1, String model1, String capacity1, String airline2, String departure2, String destination2, String depTime2, String arrTime2, int duration2, int price2, int cancelInsurance2, String airplane2, String model2, String capacity2)
    {
        this.airline1 = airline1;
        this.departure1 = departure1;
        this.destination1 = destination1;
        this.depTime1 = depTime1;
        this.arrTime1 = arrTime1;
        this.duration1 = duration1;
        this.price1 = price1;
        this.cancelInsurance1 = cancelInsurance1;
        this.airplane1 = airplane1;
        this.model1 = model1;
        this.capacity1 = capacity1;
        this.airline2 = airline2;
        this.departure2 = departure2;
        this.destination2 = destination2;
        this.depTime2 = depTime2;
        this.arrTime2 = arrTime2;
        this.duration2 = duration2;
        this.price2 = price2;
        this.cancelInsurance2 = cancelInsurance2;
        this.airplane2 = airplane2;
        this.model2 = model2;
        this.capacity2 = capacity2;
        this.totalPrice = price1 + price2;
    }

    public ReturnDTO(OneWayDTO o1, OneWayDTO o2)
    {
        this.airline1 = o1.getAirline();
        this.departure1 = o1.getDeparture();
        this.destination1 = o1.getDestination();
        this.depTime1 = o1.getDepTime();
        this.arrTime1 = o1.getArrTime();
        this.duration1 = o1.getDuration();
        this.price1 = o1.getPrice();
        this.cancelInsurance1 = o1.getCancelInsurance();
        this.airplane1 = o1.getAirplane();
        this.model1 = o1.getModel();
        this.capacity1 = o1.getCapacity();
        this.airline2 = o2.getAirline();
        this.departure2 = o2.getDeparture();
        this.destination2 = o2.getDestination();
        this.depTime2 = o2.getDepTime();
        this.arrTime2 = o2.getArrTime();
        this.duration2 = o2.getDuration();
        this.price2 = o2.getPrice();
        this.cancelInsurance2 = o2.getCancelInsurance();
        this.airplane2 = o2.getAirplane();
        this.model2 = o2.getModel();
        this.capacity2 = o2.getCapacity();
        this.totalPrice = o1.getPrice() + o2.getPrice();
    }

    
    public String getAirline1()
    {
        return airline1;
    }

    public String getDeparture1()
    {
        return departure1;
    }

    public String getDestination1()
    {
        return destination1;
    }

    public String getDepTime1()
    {
        return depTime1;
    }

    public String getArrTime1()
    {
        return arrTime1;
    }

    public int getDuration1()
    {
        return duration1;
    }

    public int getPrice1()
    {
        return price1;
    }

    public int getCancelInsurance1()
    {
        return cancelInsurance1;
    }

    public String getAirplane1()
    {
        return airplane1;
    }

    public String getModel1()
    {
        return model1;
    }

    public String getCapacity1()
    {
        return capacity1;
    }

    public String getAirline2()
    {
        return airline2;
    }

    public String getDeparture2()
    {
        return departure2;
    }

    public String getDestination2()
    {
        return destination2;
    }


    public String getDepTime2()
    {
        return depTime2;
    }

    public String getArrTime2()
    {
        return arrTime2;
    }

    public int getDuration2()
    {
        return duration2;
    }

    public int getPrice2()
    {
        return price2;
    }

    public int getCancelInsurance2()
    {
        return cancelInsurance2;
    }

    public String getAirplane2()
    {
        return airplane2;
    }

    public String getModel2()
    {
        return model2;
    }

    public String getCapacity2()
    {
        return capacity2;
    }

    @Override
    public String toString()
    {
        return "ReturnDTO{" + "airline1=" + airline1 + ", departure1=" + departure1 + ", destination1=" + destination1 + ", depTime1=" + depTime1 + ", arrTime1=" + arrTime1 + ", duration1=" + duration1 + ", price1=" + price1 + ", cancelInsurance1=" + cancelInsurance1 + ", airplane1=" + airplane1 + ", model1=" + model1 + ", capacity1=" + capacity1 + ", airline2=" + airline2 + ", departure2=" + departure2 + ", destination2=" + destination2 + ", depTime2=" + depTime2 + ", arrTime2=" + arrTime2 + ", duration2=" + duration2 + ", price2=" + price2 + ", cancelInsurance2=" + cancelInsurance2 + ", airplane2=" + airplane2 + ", model2=" + model2 + ", capacity2=" + capacity2 + ", totalPrice=" + totalPrice + '}';
    }

    
    @Override
    public int compareTo(ReturnDTO o)
    {
        return this.totalPrice - (o.totalPrice);
    }

}
