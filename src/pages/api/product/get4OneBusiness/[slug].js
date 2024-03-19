import withAuth from "src/server/utils/withAuth";
import Product from "src/server/model/products";
import dbConnect from "src/server/dbConnect";
import business from "src/server/model/business";

const handler = async (req, res) => {
    await dbConnect();
    if (req.method === 'GET') {
        try {
            const { slug } = req.query;
            const response_result = await business.findById(slug).populate('products');

            return res.status(200).json({
                success: true,
                data: response_result.products
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