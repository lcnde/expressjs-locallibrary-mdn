/* eslint-disable camelcase */
const mongoose = require('mongoose');
const { DateTime } = require('luxon');

const { Schema } = mongoose;

const AuthorSchema = new Schema(
  {
    first_name: { type: String, required: true, maxLength: 100 },
    family_name: { type: String, required: true, maxLength: 100 },
    date_of_birth: { type: Date },
    date_of_death: { type: Date },
  },
);

// virtual for author's full name
AuthorSchema
  .virtual('name')
  .get(function () {
    let fullname = '';
    if (this.first_name && this.family_name) {
      fullname = `${this.family_name}, ${this.first_name}`;
    }
    if (!this.first_name || !this.family_name) {
      fullname = '';
    }
    return fullname;
  });

AuthorSchema
  .virtual('lifespan')
  .get(function () {
    let lifetime_string = '';
    if (this.date_of_birth) {
      lifetime_string = this.date_of_birth.getYear().toString();
    }
    lifetime_string += ' - ';
    if (this.date_of_death) {
      lifetime_string += this.date_of_death.getYear();
    }
    return lifetime_string;
  });

// virtual for luxon formatted date of birth
AuthorSchema
.virtual('date_of_birth_formatted')
.get(function () {
    let date_string = ''
    if (this.date_of_birth) {
      date_string = DateTime.fromJSDate(this.date_of_birth).toLocaleString(DateTime.DATE_MED);
    } else {
      date_string = 'Unknown'
    }
    return date_string
  })

// virtual for luxon formatted date of death
AuthorSchema
.virtual('date_of_death_formatted')
.get(function () {
    let date_string = ''
    if (this.date_of_death) {
      date_string = DateTime.fromJSDate(this.date_of_birth).toLocaleString(DateTime.DATE_MED);
    } else {
      date_string = 'Unknown'
    }
    return date_string
  })


// virtual author URL
AuthorSchema
  .virtual('url')
  .get(function () {
    return `/catalog/author/${this._id}`;
  });

// export model
module.exports = mongoose.model('Author', AuthorSchema);
