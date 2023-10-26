// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const mailgun = require('mailgun-js');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT= 7200;

// Mailgun configuration
const api_key = 'bd334b01309b4b6337df5378854a9f19-3750a53b-05b620d2';
const domain = 'sandbox48a8e453581f4854a2a562c482764ac2.mailgun.org';

const mailgunClient = mailgun({ apiKey: api_key, domain: domain });

app.use(cors()); 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.post('/subscribe', (req, res) => {
  const { Email } = req.body;

  const mailgunData = {
    from: 'Aditya <adityabharti528@gmail.com>',
    to: Email,
    subject: "Welcome to maler",
    text: "welcom to our brand new softare you will be reciving regular emails regarding our latest launches."
  };

  mailgunClient.messages().send(mailgunData, (error, body) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred' });
    } else {
      console.log(body);
      res.json({ message: 'Email sent successfully' });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});



