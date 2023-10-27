// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const mailgun = require('mailgun-js');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 7200;

// Mailgun configuration
const api_key = '8dad48b049fa288332c9cc2dce29764a-324e0bb2-10fb2bc7';
const domain = 'sandbox6f11405607d84a57ab1da977083995d8.mailgun.org';

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

  // Check if Email is missing or empty
  if (!Email || Email.trim() === '') {
    return res.status(400).json({ error: 'Email is required' });
  }

  const mailgunData = {
    from: 'Aditya <adityabharti528@gmail.com>',
    to: Email,
    subject: "Welcome to maler",
    text: "Welcome to our brand new software. You will be receiving regular emails regarding our latest launches."
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
  console.log(`Server is running at port ${PORT}`);
});
