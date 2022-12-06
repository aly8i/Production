import dbConnect from "../../../util/mongo";
import Static from "../../../models/Static";
const handler = async(req, res) => {
  const { method } = req;
  await dbConnect();

  if (method === "GET") {
    try {
      const statics = await Static.find();
      res.status(200).json(statics);
    } catch (err) {
      res.status(500).json(err);
    }
  }
  if (method === "PUT") {
    try {
      const statics = await Static.findByIdAndUpdate("638a559f3f87617721885f09", req.body,{new:true});
      res.status(200).json(statics);
    } catch (err) {
      res.status(500).json(err);
    }
  }
};
export default handler;
