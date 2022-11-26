import dbConnect from "../../../util/mongo";
import Equipment from "../../../models/Equipment";
const handler = async(req, res) => {
  const { method } = req;
  await dbConnect();

  if (method === "GET") {
    try {
      const equipments = await Equipment.find();
      res.status(200).json(equipments);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  if (method === "POST") {
    try {
      const equipment = await Equipment.create(req.body);
      res.status(201).json(equipment);
    } catch (err) {
      res.status(500).json(err);
    }
  }
};
export default handler;
