const express = require('express');
const exphbs = require('express-handlebars');

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

app.get('/', (req, res) => res.render('index', {
  title: 'Main page',
  isHome: true,
}));

app.get('/apps', (req, res) => res.render('apps', {
  title: 'Apps',
  isApps: true,
}));

app.get('/add', (req, res) => res.render('add', {
  title: 'Add app',
  isAdd: true,
}));

app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
