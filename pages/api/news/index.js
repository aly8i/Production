import dbConnect from "../../../util/mongo";
import New from "../../../models/New";
const handler = async(req, res) => {
  const { method } = req;
  await dbConnect();

  if (method === "GET") {
    try {
      const news = await New.find();
      res.status(200).json(news);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  if (method === "POST") {
    try {
      const neww = await New.create(req.body);
      res.status(201).json(neww);
    } catch (err) {
      res.status(500).json(err);
    }
  }
};
export default handler;
