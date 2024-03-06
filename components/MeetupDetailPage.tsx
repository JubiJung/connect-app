import { MeetupType } from "@/pages";
import CommentsList from "./CommentsList";
import Image from "next/image";
import { useSession } from "next-auth/react";

const MeetupDetailPage: React.FC<{ meetup: MeetupType }> = ({ meetup }) => {
  const { data: session } = useSession();
  return (
    <>
      <section>
        <div>
          <Image alt="img" src={meetup.image} width="64" height="64" />
        </div>
        <div>{meetup.title}</div>
        <div>{meetup.category.categoryTitle}</div>
        <div>{meetup.capacity}명</div>
        <div>작성자 : {meetup.username}</div>
        <div></div>
        <div>{meetup.description}</div>
        {meetup.username === session?.user?.name && <button>수정</button>}
        {meetup.username === session?.user?.name && <button>삭제</button>}
      </section>
      <CommentsList meetup={meetup} />
    </>
  );
};
export default MeetupDetailPage;
