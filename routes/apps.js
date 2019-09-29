const { Router } = require('express');

const router = Router();
router.get('/', (req, res) => res.render('apps', {
  title: 'Apps',
  isApps: true,
}));

module.exports = router;
