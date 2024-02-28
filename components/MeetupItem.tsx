import { useRouter } from "next/router";
import Image from "next/image";
import { MeetupType } from "@/pages";

const MeetupItem: React.FC<{ meetup: MeetupType }> = ({ meetup }) => {
  const router = useRouter();
  const showDetailHandler = () => {
    router.push(`/meetup/${meetup.id}`);
  };
  return (
    <li onClick={showDetailHandler} key={meetup.id}>
      <Image width="72" height="72" alt="img" src={meetup.image} />
      <div>{meetup.title}</div>
      <div>
        <span>위치</span>
        <span>{meetup.capacity}</span>
        <span>{meetup.category}</span>
      </div>
    </li>
  );
};
export default MeetupItem;
