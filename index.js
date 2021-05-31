const express = require('express')
const app = express()
const port = 3000

app.set('views', './views');
app.set('view engine', 'pug');

app.use(express.static('public/images'));
app.use(express.static('public/style'));

app.get('/', (req, res) => {
  res.render('index');
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
