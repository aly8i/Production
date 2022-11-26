import dbConnect from "../../../util/mongo";
import Job from "../../../models/Job";
const handler = async(req, res) => {
  const { method } = req;
  await dbConnect();
  
  if (method === "GET") {
    try {
      const jobs = await Job.find();
      res.status(200).json(jobs);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  if (method === "POST") {
    try {
      const job = await Job.create(req.body);
      res.status(201).json(job);
    } catch (err) {
      res.status(500).json(err);
    }
  }
};
export default handler;
