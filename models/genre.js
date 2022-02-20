const mongoose = require('mongoose');

var Schema = mongoose.Schema;

var GenreSchema = new Schema(
  {
    name: { type: String, required: true, maxLength: 100, minLength: 3 }
  }
);

// virtual for genre URL
GenreSchema
  .virtual('url')
  .get(function () {
    return '/catalog/genre' + this._id;
  });

// export model
module.exports = mongoose.model('Genre', GenreSchema);
