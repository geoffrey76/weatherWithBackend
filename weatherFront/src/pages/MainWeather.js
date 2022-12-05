import { useEffect, useState } from "react";
import React from 'react';
import { Link } from "react-router-dom";
import imageCiel from "../images/pexels-vladyslav-dushenkovsky-4100130.jpg";
import "../css/worldWeather.css";
import DayForecast from "../components/DayForecast";
import HoursForecast from "../components/HoursForecast";

const MainWeather = ()=>{
    
    var [city, setCity] = useState("namur");
    var [wxData, setWxData] = useState(null);
    var [day, setDay] = useState (0);
    var [newRequest, setNewRequest] = useState (1);
    // const hours = [0, 3, 6, 9, 12, 15, 18, 21];
// ---------------------- change  day forecast style ---------------
    const [day0IsActive, setDay0IsActive] = useState(true);
    const [day1IsActive, setDay1IsActive] = useState(false);
    const [day2IsActive, setDay2IsActive] = useState(false);
// ----------------------  
    useEffect(()=>{
       
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': process.env.REACT_APP_API_KEY,
                'X-RapidAPI-Host': process.env.REACT_APP_API_HOST
            }
        };
      
        fetch(`https://weatherapi-com.p.rapidapi.com/forecast.json?q=${city}&days=3&lang=fr`, options)
            .then(function(response){
                if(response.status === 400) {
                    alert(`ville inconnue (erreur ${response.status})`);
                    window.location.reload();
                }else{
                    response.json()
                    .then(setWxData)
                    .then(console.log(wxData))
                }
            })
            .catch(function(error) {
                alert (`Il y a eu un problème: ${error.message}`);
                console.error('Il y a eu un problème avec l\'opération fetch: ' + error.message);
                window.location.reload();
                
            })
            
    },[newRequest]);

    function pushEnter(e){
        if (e.keyCode === 13){
            setNewRequest(-newRequest);
            // document.getElementById("cityEnter").value=""
        }
    }
    function clickDay0(){
        setDay0IsActive(true)
        setDay1IsActive(false);
        setDay2IsActive(false); 
        setDay(0);
    }
    function clickDay1(){
        setDay0IsActive(false);
        setDay1IsActive(true);
        setDay2IsActive(false);
        setDay(1);
    }
    function clickDay2(){
        setDay0IsActive(false);
        setDay1IsActive(false);
        setDay2IsActive(true);
        setDay(2);
    }
    
    if(wxData){
        
        return(
            <>
            
            {/* <pre>{JSON.stringify(wxData.location, null, 2)}</pre> */}
            <div id="imgContainer">
                <form id="cityInput">
                    <label>Entrez votre ville &nbsp;</label><input id="cityEnter" type="text" onChange={e => setCity(e.target.value)} onKeyDown={pushEnter}></input><input id="searchButton" type="button" onClick={() => {setNewRequest(-newRequest); document.getElementById("cityEnter").value=""}} value='Chercher'/>
                </form>
                <Link to="/contact"><button id="gotoContact">Contact</button></Link>
                
                <img className="backGroundImage" src={imageCiel} alt="ciel" width= "100%"/>
                <div id="title">
                    <h1>Meteo {wxData.location.name} ({wxData.location.country})</h1> 
                    <img id="imgCondition" src={wxData.current.condition.icon} alt="contition météo aujourd'hui"/>
                    <h2> {wxData.current.condition.text}</h2>
                </div>
                
                <main id="mainWorldWx">   
                    <aside>
                        
                        <h2>T°: {Math.round(wxData.current.temp_c)}°C</h2>
                        <h2>T° ressentie: {Math.round(wxData.current.feelslike_c)}°C</h2>
                        <h2>Vent: {wxData.current.wind_dir}   {Math.round(wxData.current.wind_kph)}km/h</h2>
                        <h2>Visibilité: {wxData.current.vis_km}km</h2>
                        <h2>Humidité: {wxData.current.humidity}%</h2>
                        <h2>UV: {wxData.current.uv}</h2>
                    </aside>
                    <div id="forecast">
                        <div className={day0IsActive ? "forecastDayVisible" : "forecastDayInvisible"} id="forecastDay0" onClick={clickDay0}>                              
                           <DayForecast dayNumber={wxData.forecast.forecastday[0]} dayName="aujourd'hui" />
                        </div>
                        <div  className={day1IsActive ? "forecastDayVisible" : "forecastDayInvisible"} id="forecastDay1" onClick={clickDay1}>
                            <DayForecast dayNumber={wxData.forecast.forecastday[1]} dayName="demain"/>
                        </div>
                        <div className={day2IsActive ? "forecastDayVisible" : "forecastDayInvisible"} id="forecastDay2" onClick={clickDay2}>
                            <DayForecast dayNumber={wxData.forecast.forecastday[2]} dayName="après-demain" />
                        </div>
                    </div>
                </main>  
                <div id="hourForecast" className="forecast">
                    <HoursForecast forecast={wxData.forecast} dayNum={day} /> 
                </div> 
                <div id="dataSource"><a href="https://rapidapi.com">data from RapidAPI</a></div>
                <div id="imgSource"><a href="https://www.pexels.com/fr-fr/">image from renders.com</a></div>
            </div>
            
            </>
            
        )
  
    }
          
}
    
export default MainWeather;
