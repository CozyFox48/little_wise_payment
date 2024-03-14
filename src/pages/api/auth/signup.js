import dbConnect from "../../../server/dbConnect";
import User from "../../../server/model/user";
import Wallet from "../../../server/model/wallet";
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
    await dbConnect();

    if (req.method === 'POST') {
        try {
            console.log(req.body);

            const user = await User.create({
                username: req.body.username,
                email: req.body.email,
                deleted: false,
                password: bcrypt.hashSync(req.body.password, 8),
            });

            const wallet = await Wallet.create({
                owner: user._id,
                deleted: false,
                balance: [{ currency: 'USD', amount: 0 }, { currency: 'EUR', amount: 0 }, { currency: 'GBP', amount: 0 }]
            });

            await User.findByIdAndUpdate(user._id, { $set: { wallet: wallet._id } });
            res.status(200).send({ message: "User was registered Sucessfully!" });
        } catch (err) {
            res.status(404).send({ message: err.message });
        }
    }
}