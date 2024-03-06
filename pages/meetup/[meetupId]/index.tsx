import { useRouter } from "next/router";
import { MongoClient, ServerApiVersion } from "mongodb";
import { GetServerSidePropsContext } from "next";
import { ObjectId } from "mongodb";
import { MeetupType } from "@/pages";
import MeetupDetailPage from "@/components/MeetupDetailPage";

const MeetupPage: React.FC<{ meetup: MeetupType }> = (props) => {
  console.log(props);
  return (
    <>
      <MeetupDetailPage meetup={props.meetup} />
    </>
  );
};

export default MeetupPage;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const meetup = context.params!.meetupId as string;
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
  const connect = await connectCollection.findOne({
    _id: new ObjectId(meetup),
  });
  const connectData = JSON.parse(JSON.stringify(connect));
  const comments = connect?.comments || [];
  client.close();
  return {
    props: {
      meetup: {
        id: connect?._id.toString(),
        title: connect?.title,
        description: connect?.description,
        capacity: connect?.capacity,
        image: connect?.image,
        category: connect?.category,
        comments: comments,
        username: connect?.username,
      },
    },
  };
}
