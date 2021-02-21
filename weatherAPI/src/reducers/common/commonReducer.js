import { SET_TODAY_WEATHER, SET_WEATHER_FOR_5_DAYS } from "../../types"

const initialState = {  weatherToday: 90, weatherFor5Days: [] }

const common = (state = initialState, action) => {

    switch (action.type) {
        case SET_TODAY_WEATHER:
            return {
                ...state,
                weatherToday: action.weatherToday
            }
        case SET_WEATHER_FOR_5_DAYS:
            return{
                ...state,
                weatherFor5Days: action.weatherFor5Days
            }
        default:
            return state;
    }
}


export default common;


