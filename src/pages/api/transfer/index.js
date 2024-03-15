
import withAuth from "src/server/utils/withAuth";
import Transaction from "src/server/model/transactions";
import User from "src/server/model/user";
import dbConnect from "src/server/dbConnect";
import Business from "src/server/model/business";
import Wallet from "src/server/model/wallet";

const handler = async (req, res) => {
  await dbConnect();
  if (req.method === 'POST') {
    try {
      let receiver = '';
      if (req.body.data.type == 'user') {
        const user = await User.findOne({ email: req.body.data.receiver });
        receiver = user.wallet;
      } else {
        const business = await Business.findOne({ title: req.body.data.receiver });
        const wallets = business.wallets;
        for (const wallet of wallets) {
          if (wallet.isDefault === true) receiver = wallet.id;
        }
        if (receiver === '') receiver = wallets[0].id;
      }

      const transaction = await Transaction.create({ ...req.body.data, receiver: receiver, amount: Number(req.body.data.amount) });
      const adding = Number(req.body.data.amount);

      let _sender = await Wallet.findById(req.body.data.sender);
      _sender.transactions.push(transaction._id);
      for (let i = 0; i < _sender.balance.length; i++) {
        if (_sender.balance[i].currency === req.body.data.currency) _sender.balance[i].amount = _sender.balance[i].amount - adding;
      }
      await _sender.save();

      let _receiver = await Wallet.findById(receiver);
      _receiver.transactions.push(transaction._id);
      for (let i = 0; i < _receiver.balance.length; i++) {
        if (_receiver.balance[i].currency === req.body.data.currency) _receiver.balance[i].amount = _receiver.balance[i].amount + adding;
      }
      await _receiver.save();

      return res.status(200).json({
        success: true
      });
    } catch (e) {
      console.log(e.message);

      return res.status(404).json({
        success: false,
        message: e.message
      });
    }
  }
}

export default withAuth(handler);