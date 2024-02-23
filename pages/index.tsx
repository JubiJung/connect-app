import React from "react";
import MainPage from "@/components/MainPage";
import { MongoClient, ServerApiVersion } from "mongodb";
import Footer from "@/components/Footer";

export type MeetupType = {
  image: string;
  title: string;
  location: string;
  id: number;
  category: string;
  description: string;
  comment: string;
  person: number;
};

const DUMMY_DATA = [
  {
    image:
      "https://cdn.pixabay.com/photo/2018/05/18/13/18/mahjong-3411181_1280.jpg",
    title: "같이 마작 치실분",
    location: "신가동",
    id: 0,
    category: "보드게임",
    description: "같이 마작 하실 분 구합니다.",
    comment: "저욧!!",
    person: 3,
  },
  {
    image:
      "https://cdn.pixabay.com/photo/2016/11/19/13/57/drum-set-1839383_1280.jpg",
    title: "같이 밴드 하실분",
    location: "수완동",
    id: 1,
    category: "악기",
    description: "밴드 하실 분 구합니다. 현재 드럼 필요.",
    comment: "기타는 구하셨나요?",
    person: 5,
  },
  {
    image:
      "https://cdn.pixabay.com/photo/2017/07/31/11/21/people-2557396_1280.jpg",
    title: "같이 공부하실 분",
    location: "운남동",
    id: 2,
    category: "스터디",
    description: "같이 공부하실 분 구합니다.",
    comment: "혹시 몇요일마다 모이나요?",
    person: 7,
  },
  {
    image:
      "https://cdn.pixabay.com/photo/2016/02/16/21/07/books-1204029_1280.jpg",
    title: "같이 책 읽으실 분 구합니다.",
    location: "흑석동",
    id: 3,
    category: "독서",
    description: "같이 책 읽으실분. 장르 상관없습니다.",
    comment: "나이 제한은 없나요?",
    person: 6,
  },
];

const HomePage: React.FC<{ meetups: MeetupType[] }> = (props) => {
  return (
    <>
      <h1>This is Home Page</h1>
      <MainPage meetups={props.meetups}></MainPage>
      <Footer />
    </>
  );
};
export default HomePage;

export async function getStaticProps() {
  //   const password = "tGPeMsshZVhUlnE5";
  //   const uri = `mongodb+srv://jubi1838:${password}@connect-app.wyxynia.mongodb.net/?retryWrites=true&w=majority&appName=connect-app`;
  //   const client = new MongoClient(uri, {
  //     serverApi: {
  //       version: ServerApiVersion.v1,
  //       strict: true,
  //       deprecationErrors: true,
  //     },
  //   });
  //     const db = client.db()
  //     const connectCollection = db.collection("connect-app");
  //     const connects = await connectCollection.find().toArray();
  //     client.close()
  return {
    props: {
      meetups: DUMMY_DATA,
    },
  };
}
