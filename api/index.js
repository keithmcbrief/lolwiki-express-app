var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
  const data = { test: '123' };
  console.log(data);
  res.json(data);
});

module.exports = router;
