var express = require('express');
var router = express.Router();
var workModel = require('../model/work');

/* GET work listing. */
router.get('/', function (req, res, next) {
    res.send('from work');
});

router.get('/list', function (req, res, next) {
    workModel.find(function (err, data) {
        if (err) {
            return console.log(err)
        }
        res.render('workList', {
            work: data
        })
    })
});

router.get('/add', function (req, res, next) {
    res.render('workAdd');
});

router.post('/add', function (req, res, next) {
    var newWork = new workModel({
        name: req.body.name,
        artist: req.body.artist,
        url: req.body.url
    })
    newWork.save(function (err, data) {
        if (err) {
            return console.log(err)
        }
        res.redirect('/work/list');
    })
});

router.get('/edit/:id', function (req, res, next) {
    var id = req.params.id;
    workModel.findOne({
        _id: id
    }, function (err, data) {
        res.render('workEdit', {
            work: data
        })
    })
});
router.post('/update', function (req, res, next) {
    var id = req.body.id;
    workModel.findById(id, function (err, data) {
        if (err) {
            return console.log(err);
        }
        data.name = req.body.name;
        data.artist = req.body.artist;
        data.save(function (err) {
            res.redirect('/work/list');
        })
    })
});

module.exports = router;