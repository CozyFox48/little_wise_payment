const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  sender: {
    type: String,
    amount: number
  },
  receiver: {
    type: String,
    required: true,
  },
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

module.exports = mongoose.models.transaction || mongoose.model('transaction', UserSchema);