import { MeetupType } from "@/pages";
import CommentsList from "./CommentsList";
import Image from "next/image";

const MeetupDetailPage: React.FC<{ meetup: MeetupType }> = ({ meetup }) => {
  return (
    <>
      <section>
        <div>
          <Image alt="img" src={meetup.image} width="64" height="64" />
        </div>
        <div>{meetup.title}</div>
        <div>{meetup.category.categoryTitle}</div>
        <div>{meetup.capacity}명</div>
        <div></div>
        <div></div>
        <div>{meetup.description}</div>
      </section>
      <CommentsList meetup={meetup} />
    </>
  );
};
export default MeetupDetailPage;
