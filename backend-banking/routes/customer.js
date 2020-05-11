const express = require('express');

const router = express.Router();

/* GET users listing. */
router.put('/add', function (req, res, next) {
  res.send('haha');
});

module.exports = router;