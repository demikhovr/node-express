const { Router } = require('express');
const App = require('../models/app');

const router = Router();
router.get('/', async (req, res) => {
  const apps = await App.find();
  res.render('apps', {
    title: 'Apps',
    isApps: true,
    apps,
  });
});

router.get('/:id/edit', async (req, res) => {
  if (!req.query.allow) {
    return res.redirect('/');
  }

  const app = await App.findById(req.params.id);
  res.render('app-edit', {
    title: `Edit ${app.title}`,
    app,
  });
});

router.post('/edit', async (req, res) => {
  const { id } = req.body;
  delete req.body.id;
  await App.findByIdAndUpdate(id, req.body);
  res.redirect('/apps');
});

router.get('/:id', async (req, res) => {
  const app = await App.findById(req.params.id);
  res.render('app', {
    layout: 'empty',
    title: `App ${app.title}`,
    app,
  });
});

module.exports = router;
