import express from 'express';
import { MongoClient, ObjectId, ServerApiVersion } from 'mongodb';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

const app = express();
const port = 8800;
app.use (express.json());

dotenv.config();

// app.get('/', (req, res) => {
//     res.send('Hello World!')
//   })


app.listen(port, () => {
  console.log(`server listening on port ${port}`)
})

//---------------------------- Send mail contact ------------------------
app.post('/api/mailForm', async (req, res) => {
  
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const comments = req.body.comments;
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.USER_MAIL,
      pass: process.env.GOOGLE_PASS
    }
  });
  
  var mailOptions = {
    from: process.env.USER_MAIL,
    to: process.env.USER_MAIL,
    subject: 'Mail form from weather site',
    text:`Prénom: ${firstName}
        Nom: ${lastName}
        email: ${email}
        comments: ${comments}`
  };
  console.log(mailOptions)
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
      res.send("Erreur lors de l'envoi du message");
    } else {
      console.log('Email sent: ' + info.response);
      res.send("Message bien envoyé. Merci.");
    }
    
  });
  
})


