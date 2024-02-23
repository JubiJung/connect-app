import MeetupList from "./MeetupList";
import { MeetupType } from "@/pages";

const MainPage: React.FC<{ meetups: MeetupType[] }> = (props) => {
  return <MeetupList meetups={props.meetups}></MeetupList>;
};
export default MainPage;
