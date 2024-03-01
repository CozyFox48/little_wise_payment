const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: String,
  summary: String,
  published:Boolean,
  prices:[{
    amount:Number,
    currency: {
      type: String,
      enum: ['USD', 'GBP', 'EUR'],
      required: true
    },
    name:String,

  }],
  type:String,
  category:String
});

module.exports = mongoose.models.product || mongoose.model('product', UserSchema);