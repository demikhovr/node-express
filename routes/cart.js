const { Router } = require('express');
const App = require('../models/app');

const mapCartItems = cart => cart.items.map(it => ({
  ...it.appId._doc,
  id: it.appId.id,
  count: it.count,
}));

const computePrice = apps => apps.reduce((accum, curr) => curr.price * curr.count + accum, 0);

const router = Router();

router.post('/add', async (req, res) => {
  const app = await App.findById(req.body.id);
  await req.user.addToCart(app);
  res.redirect('/cart');
});

router.get('/', async (req, res) => {
  const user = await req.user
    .populate('cart.items.appId')
    .execPopulate();

  const apps = mapCartItems(user.cart);
  const price = computePrice(apps);

  res.render('cart', {
    title: 'Cart',
    isCart: true,
    apps,
    price,
  });
});

router.delete('/remove/:id', async (req, res) => {
  await req.user.removeFromCart(req.params.id);
  const user = await req.user
    .populate('cart.items.appId')
    .execPopulate();
  const apps = mapCartItems(user.cart);
  const price = computePrice(apps);
  const cart = { apps, price };
  res.status(200).json(cart);
});

module.exports = router;
