/* eslint-disable eqeqeq */
/* eslint-disable radix */
import React, { Component } from 'react';
import { Alert, Dimensions, FlatList, Image, Modal, PermissionsAndroid, Platform, SafeAreaView, StatusBar, Text, View } from 'react-native';
import { create } from 'apisauce'
import Geolocation from '@react-native-community/geolocation';
import { setWeatherToday, setWeatherFor5Days } from '../actions/commonActions'
import { connect } from 'react-redux';

class HomeScreen extends Component {
    state = {
        count: 0,
        products: [],
        data: [],
        weatherDetail: [],
        day: [],
        latitute: 0,
        longitude: 0,
        loading: true
    };

    findCoordinates = () => {
        navigator.geolocation.getCurrentPosition(
            position => {
                const location = JSON.stringify(position);
                console.log("20", location)
                this.setState({ location });
            },
            error => Alert.alert(error.message),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        );
    };

    async componentDidMount() {

        console.log("Location", this.props)
        let lat, lon
        Geolocation.getCurrentPosition(data => {
            console.log(data)
            lat = data.coords.latitude
            lon = data.coords.longitude
            this.getWeather(lat, lon)
            this.setState({ latitute: parseInt(data.coords.latitude), longitude: parseInt(data.coords.longitude) })
        })







    }

    getWeather = async (lat, lon) => {
        const apiKey = 'e8b4b4c43bb9bd30dedca8d9bf48c96b';
        const api = create({
            baseURL: 'https://api.github.com',
            headers: { Accept: 'application/vnd.github.v3+json' },
        })
        await api.get(
            `http://api.openweathermap.org/data/2.5/forecast?lat=${parseInt(lat)}&lon=${parseInt(lon)}&appid=${apiKey}`,
        )
            .then((res) => {
                console.log('20', res), this.setState({ data: res.data.list });
            })
            .catch((err) => {
                console.log(err);
            })
            .then(() => {
                // this.getWeather();
            })
            ;
        const { data } = this.state;

        let weatherDetail = [];
        let day = [];
        data.map((item) => {
            let dateObj = new Date(item.dt * 1000);
            let utcString = dateObj.toUTCString();
            let time = utcString.slice(-12, -4);
            if (time == '21:00:00') {
                let temp = parseInt(item.main.temp_max - 273);
                console.log('time', time, temp, item, dateObj.getDay());
                weatherDetail.push(temp);
                day.push(dateObj.getDay());
            }
        });
        this.props.setWeatherToday(weatherDetail[0])
        this.props.setWeatherFor5Days(weatherDetail)
        let lastdateObj = new Date(data[data.length - 1].dt * 1000);
        weatherDetail.push(parseInt(data[data.length - 1].main.temp_max - 273));
        day.push(lastdateObj.getDay() + 1 == 7 ? 0 : lastdateObj.getDay() + 1);
        console.log('34', data, weatherDetail);
        this.setState({ weatherDetail, day, loading: false });
    };

    getDay(index) {
        if (index == 0) {
            return 'Sunday';
        } else if (index == 1) {
            return 'Monday';
        } else if (index == 2) {
            return 'Tuesday';
        } else if (index == 3) {
            return 'Wednesday';
        } else if (index == 4) {
            return 'Thursday';
        } else if (index == 5) {
            return 'Friday';
        } else if (index == 6) {
            return 'Saturday';
        }
    }

    renderItem = (item, index) => {
        if (index > 0) {
            return (
                <View
                    style={{
                        flexDirection: 'row',
                        padding: 10,
                        borderWidth: 1,
                        marginHorizontal: 5,
                    }}>
                    <Text
                        style={{
                            fontSize: 18,
                            fontWeight: '700',
                            flex: 0.5,
                            textAlign: 'center',
                        }}>
                        {this.getDay(this.state.day[index])}
                    </Text>
                    <Text
                        style={{
                            fontSize: 18,
                            fontWeight: '700',
                            flex: 0.5,
                            textAlign: 'center',
                        }}>
                        {item}
                    </Text>
                </View>
            );
        }
    };


    render() {
        const { weatherDetail } = this.state;
        return (

            <SafeAreaView style={{ justifyContent: 'center', backgroundColor: '#fff', }}>

                { this.state.loading ?
                    <View style={{
                        justifyContent: 'center', backgroundColor: '#fff',
                        alignItems: 'center', height: Dimensions.get('window').height
                    }}>
                        <Image source={require('../assets/images/226-splashy-loader.gif')} style={{ height: 200, width: 200 }} />

                    </View> :
                    <View style={{ flex: 1 }}>
                        <View style={{ height: Dimensions.get('window').height / 2, justifyContent: 'center' }}>

                            <Text style={{ fontSize: 30, textAlign: 'center', marginTop: 10, textAlignVertical: 'center' }}>
                                Delhi
                            </Text>
                            <Text style={{ fontSize: 30, textAlign: 'center', fontWeight: 'bold' }}>
                                {this.props.weatherToday}
                            </Text>
                        </View>
                        <View style={{ height: Dimensions.get('window').height / 2, justifyContent: 'center' }}>
                            <FlatList
                                extraData={this.props}
                                data={this.props.weatherFor5Days}
                                renderItem={({ item, index }) => this.renderItem(item, index)}
                                keyExtractor={(item, index) => 'key' + index}
                            />
                        </View>
                    </View>
                }
            </SafeAreaView>
        );
    }
}


const mapStateToProps = state => {
    let props = {};
    props.weatherToday = state.common.weatherToday;
    props.weatherFor5Days = state.common.weatherFor5Days
    return props;
};

const mapDispatchToProps = (dispatch, props) => ({
    setWeatherToday: function (weatherToday) {
        dispatch(setWeatherToday(weatherToday))
    },
    setWeatherFor5Days: function (weatherFor5Days) {
        dispatch(setWeatherFor5Days(weatherFor5Days))
    },
})


export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);

// export default connect(mapStateToprops, mapDispatchtoProps)(HomeScreen)
