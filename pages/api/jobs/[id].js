import dbConnect from "../../../util/mongo";
import Job from "../../../models/Job";
import { verify } from "jsonwebtoken";

export default async function handler(req, res) {

  const {method, query: { id }} = req;
  const token = req.headers.authorization;
  await dbConnect();

  if (method === "GET") {
    try {
      const job = await Job.findById(id);
      res.status(200).json(job);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  if (method === "PUT") {
    const j = await Job.findById(id);
    verify(token,process.env.NEXT_PUBLIC_JWT_SECRET,async function(err,decoded){
      if(!err && decoded) {
        if(decoded.sub == j.userid || decoded.role=='admin'){
          try {
            const job = await Job.findByIdAndUpdate(id, req.body,{new:true});
            res.status(200).json(job);
          } catch (err) {
            res.status(500).json(err);
          }
        }
        return res.status(500).json({message: 'Sorry you are not authorized'})
      }
      res.status(600).json({message: "Sorry you are not authenticated"})
    })
  }

  if (method === "DELETE") {
    const j = await Job.findById(id);
      verify(token,process.env.NEXT_PUBLIC_JWT_SECRET,async function(err,decoded){
        if(!err && decoded) {
          if(decoded.sub == j.userid || decoded.role=='admin'){
            try {
              await Job.findByIdAndDelete(id);
              res.status(200).json("The Job has been deleted!");
            } catch (err) {
              res.status(500).json(err);
            }
          }
          return res.status(500).json({message: 'Sorry you are not authorized'})
        }
        res.status(600).json({message: "Sorry you are not authenticated"})
      })
  }
};
