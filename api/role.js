var express = require('express');
var router = express.Router();
const Role = require('../models/role');

router.post('/create', [
  (req, res, next) => {
    const role = new Role({
      name: req.body.name,
    });
    console.log(req.body)

    role.save((err) => {
      if (err) {
        return next(err);
      }
      res.redirect(`http://localhost:5173${role.url}`);
    });
  },
]);

module.exports = router;
