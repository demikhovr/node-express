const express = require('express');
const exphbs = require('express-handlebars');

const homeRoutes = require('./routes/home');
const appsRoutes = require('./routes/apps');
const addRoutes = require('./routes/add');

const app = express();
const PORT = process.env.PORT || 3000;
const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: 'hbs',
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'views');

app.use(express.static('public'));

app.use('/', homeRoutes);
app.use('/apps', appsRoutes);
app.use('/add', addRoutes);

app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
