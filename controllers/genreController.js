var Genre = require('../models/genre');

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
const genre_detail = (req, res) => {
  res.send('NOT IMPLEMENTED: genre detail:' + req.params.id);
};

// display genre create form on GET
const genre_create_get = (req, res) => {
  res.send('NOT IMPLEMENTED: genre create GET');
};

// handle genre create on POST
const genre_create_post = (req, res) => {
  res.send('NOT IMPLEMENTED: genre create POST');
};

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
