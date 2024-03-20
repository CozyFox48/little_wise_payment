import withAuth from "src/server/utils/withAuth";
import Wallet from "src/server/model/wallet";
import Invoice from "src/server/model/invoices";
import dbConnect from "src/server/dbConnect";
import business from "src/server/model/business";

const handler = async (req, res) => {
    await dbConnect();
    if (req.method === 'GET') {
        try {
            const { slug } = req.query;
            const result = await Wallet.findById(slug).populate('invoices');

            let response_result = [];
            for (let each_invoice of result.invoices) {
                let each_result = {
                    _id: each_invoice._id,
                    sender: each_invoice.sender,
                    receiver: each_invoice.receiver,
                    amount: each_invoice.amount,
                    currency: each_invoice.currency,
                    description: each_invoice.description,
                    payment: each_invoice.payment
                };
                if (each_invoice.sender.toString() !== slug.toString()) {
                    const other_wallet = await Wallet.findById(each_invoice.sender).populate('business').populate('owner');
                    each_result.opponent = each_result.sender;
                    if (other_wallet.owner) {
                        each_result.sender = other_wallet.owner.username;
                        each_result.desc = other_wallet.owner.email;
                        each_result.type = 'Personal';
                    } else {
                        each_result.sender = other_wallet.business.title;
                        each_result.desc = other_wallet.business.description;
                        each_result.type = 'Business';
                    }
                }
                if (each_invoice.receiver.toString() !== slug.toString()) {
                    const other_wallet = await Wallet.findById(each_invoice.receiver).populate('business').populate('owner');
                    if (other_wallet.owner) {
                        each_result.receiver = other_wallet.owner.username;
                        each_result.desc = other_wallet.owner.email;
                        each_result.type = 'Personal';
                    } else {
                        each_result.receiver = other_wallet.business.title;
                        each_result.desc = other_wallet.business.description;
                        each_result.type = 'Business';
                    }
                }
                response_result.push(each_result);
            }

            return res.status(200).json({
                success: true,
                data: response_result
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