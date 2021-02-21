import { SET_TODAY_WEATHER, SET_WEATHER_FOR_5_DAYS } from "../types"


const initialState = { weatherToday: 0, weatherfor5Days: [] }

const reducers = (state = initialState, action) => {
    console.log("weatherToday reduce", action)
    switch (action.type) {
        case SET_TODAY_WEATHER:
            return {
                ...state,
                weatherToday: action.weatherToday
            }
        case SET_WEATHER_FOR_5_DAYS:
            return {
                ...state,
                weatherfor5Days: action.weatherfor5Days
            }
        default:
            return state;

    }
};




export default reducers 