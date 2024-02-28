import { useRouter } from "next/router";
import { MongoClient } from "mongodb";
import { GetStaticPropsContext } from "next";
import { ObjectId } from "mongodb";
import { MeetupType } from "@/pages";
import MeetupDetailPage from "@/components/MeetupDetailPage";

const MeetupPage: React.FC<{ meetup: MeetupType }> = (props) => {
  return (
    <>
      <MeetupDetailPage meetup={props.meetup} />
    </>
  );
};

export default MeetupPage;

export async function getStaticPaths() {
  const uri =
    "mongodb+srv://jubi1838:tGPeMsshZVhUlnE5@connect-app.wyxynia.mongodb.net/connect?retryWrites=true&w=majority&appName=connect-app";
  const client = await MongoClient.connect(uri);
  const db = client.db();
  const connectCollection = db.collection("meetup-data");
  const connects = await connectCollection
    .find({}, { projection: { _id: 1 } })
    .toArray();
  client.close();

  return {
    fallback: "blocking",
    paths: connects.map((connect) => ({
      params: { meetupId: connect._id.toString() },
    })),
  };
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const meetup = context.params!.meetupId as string;
  const uri =
    "mongodb+srv://jubi1838:tGPeMsshZVhUlnE5@connect-app.wyxynia.mongodb.net/connect?retryWrites=true&w=majority&appName=connect-app";
  const client = await MongoClient.connect(uri);
  const db = client.db();
  const connectCollection = db.collection("meetup-data");
  const connect = await connectCollection.findOne({
    _id: new ObjectId(meetup),
  });
  const connectData = JSON.parse(JSON.stringify(connect));
  client.close();
  return {
    props: {
      meetup: {
        id: connectData._id.toString(),
        title: connectData.title,
        description: connectData.description,
        capacity: connectData.capacity,
        image: connectData.image,
        category: connectData.category,
        comments: connectData.comments,
      },
    },
  };
}
