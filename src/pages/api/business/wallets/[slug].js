import withAuth from "src/server/utils/withAuth";
import Business from "src/server/model/business";
import dbConnect from "src/server/dbConnect";

const handler = async (req, res) => {
    await dbConnect();
    if (req.method === 'GET') {
        try {
            const { slug } = req.query;

            const result = await Business.findById(slug).populate({
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