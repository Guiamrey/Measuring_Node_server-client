var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'SMM subject' });
});

/*
router.route('/')
    .get(function (req, res, next) {
        res.render('index', { title: 'SMM subject' });
    })
    .post(function (req, res, next) {
        console.log('   Received from client: ' + req.body.value);
    })
    .put(function(req, res, next) {
        next(new Error('not implemented'));
    })
    .delete(function(req, res, next) {
        next(new Error('not implemented'));
    });
*/

module.exports = router;
