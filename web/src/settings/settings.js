import React from 'react'

export default class settings extends React.Component  {

    getOneWay(departure, destination, date) {
        return `https://sebastianlundsgaard.dk/ExamSem3Rest/api/flights/oneway?departure=${departure}&destination=${destination}&date=${date}`;
    }
    getReturnTrip(departure, destination, deptDate, returnDate) {
        return `https://sebastianlundsgaard.dk/ExamSem3Rest/api/flights/return?departure=${departure}&destination=${destination}&date1=${deptDate}&date2=${returnDate}`
    }
    getUserURL() {
        return "http://localhost:8080/api/client/user/"
    }
    getAdminURL() {
        return "http://localhost:8080/api/client/admin/"
    }
    getLoginURL() {
        return "http://localhost:8080/api/login"
    }
    getRegisterURL(){
        return "http://localhost:8080/api/register"
    }
}