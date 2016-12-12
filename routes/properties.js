var express = require('express');
var router = express.Router();
var Property = require('../models/properties');
var dateFormat = require('dateformat')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Awesome Real Estate' });
});

router.get('/api/listings', function(req, res, next) {
  console.log("Received a request for /api/listings");
  Property.find({}, function(err, listings){
    if (err) {
      return next(err);
    }
    res.json(listings)
  });
});

router.post('/api/listings', function(req, res, next) {

  console.log(req.body);
  // var courseJSON = req.body;


  function dateListed () {
    let now = new Date();
    let order = dateFormat(now, "mmmm dS, yyyy");

    return order;
  }

  req.body.dateListed = dateListed();

  var property = new Property(req.body);

  if (!property.type || !property.name || !property.description || !property.address || !property.price) {
    res.status(400);
    return res.json({"status" : 400, "message" : "Missing input data"});
  }

  property.save(function(err) {
    if (err) {
      return res.status(500).json({error : "Failed to save the course"});
    }else {
      return res.json({"status" : 200, "message" : "Added new course"});
    }
  });

});

module.exports = router;
