import React, { SetStateAction } from "react";
import MainPage from "@/components/MainPage";
import { MongoClient, ServerApiVersion } from "mongodb";
import Footer from "@/components/Footer";
import dotenv from "dotenv";

dotenv.config();

export type MeetupType = {
  username: string;
  date: string;
  image: string;
  title: string;
  location: string;
  id: string;
  category: { id: number; categoryTitle: string };
  description: string;
  comments: [
    {
      postId: string;
      commentId: string;
      username: string;
      content: string;
      date: string;
    }
  ];
  capacity: number;
};

const HomePage: React.FC<{ meetups: MeetupType[] }> = (props) => {
  return (
    <>
      <MainPage meetups={props.meetups}></MainPage>
      <Footer />
    </>
  );
};
export default HomePage;

export async function getServerSideProps() {
  const uri =
    "mongodb+srv://jubi1838:tGPeMsshZVhUlnE5@connect-app.wyxynia.mongodb.net/connect?retryWrites=true&w=majority&appName=connect-app";
  const client = await MongoClient.connect(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });
  const db = client.db();
  const connectCollection = db.collection("meetup-data");
  const connects = await connectCollection.find().toArray();
  client.close();
  return {
    props: {
      meetups: connects.map((data) => ({
        image: data.image,
        title: data.title,
        id: data._id.toString(),
        category: data.category,
        description: data.description,
        capacity: data.capacity,
        username: data.username,
        location: data.location,
        date: data.date,
      })),
    },
  };
}
