import React, { Component } from 'react';
import { AppRegistry, Text, TextInput, StyleSheet, View, TouchableHighlight } from 'react-native';
import DatePicker from 'react-native-datepicker'
import dataFacade from '../dataFacade'
import Result from './Result';


export default class SearchParameter extends Component {
    constructor(props) {
        super(props);
        this.state = { searched: false, 
    };
    }

    fetchFlights = async (e) => {
        e.preventDefault();
        this.setState({searched: true })
        this.props.setResultsMounted(true);
        const { departure, destination, date1, date2, date } = this.props.state;
        if (this.props.tripType === "returntrip") {
            const flights = await dataFacade.getReturnRoutes(departure, destination, date1, date2)
            this.setState({ searched: false });
            this.props.setResultsMounted(false);
            this.props.setFlights(flights);
        }
        else {
            const flights = await dataFacade.getOneWayRoutes(departure, destination, date)
            this.setState({ searched: false })
            this.props.setResultsMounted(false);
            this.props.setFlights(flights);
        }
    }


    returnTrip() {
        return (
            <>
                <View style={styles.inputContainer}>
                    <TextInput style={styles.input} type="text" autoCapitalize="characters" name="departure" placeholder="Departure" onChangeText={(e) => this.props.onDataChanged("departure", e)} />
                    <TextInput style={styles.input} type="text" autoCapitalize="characters" name="destination" placeholder="Destination" onChangeText={(e) => this.props.onDataChanged("destination", e)} />
                    <TextInput style={styles.input} type="text" keyboardType="numeric" name="passengers" placeholder="Passengers" onChangeText={(e) => this.props.onDataChanged("passengers", e)} />
                </View>
                <View style={styles.dateContainer}>
                    <DatePicker style={{ width: 200 }}
                        date={this.props.state.date1}
                        mode="date"
                        // placeholder="Departure date"
                        format="YYYY-MM-DD"
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        customStyles={{
                            dateIcon: {
                                position: 'absolute',
                                left: 0,
                                top: 4,
                            },
                            dateInput: {
                                marginLeft: 36,
                                marginTop: 10
                            },
                            dateText: {
                                color: "white"
                            }
                        }}
                        onDateChange={(e) => this.props.onDataChanged("date1", e)}
                    />
                    <DatePicker style={{ width: 200 }}
                        date={this.props.state.date2}
                        mode="date"
                        // placeholder="Return date"
                        format="YYYY-MM-DD"
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        customStyles={{
                            dateIcon: {
                                position: 'absolute',
                                left: 0,
                                top: 4,
                            },
                            dateInput: {
                                marginLeft: 36,
                                marginTop: 10
                            },
                            dateText: {
                                color: "white"
                            }
                        }}
                        onDateChange={(e) => this.props.onDataChanged("date2", e)}
                    />
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableHighlight style={styles.button} id="returnSubmitButton" onPress={this.fetchFlights} underlayColor="white">
                        <View>
                            <Text style={styles.buttonText}>Search for flight</Text>
                        </View>
                    </TouchableHighlight>
                </View>
                {/* <Text>{JSON.stringify(this.props.state)}</Text> */}
            </>
        );
    }

    oneWayTrip() {
        return (
            <>
                <View style={styles.inputContainer}>
                    <TextInput style={styles.input} type="text" autoCapitalize="characters" name="departure" placeholder="Departure" onChangeText={(e) => this.props.onDataChanged("departure", e)} />
                    <TextInput style={styles.input} type="text" autoCapitalize="characters" name="destination" placeholder="Destination" onChangeText={(e) => this.props.onDataChanged("destination", e)} />
                    <TextInput style={styles.input} type="text" keyboardType="numeric" name="passengers" placeholder="Passengers" onChangeText={(e) => this.props.onDataChanged("passengers", e)} />
                </View>
                <View style={styles.dateContainer}>
                    <DatePicker style={{ width: 200 }}
                        date={this.props.state.date}
                        mode="date"
                        placeholder="Departure date"
                        format="YYYY-MM-DD"
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        customStyles={{
                            dateIcon: {
                                position: 'absolute',
                                left: 0,
                                top: 4,
                                marginTop: 10
                            },
                            dateInput: {
                                marginLeft: 36,
                                marginTop: 10
                            },
                            dateText: {
                                color: "white"
                            }
                        }}
                        onDateChange={(e) => this.props.onDataChanged("date", e)}
                    />
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableHighlight style={styles.button} id="oneWaySubmitButton" onPress={this.fetchFlights} underlayColor="white">
                        <View>
                            <Text style={styles.buttonText}>Search for flight</Text>
                        </View>
                    </TouchableHighlight>
                </View>

                {/* <Text>{JSON.stringify(this.props.state)}</Text> */}
            </>
        );
    }

    render = () => {
        return (
            <View>
                <View style={styles.buttonContainer}>
                    <TouchableHighlight style={styles.button} id="oneway" onPress={() => this.props.setTripType("oneway")} underlayColor="white">
                        <View>
                            <Text style={styles.buttonText}>One way</Text>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight style={styles.button} id="returntrip" onPress={() => this.props.setTripType("returntrip")} underlayColor="white">
                        <View>
                            <Text style={styles.buttonText}>Return trip</Text>
                        </View>
                    </TouchableHighlight>
                </View>
                {
                    (this.props.tripType === "returntrip") ? this.returnTrip() : this.oneWayTrip()
                }
                {
                    (this.props.resultsMounted) ? (this.state.searched) ? 
                    <Text style={{color: "white"}} >Loading...</Text> : 
                    <Text> </Text> : 
                    <Result 
                    state={this.props.state} 
                    onDataChanged={this.props.onDataChanged} 
                    flights={this.props.flights} 
                    changeFlights={this.props.changeFlights} 
                    changeSortedFlights={this.props.changeSortedFlights} 
                    tripType={this.props.tripType} 
                    compareBy={this.props.compareBy} 
                    orderBy={this.props.orderBy}
                    passengers={this.props.state.passengers} />
                }
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        paddingTop: 60,
        alignItems: 'center'
    },
    inputContainer: {
        // flex: 1,
        flexDirection: "row",
        justifyContent: "space-evenly"
    },
    buttonContainer: {
        // flex: 1,
        flexDirection: "row",
        justifyContent: "space-evenly"
    },
    dateContainer: {
        // flex: 1,
        flexDirection: "row",
        justifyContent: "space-evenly"
    },
    input: {
        textAlign: 'center',
        color: 'white',
        borderColor: '#2196F3',
        borderWidth: 2,
        height: 40,
        width: 120
    },
    button: {
        marginTop: 10,
        marginBottom: 30,
        width: 160,
        height: 30,
        alignItems: 'center',
        backgroundColor: '#2196F3',
        shadowOffset: { 
            width: 10, 
            height: 10, 
        },
        shadowColor: 'black',
        shadowOpacity: 1.0,
    },
    buttonText: {
        color: 'white',
        fontWeight: "bold"
    }
});