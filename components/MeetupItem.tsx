import { useRouter } from "next/router";
import Image from "next/image";
import { MeetupType } from "@/pages";
import MeetupInform from "./MeetupInform";

const MeetupItem: React.FC<{ meetup: MeetupType }> = ({ meetup }) => {
  const router = useRouter();

  const showDetailHandler = () => {
    router.push(`/meetup/${meetup.id}`);
  };
  return (
    <li
      className="flex mb-4 sm:w-fit cursor-pointer"
      onClick={showDetailHandler}
      key={meetup.id}
    >
      <Image
        width={72}
        height={72}
        className="rounded-xl size-20"
        alt="img"
        src={meetup.image}
      />
      <div className="flex flex-col align-middle my-auto px-3">
        <div className="text-lg font-semibold">{meetup.title}</div>
        <div className="text-sm line-clamp-1">{meetup.description}</div>
        <div className="text-sm text-gray-500 flex">
          <MeetupInform meetup={meetup} />
        </div>
      </div>
    </li>
  );
};
export default MeetupItem;
