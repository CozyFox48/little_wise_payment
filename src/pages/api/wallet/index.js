import withAuth from "src/server/utils/withAuth";
import Wallet from "src/server/model/wallet";
import Business from "src/server/model/business";
import User from "src/server/model/user";
import dbConnect from "src/server/dbConnect";

const handler = async (req, res) => {
    await dbConnect();

    if (req.method === 'PUT') {
        try {
            const wallet = await Wallet.create({
                balance: [{ currency: 'USD', amount: 0 }, { currency: 'EUR', amount: 0 }, { currency: 'GBP', amount: 0 }],
                nickname: req.body.data.nickname,
                deleted: false,
                business: req.body.data.business_id
            });
            await Business.findByIdAndUpdate(req.body.data.business_id, {
                $push: {
                    wallets: {
                        id: wallet._id,
                        isDefault: false
                    }
                }
            });

            const result = await Business.findById(req.body.data.business_id).populate({
                path: 'wallets.id',
                match: { deleted: false },
            });

            return res.status(200).json({
                success: true,
                data: result.wallets
            });

        } catch (e) {
            return res.status(404).json({
                success: false,
                message: e.message
            });
        }
    } else {

    }
}

export default withAuth(handler);