const { Router } = require('express');
const App = require('../models/app');

const router = Router();
router.get('/', async (req, res) => {
  const apps = await App.getAll();

  res.render('apps', {
    title: 'Apps',
    isApps: true,
    apps,
  });
});

module.exports = router;
