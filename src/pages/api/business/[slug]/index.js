import withAuth from "src/server/utils/withAuth";
import Business from "src/server/model/business";
import dbConnect from "src/server/dbConnect";

const handler = async (req, res) => {
  await dbConnect();
  if (req.method === 'GET') {
    try {
      const { slug } = req.query;
      const result = await Business.findById(slug).populate('owner');

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

  } else if (req.method === "DELETE") {
    try {
      const { slug } = req.query;
      await Business.findByIdAndUpdate(slug, { $set: { deleted: true } })

      return res.status(200).json({
        success: true
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