import { SET_TODAY_WEATHER, SET_WEATHER_FOR_5_DAYS } from "../types"



export const setWeatherToday = (weatherToday) => {
  console.log("weatherToday 11",weatherToday)
  return {
    type: SET_TODAY_WEATHER,
    weatherToday,
  }
}

export const setWeatherFor5Days = (weatherFor5Days) => {
  console.log("weatherToday 11",weatherFor5Days)
  return {
    type: SET_WEATHER_FOR_5_DAYS,
    weatherFor5Days,
  }
}


