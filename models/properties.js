var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PropertySchema = new Schema({
  name: String,
  type: String,
  address: String,
  price: String,
  rentals: String,
  description: String,
  dateListed: String,
})

module.exports = mongoose.model('Property', PropertySchema);