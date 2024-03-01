const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'wallet' },
  receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'wallet' },
  description:String,
  payment:{ type: mongoose.Schema.Types.ObjectId, ref: 'transaction' },
  amount: {
    type: Number,
    required: true
  },
  currency: {
    type: String,
    enum: ['USD', 'GBP', 'EUR'],
    required: true
  },
});

module.exports = mongoose.models.invoice || mongoose.model('invoice', UserSchema);