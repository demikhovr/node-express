const { Schema, model } = require('mongoose');

const appSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  img: String,
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});

appSchema.method('toClient', function () {
  const app = this.toObject();

  app.id = app._id;
  delete app._id;

  return app;
});

module.exports = model('App', appSchema);
