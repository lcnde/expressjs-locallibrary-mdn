var Author = require('../models/author');
var Book = require('../models/book');
var async = require('async');
const { body,validationResult } = require('express-validator');

// display list of all Authors
const author_list = (req, res) => {
  
  Author.find()
    .sort([['family_name', 'ascending']])
    .exec(function (err, list_authors) {
      if (err) { return next(err); }
      // successful so render
      res.render('author_list', { title: 'Author List', author_list: list_authors })
    })

};

// display detail page for a specific Author
const author_detail = (req, res, next) => {
  
  async.parallel({
    author: function(callback) {
      Author.findById(req.params.id)
        .exec(callback)
    },
    author_books: function(callback) {
      Book.find({ 'author': req.params.id }, 'title summary')//return only title and summary
        .exec(callback)
    },
  }, function(err, results) {
    if (err) { return next(err); } // Error in API usage
    if (results.author==null) { // no results
      var err = new Error('Author not found');
      err.status = 404;
      return next(err);
    }
    // successful so render
    res.render('author_detail', { title: 'Author Detail', author: results.author, author_books: results.author_books });
  });

};

// display Author create form on GET
const author_create_get = function(req, res, next) {
  res.render('author_form', { title: 'Create Author'});
};

// handle Author create on POST
const author_create_post = [

  // validate and sanitize fields
  body('first_name')
    .trim()
    .isLength({min: 1})
    .escape()
    .withMessage('First name must be specified')
    .isAlphanumeric()
    .withMessage('First name has non-alphanumeric characters'),
  body('family_name')
    .trim()
    .isLength({min: 1})
    .escape()
    .withMessage('Family name must be specified')
    .isAlphanumeric()
    .withMessage('Family name has non-alphanumeric characters'),
  body('date_of_birth', 'Invalid date of birth')
    .optional({ checkFalsy: true })
    .isISO8601()
    .toDate(),
    body('date_of_death', 'Invalid date of death')
    .optional({ checkFalsy: true })
    .isISO8601()
    .toDate(),
  
    // process request after validation and sanitization
    (req, res, next) => {

      // extract the validation errors from a request
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        // there are errors. render form again with sanitized values/errors messages
        res.render('author_form', { title: 'Create Author', author: req.body, errors: errors.array() });
        return;
      }
      else {
        // form data is valid
        //create an Author object with escaped and trimmed data

        var author = new Author(
          {
            first_name: req.body.first_name,
            family_name: req.body.family_name,
            date_of_birth: req.body.date_of_birth,
            date_of_death: req.body.date_of_death
          }
        );
        author.save(function (err) {
          if (err) { return next(err); }
          //successful so redirect to new author record
          res.redirect(author.url);
        });
      }
    }
];

// display Author delete form on GET
const author_delete_get = (req, res) => {
  
  async.parallel({
    author: function(callback) {
      Author.findById(req.params.id).exec(callback)
    },
    authors_books: function(callback) {
      Book.find({ 'author': req.params.id }).exec(callback)
    },
  }, function(err, results) {
    if (err) { return next(err); }
    if (results.author===null) { // no results
      res.redirect('/catalog/authors');
    }
    // successful so render
    res.render('author_delete', { title: 'Delete Author', author: results.author, author_books: results.authors_books });
  });

};

// display list of all authors
const author_delete_post = (req, res) => {
  
  async.parallel({
    author: function(callback) {
      Author.findById(req.body.authorid).exec(callback)
    },
    authors_books: function(callback) {
      Book.find({ 'author': req.body.authorid }).exec(callback)
    },
  }, function(err, results) {
    if (err) {return next(err);}
    //success
    if (results.authors_books.length > 0) {
      // author has books. render in same way as for get route
      res.render('author_delete', { title: 'Delete Author', author: results.author, author_books: results.authors_books });
      return;
    }
    else {
      // author has no books. delete object and redirect to the list of authors
      Author.findByIdAndRemove(req.body.authorid, function deleteAuthor(err) {
        if (err) {return next(err);}
        // success go to author list
        res.redirect('/catalog/authors')
      })
    }
  })

};

// display list of all authors
const author_update_get = (req, res) => {
  res.send('NOT IMPLEMENTED: Author update GET');
};

// display list of all authors
const author_update_post = (req, res) => {
  res.send('NOT IMPLEMENTED: Author update POST');
};

module.exports = {
  author_list,
  author_detail,
  author_create_get,
  author_create_post,
  author_delete_get,
  author_delete_post,
  author_update_get,
  author_update_post
}
