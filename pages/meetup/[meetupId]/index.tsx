import { ReactElement } from "react";
import { MongoClient, ServerApiVersion } from "mongodb";
import { GetServerSidePropsContext } from "next";
import { ObjectId } from "mongodb";
import { MeetupType } from "@/pages";
import MeetupDetailPage from "@/components/MeetupDetailPage";
import Layout from "@/components/Layout";
import { NextPageWithLayout } from "@/pages/_app";

const MeetupPage: NextPageWithLayout<{ meetup: MeetupType }> = (props) => {
  return (
    <>
      <MeetupDetailPage meetup={props.meetup} />
    </>
  );
};

export default MeetupPage;

MeetupPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

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
        comments: connect?.comments || [],
        username: connect?.username,
        date: connect?.date,
        location: connect?.location,
        applied: connect?.applied || [],
      },
    },
  };
}
