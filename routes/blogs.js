var express = require('express');
var router = express.Router();
var blogpage = require('../controller/blogControl')
var verify = require('../middleware/token')

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

router.post('/', verify, blogpage.blogEntry)

router.put('/:id', verify, blogpage.blogUpdate)

router.post('/:id', verify, blogpage.blogDelete)

router.get('/', verify, blogpage.blogDisplay)

router.get('/story/:id', verify, blogpage.blogDisplayOne)

module.exports = router;