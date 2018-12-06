package utils;

import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import entity.Airport;
import entity.Flight;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.Random;
import java.util.Set;
import javax.json.JsonArray;
import javax.json.JsonNumber;
import javax.json.JsonString;
import javax.json.JsonValue;

/**
 *
 * @author emilv
 */
public class Generator {

    List<Flight> flights = new ArrayList();
    List<Airport> airports = new ArrayList();
    private int deptMinute;
    private int deptHour;
    private int deptDay;
    private int deptMonth;
    private int arrMinute;
    private int arrHour;
    private int arrDay;
    private int arrMonth;

    public Generator() {
        airports.add(new Airport("London", "England", "UK", "LHR"));
        airports.add(new Airport("Paris", "Frankrig", "FR", "CDG"));
        airports.add(new Airport("Amsterdam", "Holland", "NL", "AMS"));
        airports.add(new Airport("Frankfurt", "Tyskland", "DE", "FRA"));
        airports.add(new Airport("Madrid", "Spanien", "ES", "MAD"));
//        airports.add(new Airport("Istanbul", "Tyrkiet", "TR", "IST"));
//        airports.add(new Airport("Barcelona", "Spanien", "ES", "BCN"));
//        airports.add(new Airport("München", "Tyskland", "DE", "MUC"));
//        airports.add(new Airport("Rom", "Italien", "IT", "FCO"));
//        airports.add(new Airport("Moskva", "Rusland", "RU", "SVO"));
//        airports.add(new Airport("Paris", "Frankrig", "FR", "ORY"));
//        airports.add(new Airport("Moskva", "Rusland", "RU", "DME"));
//        airports.add(new Airport("Dublin", "Irland", "IE", "DUB"));
//        airports.add(new Airport("Zürich", "Schweiz", "CH", "ZRH"));
//        airports.add(new Airport("København", "Danmark", "DK", "CPH"));
//        airports.add(new Airport("Palma de Mallorca", "Spanien", "SP", "PMI"));
//        airports.add(new Airport("Manchester", "England", "UK", "MAN"));
//        airports.add(new Airport("Oslo", "Norge", "NO", "OSL"));
//        airports.add(new Airport("Lissabon", "Portugal", "PT", "LIS"));
//        airports.add(new Airport("Stockholm", "Sverige", "SW", "ARN"));
//        airports.add(new Airport("London", "England", "UK", "STN"));
//        airports.add(new Airport("Bruxelles", "Belgien", "BE", "BRU"));
//        airports.add(new Airport("Düsseldorf", "Tyskland", "DE", "DUS"));
//        airports.add(new Airport("Wien", "Østrig", "AT", "VIE"));
//        airports.add(new Airport("Milano", "Italien", "IT", "MXP"));
//        airports.add(new Airport("Athen", "Grækenland", "GR", "ATH"));
//        airports.add(new Airport("Berlin", "Tyskland", "DE", "TXL"));
//        airports.add(new Airport("Helsinki", "Finland", "FI", "HEL"));
//        airports.add(new Airport("Málaga", "Spanien", "ES", "AGP"));
//        airports.add(new Airport("London", "England", "UK", "LGW"));
    }

    public Flight generateFlights() {
        Flight flight = null;

        String[] airplaneModels = {"Airbus A321", "Boeing 747", "Boeing 787", "Airbus A320", "Airbus A380", "Douglas DC-9"};
        Random rand = new Random();
        deptMonth = (1);
        int daysInMonth = getMonthMaxDate(deptMonth);
        deptDay = (rand.nextInt(14) + 1);
        deptHour = rand.nextInt(23);
        deptMinute = rand.nextInt(60);
        int duration = rand.nextInt(1321) + 120;

        arrHour = getArrivalHour(deptHour, duration);
        arrMinute = duration % 60;
        int departureIndex = rand.nextInt(airports.size());
        int destinationIndex = rand.nextInt(airports.size());
        String departure = airports.get(departureIndex).getAirportCode();
        String destination = airports.get(destinationIndex).getAirportCode();
        while (destinationIndex == departureIndex) {
            destinationIndex = rand.nextInt(airports.size());
            destination = airports.get(destinationIndex).getAirportCode();
        }
        String deptMonthString = verifyNumberFormat(deptMonth);
        String deptDayString = verifyNumberFormat(deptDay);
        String deptHourString = verifyNumberFormat(deptHour);
        String deptMinuteString = verifyNumberFormat(deptMinute);
        String deptTime = "2019-" + deptMonthString + "-" + deptDayString + "T" + deptHourString + ":" + deptMinuteString;
        String arrMonthString = verifyNumberFormat(arrMonth);
        String arrDayString = verifyNumberFormat(arrDay);
        String arrHourString = verifyNumberFormat(arrHour);
        String arrMinuteString = verifyNumberFormat(arrMinute);
        String arrTime = "2019-" + arrMonthString + "-" + arrDayString + "T" + arrHourString + ":" + arrMinuteString;

        int price = rand.nextInt(9351) + 450;
        int cancelInsurance = (int) (price * 0.1);
        String airplane = "DF" + (rand.nextInt(899) + 100);
        String model = airplaneModels[rand.nextInt(airplaneModels.length)];
        int capacity = rand.nextInt(165) + 200;

        flight = new Flight(airplane, departure, destination, deptTime, arrTime, duration, price, cancelInsurance, airplane, model, capacity);
        return flight;
    }

    //checks if the month should increment and if it does, the day is set to the first day of the month
    private int checkIfMonthShouldIncrement(int arrDay) {
        this.arrMonth = this.deptMonth;
        int monthMaxDay = getMonthMaxDate(this.arrMonth);
        if (arrDay > monthMaxDay) {
            if (this.arrMonth == 12) {
                this.arrMonth = 1;
            } else {
                this.arrMonth++;
            }
            return 1;
        }
        return arrDay;
    }

    private int getArrivalHour(int deptHour, int duration) {
        if (deptHour + (duration / 60) > 24) {
            this.arrDay = this.deptDay + 1;
            this.arrDay = checkIfMonthShouldIncrement(this.arrDay);
            int midnight = 24;
            int timeTillMidnight = midnight - deptHour;
            return (duration / 60) - timeTillMidnight;
        } else {
            this.arrDay = this.deptDay;
            this.arrMonth = this.deptMonth;
            return deptHour + (duration / 60);
        }
    }

    private int getMonthMaxDate(int month) {
        int[] monthsWith31Days = {1, 3, 5, 7, 8, 10, 12};
        int[] monthsWith30Days = {4, 6, 9, 11};
        for (int i = 0; i < monthsWith30Days.length - 1; i++) {
            if (month == monthsWith30Days[i]) {
                return 31;
            }
        }
        for (int i = 0; i < monthsWith31Days.length - 1; i++) {
            if (month == monthsWith31Days[i]) {
                return 30;
            }
        }
        //If it's February
        return 28;
    }

    private String verifyNumberFormat(int deptMonth) throws NumberFormatException {
        String depthMonthString = Integer.toString(deptMonth);
        if (deptMonth < 10) {
            depthMonthString = "0" + deptMonth;
        }
        return depthMonthString;
    }

}
