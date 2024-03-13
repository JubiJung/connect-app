import { useRouter } from "next/router";
import Image from "next/image";
import { MeetupType } from "@/pages";
import locationIcon from "@/public/image/location_icon.png";
import userIcon from "@/public/image/user_icon.png";

const MeetupItem: React.FC<{ meetup: MeetupType }> = ({ meetup }) => {
  const router = useRouter();

  const showDetailHandler = () => {
    router.push(`/meetup/${meetup.id}`);
  };
  return (
    <li className="flex mb-4" onClick={showDetailHandler} key={meetup.id}>
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
        <div className="text-sm text-gray-500">
          <span className="mr-2">
            <Image
              className="inline-block"
              src={locationIcon}
              width={16}
              height={16}
              alt="locationIcon"
            />
            {meetup.location}
          </span>
          <span className="mr-2">
            <Image
              className="inline-block"
              src={userIcon}
              width={16}
              height={16}
              alt="locationIcon"
            />
            {meetup.applied.length || 0}/{meetup.capacity}
          </span>
          <span>{meetup.category.categoryTitle}</span>
        </div>
      </div>
    </li>
  );
};
export default MeetupItem;
