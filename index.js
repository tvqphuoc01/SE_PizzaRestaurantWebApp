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
const staffLogin = require('./routers/staffLogin.router')
const staffReservationRoutes = require('./routers/staffReservation.router')
const cartRoutes = require('./routers/cart.router');
const orderRoutes = require('./routers/order.router');
const doneOrderRoutes = require('./routers/doneOrder.router');
const staffCheckOrderRoutes = require('./routers/staffCheckOrder.router')
const updateStateOfOrderRoutes = require('./routers/updateStateOfOrder.router')
const orderStatusRoutes = require('./routers/orderStatus.router')
const staffCheckDoneOrderRoutes = require('./routers/staffCheckDoneOrder.router')
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

app.use('/placeOrder', orderRoutes);

app.use('/orderStatus', orderStatusRoutes);

app.use('/updateStateOfOrder', updateStateOfOrderRoutes);

app.use('/done', doneOrderRoutes);

app.use('/Shop', shopRoutes);

app.use('/FAQs', FAQRoutes);

app.get('/logOut', (req, res) => {
  res.clearCookie('userId');
  res.render('index');
});

app.use('/staffLogin', staffLogin)

app.use('/StaffCheckOrder', authMiddleware.authMiddleware, staffCheckOrderRoutes);

app.use('/StaffCheckDoneOrder', authMiddleware.authMiddleware, staffCheckDoneOrderRoutes);

app.use('/ShoppingCart', authMiddleware.authMiddleware, cartRoutes);

app.use('/StaffReservation', authMiddleware.authMiddleware, staffReservationRoutes)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
