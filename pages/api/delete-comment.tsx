import { NextApiRequest, NextApiResponse } from "next";
import { MongoClient } from "mongodb";
import { ObjectId } from "mongodb";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "DELETE") {
    const data = req.body;
    const client = await MongoClient.connect(
      "mongodb+srv://jubi1838:tGPeMsshZVhUlnE5@connect-app.wyxynia.mongodb.net/connect?retryWrites=true&w=majority&appName=connect-app"
    );
    const db = client.db();
    const connectCollection = db.collection("meetup-data");
    const result = await connectCollection.updateOne(
      { _id: new ObjectId(data.postId) },
      { $pull: { comments: { commentId: data.commentId } } }
    );
    client.close();
    res.status(201).json({ message: "deleted one" });
  }
}
export default handler;
