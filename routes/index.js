var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: '主 页' });
});
router.get('/olduser', function(req, res, next) {
    res.render('signin', { title: '登 录' });
});
router.get('/newuser', function(req, res, next) {
    res.render('signup', { title: '注 册' });
});

module.exports = router;
