import { useRouter } from "next/router";
import Image from "next/image";
import { MeetupType } from "@/pages";

const MeetupItem: React.FC<{ meetup: MeetupType }> = ({ meetup }) => {
  const router = useRouter();

  const showDetailHandler = () => {
    router.push(`/meetup/${meetup.id}`);
  };
  return (
    <li className="flex mb-1" onClick={showDetailHandler} key={meetup.id}>
      <Image width="72" height="72" alt="img" src={meetup.image} />
      <div className="flex flex-col align-middle my-auto">
        <div>{meetup.title}</div>
        <div>
          <span>{meetup.location}</span>
          <span>{meetup.capacity}</span>
          <span>{meetup.category.categoryTitle}</span>
        </div>
      </div>
    </li>
  );
};
export default MeetupItem;
