import React, { Component } from 'react';
import { AppRegistry, Text, TextInput, StyleSheet, View, TouchableHighlight } from 'react-native';
import DatePicker from 'react-native-datepicker'
import dataFacade from '../dataFacade'
import Result from './Result';


export default class SearchParameter extends Component {
    constructor(props) {
        super(props);
        this.state = { tripType: "returntrip", searched: false, 
    };
    }

    setTripType = (e) => {
        if (e.target.id === "oneway") {
            this.props.removeReturnDate();
        }
        this.setState({ tripType: e.target.id })
    }

    fetchFlights = async (e) => {
        e.preventDefault();
        this.setState({searched: true })
        this.props.setResultsMounted(true);
        const { departure, destination, date1, date2, date } = this.props.state;
        if (this.props.state.tripType === "returntrip") {
            const flights = await dataFacade.getReturnRoutes(departure, destination, date1, date2)
            this.setState({ searched: false });
            this.props.setResultsMounted(false);
            this.props.setFlights(flights);
            console.log("fetchFlights " + this.props.resultsMounted);
        }
        else {
            const flights = await dataFacade.getOneWayRoutes(departure, destination, date)
            this.setState({ searched: false })
            this.props.setResultsMounted(false);
            this.props.setFlights(flights);
            console.log("fetchFlights " + this.props.resultsMounted);
        }
        this.props.changeHideButton();

    }


    returnTrip() {
        return (
            <>
                <TextInput type="text" name="departure" placeholder="Departure" autoCapitalize="characters" onChangeText={(e) => this.props.onDataChanged("departure", e)} />
                <TextInput type="text" name="destinati" placeholder="Destination" autoCapitalize="characters" onChangeText={(e) => this.props.onDataChanged("destination", e)} />
                <DatePicker style={{ width: 200 }}
                    date={this.props.state.date1}
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
                            marginLeft: 0
                        },
                        dateInput: {
                            marginLeft: 36
                        }
                    }}
                    onDateChange={(e) => this.props.onDataChanged("date1", e)}
                />
                <DatePicker style={{ width: 200 }}
                    date={this.props.state.date2}
                    mode="date"
                    placeholder="Return date"
                    format="YYYY-MM-DD"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    customStyles={{
                        dateIcon: {
                            position: 'absolute',
                            left: 0,
                            top: 4,
                            marginLeft: 0
                        },
                        dateInput: {
                            marginLeft: 36
                        }
                    }}
                    onDateChange={(e) => this.props.onDataChanged("date2", e)}
                />
                <TextInput type="text" name="passengers" />
                <TouchableHighlight style={styles.button} id="returnSubmitButton" onPress={this.fetchFlights} underlayColor="white">
                    <View>
                        <Text>Search for flight</Text>
                    </View>
                </TouchableHighlight>
                {/* <Text>{JSON.stringify(this.props.state)}</Text> */}
            </>
        );
    }

    oneWayTrip() {
        return (
            <>
                <TextInput type="text" name="departure" placeholder="Departure" autoCapitalize="characters" onChangeText={(e) => this.props.onDataChanged("departure", e)} />
                <TextInput type="text" name="destination" placeholder="Destination" autoCapitalize="characters" onChangeText={(e) => this.props.onDataChanged("destination", e)} />
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
                            marginLeft: 0
                        },
                        dateInput: {
                            marginLeft: 36
                        }
                    }}
                    onDateChange={(e) => this.props.onDataChanged("date", e)}
                />
                <TextInput type="text" name="passengers" />
                <TouchableHighlight style={styles.button} id="oneWaySubmitButton" onPress={this.fetchFlights} underlayColor="white">
                    <View>
                        <Text>Search for flight</Text>
                    </View>
                </TouchableHighlight>

                {/* <Text>{JSON.stringify(this.props.state)}</Text> */}
            </>
        );
    }

    render = () => {
        return (
            <View>
                <TouchableHighlight style={styles.button} id="oneway" onPress={() => this.props.setTripType("oneway")} underlayColor="white">
                    <View>
                        <Text>One way</Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight style={styles.button} id="returntrip" onPress={() => this.props.setTripType("returntrip")} underlayColor="white">
                    <View>
                        <Text>Return trip</Text>
                    </View>
                </TouchableHighlight>
                {
                    (this.props.state.tripType === "returntrip") ? this.returnTrip() : this.oneWayTrip()
                }
                {
                    (this.props.resultsMounted) ? (this.state.searched) ? <Text>Loading...</Text> : <Text> </Text> : <Result state={this.props.state} onDataChanged={this.props.onDataChanged} flights={this.props.flights} changeFlights={this.props.changeFlights} changeSortedFlights={this.props.changeSortedFlights} tripType={this.state.tripType} compareBy={this.props.compareBy}/>
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
    button: {
        marginBottom: 30,
        width: 260,
        alignItems: 'center',
        backgroundColor: '#2196F3'
    },
    buttonText: {
        padding: 20,
        color: 'white'
    }
});