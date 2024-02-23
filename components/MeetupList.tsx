import { MeetupType } from "@/pages";
import MeetupItem from "./MeetupItem";

const MeetupList: React.FC<{ meetups: MeetupType[] }> = ({ meetups }) => {
  return (
    <ul>
      {meetups.map((meetup) => (
        <MeetupItem key={meetup.id} meetup={meetup} />
      ))}
    </ul>
  );
};
export default MeetupList;
