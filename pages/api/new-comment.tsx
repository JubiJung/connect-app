import { MongoClient, ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const data = req.body;
    console.log(data);
    const client = await MongoClient.connect(
      "mongodb+srv://jubi1838:tGPeMsshZVhUlnE5@connect-app.wyxynia.mongodb.net/connect?retryWrites=true&w=majority&appName=connect-app"
    );
    const db = client.db();
    const connectCollection = db.collection("meetup-data");
    const result = await connectCollection.findOneAndUpdate(
      { _id: new ObjectId(data.id) },
      { $set: { comments: data } }
    );
    client.close();
    res.status(201).json({ message: "connect inserted" });
  }
}

export default handler;
