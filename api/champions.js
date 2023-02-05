var express = require('express');
var router = express.Router();
const Champion = require('../models/champion');

/* GET users listing. */
router.get('/', function (req, res, next) {
  Champion.find({}, 'name title')
    .sort({ name: 1 })
    .exec(function (err, list_champions) {
      if (err) {
        return next(err);
      }
      console.log(list_champions);
      res.json(list_champions);
    });
});

module.exports = router;
