const { Router } = require('express');
const App = require('../models/app');
const Cart = require('../models/cart');

const router = Router();

router.post('/add', async (req, res) => {
  const app = await App.getById(req.body.id);
  await Cart.add(app);
  res.redirect('/cart');
});

router.get('/', async (req, res) => {
  const cart = await Cart.fetch();
  res.render('cart', {
    title: 'Cart',
    isCart: true,
    apps: cart.apps,
    price: cart.price,
  });
});

module.exports = router;
