var Book = require('../models/book');
var Author = require('../models/author');
var Genre = require('../models/genre');
var BookInstance = require('../models/bookinstance');

var async = require('async');

const index = (req, res) => {
  
  async.parallel({
    book_count: function(callback) {
      Book.countDocuments({}, callback); // pass an empty object as match condition to find all documents of this collection
    },
    book_instance_count: function(callback) {
      BookInstance.countDocuments({}, callback);
    },
    book_instance_available_count: function(callback) {
      BookInstance.countDocuments({status: 'Available'}, callback);
    },
    author_count: function(callback) {
      Author.countDocuments({}, callback);
    },
    genre_count: function(callback) {
      Genre.countDocuments({}, callback);
    }
  }, function(err, results) {
    res.render('index', { title: 'Local Library Home', error: err, data: results });
  });

};

// display list of all Books
const book_list = (req, res) => {
  
  Book.find({}, 'title author') // find every book, return only title and author
    .sort({title: 1})
    .populate('author') //replace the author id with the full author details
    .exec(function (err, list_books) {
      if (err) {return next(err); }
      //Successful, so render
      res.render('book_list', { title: 'Book List', book_list: list_books });
    });

};

// display detail page for a specific Book
const book_detail = (req, res) => {
  res.send('NOT IMPLEMENTED: Book detail:' + req.params.id);
};

// display Book create form on GET
const book_create_get = (req, res) => {
  res.send('NOT IMPLEMENTED: Book create GET');
};

// handle Book create on POST
const book_create_post = (req, res) => {
  res.send('NOT IMPLEMENTED: Book create POST');
};

// display Book delete form on GET
const book_delete_get = (req, res) => {
  res.send('NOT IMPLEMENTED: Book delete GET');
};

// display list of all books
const book_delete_post = (req, res) => {
  res.send('NOT IMPLEMENTED: Book delete POST');
};

// display list of all books
const book_update_get = (req, res) => {
  res.send('NOT IMPLEMENTED: Book update GET');
};

// display list of all books
const book_update_post = (req, res) => {
  res.send('NOT IMPLEMENTED: Book update POST');
};

module.exports = {
  index,
  book_list,
  book_detail,
  book_create_get,
  book_create_post,
  book_delete_get,
  book_delete_post,
  book_update_get,
  book_update_post
}
