import Image from "next/image";
import { MeetupType } from "@/pages";
import locationIcon from "@/public/image/location_icon.png";
import userIcon from "@/public/image/user_icon.png";
import dotIcon from "../public/image/dot_icon.png";

const MeetupInform: React.FC<{ meetup: MeetupType }> = ({ meetup }) => {
  return (
    <div className="font-semibold text-sm text-gray-500 flex align-middle">
      <div className="shrink-0">
        {" "}
        <Image
          className="size-4 inline-block"
          alt="icon"
          width={16}
          height={16}
          src={userIcon}
        ></Image>
        <span>
          {meetup.applied.length || 0}/{meetup.capacity}명
        </span>
      </div>
      <Image
        className="my-auto size-2.5"
        width={10}
        height={10}
        alt="icon"
        src={dotIcon}
      ></Image>
      <div className="shrink-0">
        <Image
          className="size-4 inline-block"
          alt="icon"
          width={16}
          height={16}
          src={locationIcon}
        ></Image>
        <span>{meetup.location}</span>
      </div>
      <Image
        className="my-auto size-2.5"
        width={10}
        height={10}
        alt="icon"
        src={dotIcon}
      ></Image>
      <span className="shrink-0">{meetup.category.categoryTitle}</span>
    </div>
  );
};
export default MeetupInform;
