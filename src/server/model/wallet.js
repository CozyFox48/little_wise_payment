const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  balance: [{
    currency: {
      type: String,
      enum: ['USD', 'GBP', 'EUR'],
    },
    amount: {
      type: Number,
      default: 0
    }
  }],
  nickname:String,
  deleted:{
    type:Boolean,
    default:false
  },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
  business:{ type: mongoose.Schema.Types.ObjectId, ref: 'business' },
  transactions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'transaction' }],
  pendings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'pending' }],
  contacts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'wallet' }],
  invoices:[{ type: mongoose.Schema.Types.ObjectId, ref: 'invoice' }]
});

module.exports = mongoose.models.wallet || mongoose.model('wallet', UserSchema);