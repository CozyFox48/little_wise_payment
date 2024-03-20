import withAuth from "../../server/utils/withAuth";
import User from "../../server/model/user";
import dbConnect from "src/server/dbConnect";

const handler = async (req, res) => {
    await dbConnect();
    if (req.method === 'GET') {
        const user = await User.findById(req.query.userID);

        return res.status(200).json({
            balance: user.balance,
            bankNumber: user.bankNumber,
            currency: user.currency,
            username: user.username
        });
    } else if (req.method === 'POST') {
        await User.findByIdAndUpdate(req.query.userID, req.body);

        return res.status(200).json({
            success: true
        });
    }
}

export default withAuth(handler);