import withAuth from "src/server/utils/withAuth";
import Wallet from "src/server/model/wallet";
import Business from "src/server/model/business";
import User from "src/server/model/user";
import dbConnect from "src/server/dbConnect";
import Transaction from "src/server/model/transactions";

const handler = async (req, res) => {
    await dbConnect();
    if (req.method === 'GET') {
        try {
            const { slug } = req.query;
            const result = await Wallet.findById(slug).populate('transactions');

            let response_result = [];
            for (let each_transaction of result.transactions) {
                let each_result = { sender: each_transaction.sender, receiver: each_transaction.receiver, amount: each_transaction.amount, currency: each_transaction.currency };
                if (each_transaction.sender.toString() !== slug.toString()) {
                    const other_wallet = await Wallet.findById(each_transaction.sender).populate('business').populate('owner');
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
                if (each_transaction.receiver.toString() !== slug.toString()) {
                    const other_wallet = await Wallet.findById(each_transaction.receiver).populate('business').populate('owner');
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

    } else {

    }
}

export default withAuth(handler);