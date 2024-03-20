import withAuth from "src/server/utils/withAuth";
import Wallet from "src/server/model/wallet";
import Business from "src/server/model/business";
import User from "src/server/model/user";
import dbConnect from "src/server/dbConnect";

const handler = async (req, res) => {
  await dbConnect();

  if (req.method === 'PUT') {
    try {
      const business = await Business.create({ ...req.body.data, owner: req.user, deleted: false });
      const user = await User.findById(req.user);
      user.business.push(business._id);
      await user.save();

      const wallet = await Wallet.create({
        business: business._id,
        deleted: false,
        nickname: 'Default',
        balance: [{ currency: 'USD', amount: 0 }, { currency: 'EUR', amount: 0 }, { currency: 'GBP', amount: 0 }]
      });

      await Business.findByIdAndUpdate(business._id, {
        $push: {
          wallets: {
            id: wallet._id,
            isDefault: true
          }
        }
      })

      const result = await User.findById(req.user).populate({
        path: 'business',
        match: { deleted: false },
      });

      return res.status(200).json({
        success: true,
        data: result.business
      });

    } catch (e) {
      return res.status(404).json({
        success: false,
        message: e.message
      });
    }
  } else if (req.method === 'GET') {
    try {
      const result = await User.findById(req.user).populate({
        path: 'business',
        match: { deleted: false },
      });

      return res.status(200).json({
        success: true,
        data: result.business
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