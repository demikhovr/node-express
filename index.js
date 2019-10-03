const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');

const homeRoutes = require('./routes/home');
const appsRoutes = require('./routes/apps');
const addRoutes = require('./routes/add');
const cartRoutes = require('./routes/cart');

const app = express();
const PORT = process.env.PORT || 3000;
const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: 'hbs',
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'views');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use('/', homeRoutes);
app.use('/apps', appsRoutes);
app.use('/add', addRoutes);
app.use('/cart', cartRoutes);

const start = async () => {
  try {
    const url = 'mongodb+srv://demikhovr:KV91ugQZ0KRL04y9@cluster0-f7kyf.mongodb.net/shop';
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
  } catch (err) {
    console.log(err);
  }
};

start();
