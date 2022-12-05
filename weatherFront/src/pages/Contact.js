import React from 'react';
import { useState } from "react";
import axios from "axios";
import imageCiel from "../images/pexels-vladyslav-dushenkovsky-4100130.jpg";
import "../css/contact.css";


const Contact = ()=>{
    const [fName, setfName] = useState ("");
    const [lName, setlName] = useState ("");
    const [email, setEmail] = useState ("");
    const [comments, setComments] = useState ("");
    const mailResponse = "";
    
    const formSubmit = ()=>{
        const sendMail = ({firstName: fName, 
                        lastName: lName, 
                        email: email, 
                        comments: comments})
        axios.post ("/api/mailForm", sendMail)
        .then(function (response) {
            console.log(response);
            if (response.data=="Erreur lors de l'envoi du message"){
                console.log(response);
                document.getElementById("mailResponse").style.color = "red"
            };
            document.getElementById("mailResponse").innerHTML = response.data})
        .then(()=>{setfName("");
        setlName("");
        setEmail("");
        setComments("")})
       
    }
    return(
        <>
            <div id="imgContainer">
                <img className="backGroundImage" src={imageCiel} alt="ciel" width= "100%"/>
                <div id="contactArea">
                    <div id="personalInfo">
                        <label className='contactInput'>Prénom</label>
                        <input type="text" value={fName} onChange={e => setfName(e.target.value)} id="fName" autoFocus></input>
                        <label className='contactInput'>Nom</label>
                        <input type="text" value={lName} onChange={e => setlName(e.target.value)} id="lName"></input>
                        <label className='contactInput'>e-mail</label>
                        <input type="email" value={email} onChange={e => setEmail(e.target.value)} id="eMail" required></input>
                    </div>
                    <div id='comments'>
                        <label className='contactInput'>Commentaires</label>
                        <textarea value={comments} onChange={e => setComments(e.target.value)} required></textarea>
                    </div>
                </div>
                <button id="sendContactButton" onClick={formSubmit}>Envoyer</button>
                <h1 id='mailResponse'></h1>
            </div>
           
        </>
    )
    
    
}

export default Contact;
