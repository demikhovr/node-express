const { Router } = require('express');
const App = require('../models/app');

const router = Router();

router.post('/add', async (req, res) => {
  const app = await App.findById(req.body.id);
  await req.user.addToCart(app);
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

router.delete('/remove/:id', async (req, res) => {
 const cart = await Cart.remove(req.params.id);
  res.status(200).json(cart);
});

module.exports = router;
