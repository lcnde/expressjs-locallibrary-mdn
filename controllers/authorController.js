var Author = require('../models/author');

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
const author_detail = (req, res) => {
  res.send('NOT IMPLEMENTED: Author detail:' + req.params.id);
};

// display Author create form on GET
const author_create_get = (req, res) => {
  res.send('NOT IMPLEMENTED: Author create GET');
};

// handle Author create on POST
const author_create_post = (req, res) => {
  res.send('NOT IMPLEMENTED: Author create POST');
};

// display Author delete form on GET
const author_delete_get = (req, res) => {
  res.send('NOT IMPLEMENTED: Author delete GET');
};

// display list of all authors
const author_delete_post = (req, res) => {
  res.send('NOT IMPLEMENTED: Author delete POST');
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