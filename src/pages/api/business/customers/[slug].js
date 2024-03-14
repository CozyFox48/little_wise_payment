import withAuth from "src/server/utils/withAuth";
import Wallet from "src/server/model/wallet";
import Business from "src/server/model/business";
import User from "src/server/model/user";

const handler = async (req, res) => {
    if (req.method === 'GET') {
        try {
            const { slug } = req.query;

            const result = await Business.findById(slug).populate('customers');

            return res.status(200).json({
                success: true,
                data: result.customers
            });

        } catch (e) {
            return res.status(404).json({
                success: false,
                message: e.message
            });
        }

    } else if (req.method === 'DELETE') {
        try {
            const { slug } = req.query;

            const result = await Business.findById(slug).populate('customers');
            const customers = result.customers;
            let _customers = [];
            for (let customer of customers) {
                if (customer._id.toString() != req.body.id.toString())
                    _customers.push(customer._id);
            }

            const result1 = await Business.findByIdAndUpdate(slug, { $set: { customers: _customers } });

            return res.status(200).json({
                success: true,
                data: result1.customers
            });

        } catch (e) {

            return res.status(404).json({
                success: false,
                message: e.message
            });
        }

    } else if (req.method === 'PUT') {
        try {
            const { slug } = req.query;
            const user = await User.findOne({ email: req.body.data.email })
            await Business.findByIdAndUpdate(slug, {
                $push: {
                    customers: user._id
                }
            })

            const result = await Business.findById(slug).populate('customers');

            return res.status(200).json({
                success: true,
                data: result.customers
            });

        } catch (e) {
            console.log(e);

            return res.status(404).json({
                success: false,
                message: e.message
            });
        }

    } else {

    }
}

export default withAuth(handler);