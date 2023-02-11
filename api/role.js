var express = require('express');
var router = express.Router();
const Role = require('../models/role');
const Champion = require('../models/champion');
const async = require('async');

router.post('/create', [
  (req, res, next) => {
    const role = new Role({
      name: req.body.name,
    });
    console.log(req.body);

    role.save((err) => {
      if (err) {
        return next(err);
      }
      res.json(`https://lolwiki-frontend.vercel.app/${role.url}`);
    });
  },
]);

router.get('/:id', (req, res, next) => {
  const id = req.params.id;
  async.parallel(
    {
      role(callback) {
        Role.findById(id).exec(callback);
      },
      champions(callback) {
        Champion.find({ role: id }).exec(callback);
      },
    },
    (err, results) => {
      console.log(err, results);
      if (err) {
        console.log(err);
        return next(err);
      }
      if (results.role == null) {
        return next(err);
      }
      res.json({
        role: results.role,
        champions: results.champions,
      });
    }
  );
});

router.get('/:id/delete', async function (req, res, next) {
  const id = req.params.id;
  await Role.deleteOne({ _id: id });
  res.json(`https://lolwiki-frontend.vercel.app/roles`);
});

module.exports = router;
