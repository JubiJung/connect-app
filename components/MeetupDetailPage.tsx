import { MeetupType } from "@/pages";
import NewComment from "./NewComment";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import EditMeetup from "./EditMeetup";

const MeetupDetailPage: React.FC<{ meetup: MeetupType }> = ({ meetup }) => {
  const { data: session } = useSession();
  const router = useRouter();
  const [isEdit, setIsEdit] = useState(false);
  const deleteHandler = async () => {
    alert("글을 삭제할까요?");
    const response = await fetch("/api/delete-meetup", {
      method: "DELETE",
      body: JSON.stringify(meetup),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    router.push("/");
    alert("삭제 되었습니다.");
  };
  const cancelHandler = () => {
    setIsEdit(false);
  };
  return (
    <>
      <section>
        {isEdit ? (
          <EditMeetup meetup={meetup} onEdit={cancelHandler} />
        ) : (
          <>
            <div>
              <Image alt="img" src={meetup.image} width="64" height="64" />
            </div>
            <div>{meetup.title}</div>
            <div>{meetup.category.categoryTitle}</div>
            <div>{meetup.capacity}명</div>
            <div>작성자 : {meetup.username}</div>
            <div></div>
            <div>{meetup.description}</div>
            {meetup.username === session?.user?.name && (
              <button onClick={() => setIsEdit(true)}>수정</button>
            )}
            {meetup.username === session?.user?.name && (
              <button onClick={deleteHandler}>삭제</button>
            )}{" "}
          </>
        )}
      </section>
      <NewComment meetup={meetup} />
    </>
  );
};
export default MeetupDetailPage;
