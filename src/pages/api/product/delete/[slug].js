import withAuth from "src/server/utils/withAuth";
import Product from "src/server/model/products";
import dbConnect from "src/server/dbConnect";
import business from "src/server/model/business";

const handler = async (req, res) => {
    await dbConnect();
    if (req.method === 'DELETE') {
        try {
            const { slug } = req.query;
            const _product = await Product.findById(slug);
            await business.findByIdAndUpdate(_product.business, { $pull: { products: _product._id } });
            await Product.findByIdAndDelete(slug);

            return res.status(200).json({
                success: true,
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