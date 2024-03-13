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
   members: [{
    id:{ type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    role:String,
    salary:Number,
    date:Date
  }],
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'product' }],
  customers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }]
});

module.exports = mongoose.models.business || mongoose.model('business', UserSchema);