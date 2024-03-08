import { NextApiRequest, NextApiResponse } from "next";
import { MongoClient } from "mongodb";
import { ObjectId } from "mongodb";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const data = req.body;
    const client = await MongoClient.connect(
      "mongodb+srv://jubi1838:tGPeMsshZVhUlnE5@connect-app.wyxynia.mongodb.net/connect?retryWrites=true&w=majority&appName=connect-app"
    );
    const db = client.db();
    const connectCollection = db.collection("meetup-data");
    const result = await connectCollection.findOneAndUpdate(
      { _id: new ObjectId(data.id) },
      {
        $set: {
          title: data.title,
          date: data.date,
          image: data.image,
          description: data.description,
          category: data.category,
          capacity: data.capacity,
        },
      }
    );
    client.close();
    res.status(201).json({ message: "connect inserted" });
  }
}
export default handler;
