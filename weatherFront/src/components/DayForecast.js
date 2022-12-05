import React from 'react';

const DayForecast = (props)=>{
   console.log(props)
return(
    <>
        <h3>{props.dayName}</h3>
        <div className="imgForecastHour">
            <img src={props.dayNumber.day.condition.icon} alt="condtion météo"/>
        </div>
        <h4>Max {Math.round(props.dayNumber.day.maxtemp_c)}°C</h4>
        <h4>Min {Math.round(props.dayNumber.day.mintemp_c)}°C</h4>
        <h4>vent: {Math.round(props.dayNumber.day.maxwind_kph)}km/h</h4>
    </>
   
)

}

export default DayForecast;
