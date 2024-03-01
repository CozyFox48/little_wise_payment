const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
  wallets: [{ 
    id: { type: mongoose.Schema.Types.ObjectId, ref: 'wallet' },
    state:String 
  }],
  customers:[{ type: mongoose.Schema.Types.ObjectId, ref: 'wallet' }],
  products:[{ type: mongoose.Schema.Types.ObjectId, ref: 'product' }],
  members:[{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }]
});

module.exports = mongoose.models.business || mongoose.model('business', UserSchema);