import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { MeetupType } from "@/pages";
import NewComment from "./NewComment";

const MeetupDetailPage: React.FC<{ meetup: MeetupType }> = ({ meetup }) => {
  const { data: session } = useSession();
  const router = useRouter();

  const deleteHandler = async () => {
    const res = confirm("글을 삭제할까요?");
    if (res) {
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
    }
  };
  return (
    <>
      <section>
        <div>
          <Image alt="img" src={meetup.image} width="64" height="64" />
        </div>
        <div>{meetup.title}</div>
        <div>{meetup.category.categoryTitle}</div>
        <div>{meetup.date}</div>
        <div>{meetup.capacity}명</div>
        <div>작성자 : {meetup.username}</div>
        <div>{meetup.location}</div>
        <div>{meetup.description}</div>
        {meetup.username === session?.user?.name && (
          <>
            <button
              onClick={() =>
                router.push(`/updatemeetup/${router.query.meetupId}`)
              }
            >
              수정
            </button>
            <button onClick={deleteHandler}>삭제</button>
          </>
        )}
        <button onClick={() => confirm("이 모임에 가입할까요?")}>
          가입하기
        </button>
      </section>
      <NewComment meetup={meetup} />
    </>
  );
};
export default MeetupDetailPage;
