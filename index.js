const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');

const port = 3000;
const bodyParser = require('body-parser');

const authMiddleware = require('./middleware/authMiddleware');

const clientRoutes = require('./routers/clientRouter');
const clientLoginRoutes = require('./routers/authClientRouter');
const profileRoutes = require('./routers/profileRouter');
const aboutUsRoutes = require('./routers/aboutUs.router');
const serviceRoutes = require('./routers/service.router');
const contactRoutes = require('./routers/contact.router');

app.set('views', './views');
app.set('view engine', 'pug');

app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static('public/images'));
app.use(express.static('public/style'));
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
  res.render('index');
});

app.use('/service', serviceRoutes);

app.use('/aboutUs', aboutUsRoutes);

app.use('/logIn', clientLoginRoutes);

app.get('/menu', (req, res) => {
  res.render('menu');
});

app.use('/signUp', clientRoutes);

app.get('/reservation', (req, res) => {
  res.render('reservation');
});

app.use('/profilePage', authMiddleware.authMiddleware, profileRoutes);

app.get('/Blog', (req, res) => {
  res.render('Blog');
});

app.get('/Blog1', (req, res) => {
  res.render('Blog1');
});

app.use('/contact', contactRoutes);

app.get('/Blog2', (req, res) => {
  res.render('Blog2');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
