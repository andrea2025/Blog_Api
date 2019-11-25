var express = require('express');
var router = express.Router();
var auth = require('../controller/userControl');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.status(200).json({ title: 'Express' });
});

router.post('/register', auth.userRegister)

router.post('/login', auth.userLogin)

router.get('/all', auth.userDisplay)


module.exports = router;
