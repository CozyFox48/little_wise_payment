import withAuth from "src/server/utils/withAuth";
import Wallet from "src/server/model/wallet";
import Business from "src/server/model/business";
import Invoice from "src/server/model/invoices";
import dbConnect from "src/server/dbConnect";

const handler = async (req, res) => {
    await dbConnect();
    if (req.method === 'POST') {
        try {
            let sender = req.body.data.sender;
            if (!req.body.data.sender) {
                const business = await Business.findById(req.body.data.business);
                const wallets = business.wallets;
                for (const wallet of wallets) {
                    if (wallet.isDefault) sender = wallet.id;
                }
            }
            const invoice = await Invoice.create({ ...req.body.data, sender: sender });
            await Wallet.findByIdAndUpdate(sender, { $push: { invoices: invoice._id } })
            await Wallet.findByIdAndUpdate(req.body.data.receiver, { $push: { invoices: invoice._id } })

            return res.status(200).json({
                success: true
            });

        } catch (e) {
            return res.status(404).json({
                success: false,
                message: e.message
            });
        }

    }
}

export default withAuth(handler);