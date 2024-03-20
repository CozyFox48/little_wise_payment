import withAuth from "src/server/utils/withAuth";
import dbConnect from "src/server/dbConnect";
import Transaction from "src/server/model/transactions";
import Wallet from "src/server/model/wallet";

const handler = async (req, res) => {
    await dbConnect();
    if (req.method === 'POST') {
        try {
            const requestBody = req.body.data;
            console.log(requestBody)
            const adding = Number(req.body.data.amount);
            let _sender = await Wallet.findById(requestBody.sender);
            console.log(_sender);

            let flag = true;
            for (let i = 0; i < _sender.balance.length; i++) {
                if (_sender.balance[i].currency === requestBody.currency && _sender.balance[i].amount - adding < 0) {
                    flag = false;

                    return res.status(401).json({
                        success: false,
                        message: 'The balance has been exceeded.'
                    });
                }
            }
            if (flag) {
                const transaction = await Transaction.create(requestBody);
                for (let i = 0; i < _sender.balance.length; i++) {
                    if (_sender.balance[i].currency === requestBody.currency) _sender.balance[i].amount = _sender.balance[i].amount - adding;
                }
                _sender.transactions.push(transaction._id);
                await _sender.save();

                let _receiver = await Wallet.findById(requestBody.receiver);
                console.log(_receiver)
                _receiver.transactions.push(transaction._id);
                for (let i = 0; i < _receiver.balance.length; i++) {
                    if (_receiver.balance[i].currency === requestBody.currency) _receiver.balance[i].amount = _receiver.balance[i].amount + adding;
                }
                await _receiver.save();

                return res.status(200).json({
                    success: true,
                });
            }


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