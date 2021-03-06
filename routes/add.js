const { Router } = require('express');
const App = require('../models/app');

const router = Router();
router.get('/', (req, res) => res.render('add', {
  title: 'Add',
  isAdd: true,
}));

router.post('/', async (req, res) => {
  const { title, price, img } = req.body;
  const app = new App({
    title,
    price,
    img,
    userId: req.user,
  });

  try {
    await app.save();
    res.redirect('/apps');
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
