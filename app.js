const express = require('express')
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const app = express()
const port = 3000
const cors = require('cors')
app.use(cors({ origin: true}));
//node app.js

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

let db = new sqlite3.Database('./database.db', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the database.');
  
});

app.get('/', (req, res) => {
  res.sendFile('public/index.html' , { root : __dirname});
})

app.post('/send', (req, res) => {
  db.serialize(() => {
    db.run('INSERT INTO chat(message, user, hours, minutes) VALUES(?, ?, ?, ?)', [`${req.body["message"]}`, `${req.body["username"]}`, `${req.body["hours"]}`, `${req.body["minutes"]}`]); 
  });
  res.send('200')
})

app.get('/text', (req, res) => {
  messages = []
  db.serialize(() => {
    db.all(`SELECT * FROM chat`, (err, row) => {
      if (err) {
        console.error(err.message);
      }
      row.forEach((row) => {
        list=[]
        list.push(row.message)
        list.push(row.user)
        list.push(row.hours)
        list.push(row.minutes)
        messages.push(list)
        list=[]
      });
      res.send(messages)
    });
    
  });
  
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})