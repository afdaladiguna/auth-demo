const express = require('express');
const app = express();
const User = require('./models/user');

app.set('view engine', 'ejs');
app.set('views', 'views');

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/register', (req, res) => {
  res.render('register');
});

app.get('/secret', (req, res) => {
  res.send('this is secret you cannot see');
});

app.listen(3000, () => {
  console.log(`Example app listening on port 3000`);
});
