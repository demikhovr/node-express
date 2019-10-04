const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  cart: {
    items: [
      {
        count: {
          type: Number,
          required: true,
          default: 1,
        },
        appId: {
          type: Schema.Types.ObjectId,
          ref: 'App',
          required: true,
        },
      },
    ],
  },
});

module.exports = model('User', userSchema);