var express = require('express');
var router = express.Router();
const Role = require('../models/role');

/* GET users listing. */
router.get('/', function (req, res, next) {
  Role.find({})
    .sort({ name: 1 })
    .exec(function (err, roleList) {
      if (err) {
        return next(err);
      }
      console.log(roleList);
      res.json(roleList);
    });
});

module.exports = router;
