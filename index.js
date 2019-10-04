const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');

const homeRoutes = require('./routes/home');
const appsRoutes = require('./routes/apps');
const addRoutes = require('./routes/add');
const cartRoutes = require('./routes/cart');

const User = require('./models/user');

const app = express();
const PORT = process.env.PORT || 3000;
const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: 'hbs',
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'views');

app.use(async (req, res, next) => {
  try {
    const user = await User.findById('5d97a2cf951a7d7b97518cfb');
    req.user = user;
    next();
  } catch (err) {
    console.log(err);
  }
});

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
    const candidate = await User.findOne();

    if (!candidate) {
      const user = new User({
        email: 'demikhovr@gmail.com',
        name: 'Rodion',
        cart: { items: [] },
      });
      await user.save();
    }

    app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
  } catch (err) {
    console.log(err);
  }
};

start();
