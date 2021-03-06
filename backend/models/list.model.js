const mongoose = require('mongoose');

const { Schema } = mongoose;

const listSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  title: {
    type: String,
    required: true,

  },
  todos: {
    type: String,
  },

}, {
  timestamps: true,
});

module.exports = mongoose.model('List', listSchema);
