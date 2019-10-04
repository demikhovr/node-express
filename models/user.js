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

userSchema.methods.addToCart = function (app) {
  const items = [...this.cart.items];
  const index = items.findIndex(it => it.appId.toString() === app._id.toString());

  if (index >= 0) {
    items[index].count += 1;
  } else {
    items.push({
      appId: app._id,
      count: 1,
    });
  }

  this.cart = { items };
  return this.save();
};

module.exports = model('User', userSchema);
