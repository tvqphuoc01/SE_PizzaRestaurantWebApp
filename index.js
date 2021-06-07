const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const clientRoutes = require('./routers/clientRouter');

app.set('views', './views');
app.set('view engine', 'pug');

app.use(bodyParser.json());
app.use(express.static('public/images'));
app.use(express.static('public/style'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/service', (req, res) => {
  res.render('service');
});

app.get('/aboutUs', (req, res) => {
  res.render('aboutUs');
});

app.get('/logIn', (req, res) => {
  res.render('logIn');
});

app.get('/menu', (req, res) => {
  res.render('menu');
});

app.use('/signUp', clientRoutes);

app.get('/reservation', (req, res) => {
  res.render('reservation');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
