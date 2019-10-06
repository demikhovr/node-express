const { Router } = require('express');
const Order = require('../models/order');

const router = Router();

router.get('/', async (req, res) => {
  try {
    const orders = await Order.find({ 'user.userId': req.user._id })
      .populate('user.userId');

    res.render('orders', {
      title: 'Orders',
      isOrder: true,
      orders: orders.map(it => ({
        ...it._doc,
        price: it.apps.reduce((accum, curr) => accum + curr.count * curr.app.price, 0),
      })),
    })
  } catch (err) {
    console.log(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const user = await req.user
      .populate('cart.items.appId')
      .execPopulate();

    const apps = user.cart.items.map(it => ({
      count: it.count,
      app: { ...it.appId._doc },
    }));

    const order = new Order({
      user: {
        name: req.user.name,
        userId: req.user,
      },
      apps,
    });

    await order.save();
    await req.user.clearCart();

    res.redirect('/orders');
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
