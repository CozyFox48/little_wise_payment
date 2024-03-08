const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  title: String,
  description: String,
  deleted:{
    type:Boolean,
    default:false
  },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
  wallets: [{
    id: { type: mongoose.Schema.Types.ObjectId, ref: 'wallet' },
    isDefault: Boolean
  }],
  customers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'wallet' }],
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'product' }],
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }]
});

module.exports = mongoose.models.business || mongoose.model('business', UserSchema);