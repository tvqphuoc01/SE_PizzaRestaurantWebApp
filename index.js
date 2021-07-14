const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');

const port = 3000;
const bodyParser = require('body-parser');

const authMiddleware = require('./middleware/authMiddleware');

// Routes
const clientRoutes = require('./routers/clientRouter');
const clientLoginRoutes = require('./routers/authClientRouter');
const profileRoutes = require('./routers/profileRouter');
const aboutUsRoutes = require('./routers/aboutUs.router');
const serviceRoutes = require('./routers/service.router');
const contactRoutes = require('./routers/contact.router');
const reservationRoutes = require('./routers/reservation.router');
const blogRoutes = require('./routers/blog.router');
const indexRoutes = require('./routers/index.router');
const shopRoutes = require('./routers/shop.router');
const FAQRoutes = require('./routers/FAQ.routes');

// Views
app.set('views', './views');
app.set('view engine', 'pug');

app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static('public/js'));
app.use(express.static('public/images'));
app.use(express.static('public'));
app.use(express.static('public/style'));
app.use(bodyParser.urlencoded({extended: true}));

app.use('/', indexRoutes);

app.use('/service', serviceRoutes);

app.use('/aboutUs', aboutUsRoutes);

app.use('/logIn', clientLoginRoutes);

app.get('/menu', (req, res) => {
  res.render('menu');
});

app.use('/signUp', clientRoutes);

app.use('/reservation', reservationRoutes);

app.use('/profilePage', authMiddleware.authMiddleware, profileRoutes);

app.use('/blog', blogRoutes);

app.get('/Blog1', (req, res) => {
  res.render('Blog1');
});

app.use('/contact', contactRoutes);

app.get('/Blog2', (req, res) => {
  res.render('Blog2');
});

app.get('/Blog3', (req, res) => {
  res.render('Blog3');
});

app.use('/Shop', shopRoutes);

app.use('/FAQs', FAQRoutes);

app.get('/logOut', (req, res) => {
  res.clearCookie('userId');
  res.render('index');
});

app.get('/ShoppingCart', (req, res) => {
  res.render('ShoppingCart');
});

app.get('/StaffReservation', (req, res) => {
  res.render('StaffReservation');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
