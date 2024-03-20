import withAuth from "src/server/utils/withAuth";
import Wallet from "src/server/model/wallet";
import dbConnect from "src/server/dbConnect";
import business from "src/server/model/business";

const handler = async (req, res) => {
  await dbConnect();
  if (req.method === 'GET') {
    try {
      const { slug } = req.query;
      const result = await Wallet.findById(slug);

      return res.status(200).json({
        success: true,
        data: result
      });

    } catch (e) {
      return res.status(404).json({
        success: false,
        message: e.message
      });
    }

  } else if (req.method == "POST") {
    try {
      const { slug } = req.query;
      const result = await Wallet.findByIdAndUpdate(slug, req.body.data);

      return res.status(200).json({
        success: true,
        data: result
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