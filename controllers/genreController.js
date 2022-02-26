var Genre = require('../models/genre');
var Book = require('../models/book');
var async = require('async');
const { body,validationResult } = require("express-validator");

// display list of all genres
const genre_list = (req, res) => {
  
  Genre.find()
    .sort({name: 1})
    .exec(function (err, list_genres) {
      if (err) { return next(err); }
      // successful so render
      res.render('genre_list', { title: 'Genre List', genre_list: list_genres })
    })

};

// display detail page for a specific genre
const genre_detail = (req, res, next) => {
  
  async.parallel({
    genre: function(callback) {
      Genre.findById(req.params.id)
        .exec(callback);
    },
    genre_books: function(callback) {
      Book.find({ 'genre': req.params.id })
        .exec(callback)
    },
  }, function(err, results) {
    if (err) { return next(err); }
    if (results.genre==null) { //no results
      var err = new Error('Genre not found');
      err.status = 404
      return next(err);
    }
    // successful so render
    res.render('genre_detail', { title: 'Genre Detail', genre: results.genre, genre_books: results.genre_books })
  })

};

// display genre create form on GET
const genre_create_get = (req, res) => {
  res.render('genre_form', { title: 'Create Genre' });
};

// handle genre create on POST
const genre_create_post = [
  
  //validate and sanitize the name field
  body('name', 'Genre name required').trim().isLength({ min: 1 }).escape(),

  // process request after validation and sanitization
  (req, res, next) => {

    // extract the validation errors from a request
    const errors = validationResult(req);

    // create a genre object with escaped and trimmed data
    var genre = new Genre(
      { name: req.body.name }
    );

    if (!errors.isEmpty()) {
      // there are errors. render the form again with sanitized values/error messages.
      res.render('genre_form', { title: 'Create Genre', genre: genre, errors: errors.array() });
      return;
    }
    else {
      //data from form is valid
      //check if Genre with the same name already exists
      Genre.findOne({ 'name': req.body.name })
        .exec( function(err, found_genre) {
          if (err) { return next(err); }

          if (found_genre) {
            // genre exists, redirect to its detail page
            res.redirect(found_genre.url);
          }
          else {
            genre.save(function (err) {
              if (err) { return next(err); }
              //genre saved, redirect to genre detail page
              res.redirect(genre.url);
            });
          };
        });
    };
  }
];

// display genre delete form on GET
const genre_delete_get = (req, res) => {
  res.send('NOT IMPLEMENTED: genre delete GET');
};

// display list of all genres
const genre_delete_post = (req, res) => {
  res.send('NOT IMPLEMENTED: genre delete POST');
};

// display list of all genres
const genre_update_get = (req, res) => {
  res.send('NOT IMPLEMENTED: genre update GET');
};

// display list of all genres
const genre_update_post = (req, res) => {
  res.send('NOT IMPLEMENTED: genre update POST');
};

module.exports = {
  genre_list,
  genre_detail,
  genre_create_get,
  genre_create_post,
  genre_delete_get,
  genre_delete_post,
  genre_update_get,
  genre_update_post
}
