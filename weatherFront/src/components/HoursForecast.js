import React from 'react';

const HoursForecast = (props)=>{
    const hours = [0, 3, 6, 9, 12, 15, 18, 21];
return(
    <>
        {hours.map(hour => (
        <div key={hour} className="hourForecast">
            <h3>{hour}:{0}{0}</h3>
            <div className="imgForecastHour">
                <img src={props.forecast.forecastday[props.dayNum].hour[hour].condition.icon} alt="condition météo heures/heures"/>
            </div>
            <h4>{props.forecast.forecastday[props.dayNum].hour[hour].condition.text}</h4>
            <h4>{Math.round(props.forecast.forecastday[props.dayNum].hour[hour].temp_c)}°C</h4>
            <h4>vent: {Math.round(props.forecast.forecastday[props.dayNum].hour[hour].wind_kph)}km/h</h4>
        </div>   
        ))}
    
    </>
       
   
)

}

export default HoursForecast;