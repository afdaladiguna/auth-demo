const express = require('express');
const app = express();
const User = require('./models/user');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const session = require('express-session');

mongoose
  .connect('mongodb://localhost:27017/authDemo2')
  .then(() => {
    console.log('connection OK');
  })
  .catch(() => {
    console.log('mongo connection error');
  });

app.set('view engine', 'ejs');
app.set('views', 'views');

// parsing request body
app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: 'kiwkiw' }));

const requireLogin = (req, res, next) => {
  if (!req.session.user_id) {
    return res.redirect('/login');
  } else {
    next();
  }
};

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/register', (req, res) => {
  res.render('register');
});

app.post('/register', async (req, res) => {
  const { password, username } = req.body;
  const user = new User({ username, password });
  await user.save();
  req.session.user_id = user._id;
  res.redirect('/');
});

app.get('/login', (req, res) => {
  res.render('login');
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const foundUser = await User.findAndValidate(username, password);
  if (foundUser) {
    req.session.user_id = foundUser._id;
    res.redirect('/secret');
  } else {
    res.redirect('/login');
  }
});

app.post('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/login');
});

app.get('/secret', requireLogin, (req, res) => {
  res.render('secret');
});

app.get('/chicken', requireLogin, (req, res) => {
  res.send('chicken is secured');
});

app.listen(3000, () => {
  console.log(`Example app listening on port 3000`);
});
