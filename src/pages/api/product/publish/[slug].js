import withAuth from "src/server/utils/withAuth";
import Product from "src/server/model/products";
import dbConnect from "src/server/dbConnect";
import business from "src/server/model/business";

const handler = async (req, res) => {
    await dbConnect();
    if (req.method === 'POST') {
        try {
            const { slug } = req.query;
            const requestBody = req.body.data;
            await Product.findByIdAndUpdate(slug, { $set: requestBody });
            const _product = await Product.findById(slug).populate('business');

            return res.status(200).json({
                success: true,
                data: _product
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