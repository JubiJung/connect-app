import MeetupList from "./MeetupList";
import { MeetupType } from "@/pages";
import RankedMeetup from "./RankedMeetup";

const MainPage: React.FC<{ meetups: MeetupType[] }> = ({ meetups }) => {
  return (
    <>
      <RankedMeetup meetups={meetups} />
      <MeetupList meetups={meetups} />
    </>
  );
};
export default MainPage;
