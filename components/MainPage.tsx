import MeetupList from "./MeetupList";
import Category from "./Category";
import { MeetupType } from "@/pages";

const MainPage: React.FC<{ meetups: MeetupType[] }> = ({ meetups }) => {
  return <MeetupList meetups={meetups} />;
};
export default MainPage;
