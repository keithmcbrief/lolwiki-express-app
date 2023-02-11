var express = require('express');
var router = express.Router();
const Champion = require('../models/champion');

router.post('/create', [
  (req, res, next) => {
    if (!Array.isArray(req.body.role)) {
      req.body.role =
        typeof req.body.role === 'undefined' ? [] : [req.body.role];
    }
    const champion = new Champion({
      name: req.body.name,
      title: req.body.title,
      summary: req.body.summary,
      role: req.body.role,
    });

    champion.save((err) => {
      if (err) {
        return next(err);
      }
      res.redirect(`http://localhost:5173${champion.url}`);
    });
  },
]);

router.post('/:id/update', (req, res, next) => {
  const id = req.params.id;
  if (!Array.isArray(req.body.role)) {
    req.body.role = typeof req.body.role === 'undefined' ? [] : [req.body.role];
  }
  const champion = new Champion({
    name: req.body.name,
    title: req.body.title,
    summary: req.body.summary,
    role: req.body.role,
    _id: id,
  });
  console.log(champion);

  Champion.findByIdAndUpdate(id, champion, {}, (err, newChamp) => {
    if (err) {
      return next(err);
    }

    res.redirect(`http://localhost:5173${newChamp.url}`);
  });
});

router.get('/:id', (req, res, next) => {
  const id = req.params.id;
  Champion.findById(id)
    .populate('role')
    .exec(function (err, results) {
      if (err) {
        return next(err);
      }
      res.json(results);
    });
});

router.get('/:id/delete', async function (req, res, next) {
  const id = req.params.id;
  await Champion.deleteOne({ _id: id });
  res.redirect(`http://localhost:5173/champions`);
});

module.exports = router;
