import Image from "next/image";
import { MeetupType } from "@/pages";
import locationIcon from "@/public/image/location_icon.png";
import userIcon from "@/public/image/user_icon.png";

const MeetupInform: React.FC<{ meetup: MeetupType }> = ({ meetup }) => {
  return (
    <div className="font-semibold text-sm text-gray-500 flex align-middle">
      <div className="mr-1 shrink-0">
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
      ꞏ
      <div className="mr-1 shrink-0">
        <Image
          className="size-4 inline-block"
          alt="icon"
          width={16}
          height={16}
          src={locationIcon}
        ></Image>
        <span>{meetup.location}</span>
      </div>
      ꞏ<span className="mx-1 shrink-0">{meetup.category.categoryTitle}</span>
    </div>
  );
};
export default MeetupInform;
