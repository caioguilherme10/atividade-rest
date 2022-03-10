const mongoose = require('mongoose')

const Comments = mongoose.model('Comments', {
  name: String,
  book: String,
  comment: String,
})

module.exports = Comments