import withAuth from "src/server/utils/withAuth";
import Wallet from "src/server/model/wallet";
import Business from "src/server/model/business";
import User from "src/server/model/user";

const handler = async (req, res) => {
    if (req.method === 'GET') {
        try {
            const { slug } = req.query;

            const result = await Business.findById(slug).populate('members.id');

            return res.status(200).json({
                success: true,
                data: result.members
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

            const result = await Business.findById(slug).populate('members.id');
            const members = result.members;
            let _members = [];
            for (let member of members) {
                if (member.id._id.toString() != req.body.id.toString())
                    _members.push({ id: member.id._id, role: member.role, salary: member.salary, date: member.date });
            }

            const result1 = await Business.findByIdAndUpdate(slug, { $set: { members: _members } });

            return res.status(200).json({
                success: true,
                data: result1.members
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
                    members: {
                        role: req.body.data.role,
                        salary: req.body.data.salary,
                        date: Date.now(),
                        id: user._id
                    }
                }
            })

            const result = await Business.findById(slug).populate({
                path: 'members.id',
                match: { deleted: false },
            });

            return res.status(200).json({
                success: true,

                data: result.members
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