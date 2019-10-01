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

router.get('/:id', async (req, res) => {
  const app = await App.getById(req.params.id);
  res.render('app', {
    layout: 'empty',
    title: `App ${app.title}`,
    app,
  });
});

module.exports = router;
