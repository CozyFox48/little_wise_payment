const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'wallet' },
  receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'wallet' },
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