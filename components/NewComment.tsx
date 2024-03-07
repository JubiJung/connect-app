import { v4 as uuid } from "uuid";
import { MeetupType } from "@/pages";
import { ChangeEvent, useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import CommentsList from "./CommentsList";

const NewComment: React.FC<{ meetup: MeetupType }> = ({ meetup }) => {
  const router = useRouter();
  const commentId = uuid();
  const { data: session } = useSession();
  const [commentValue, setCommentValue] = useState<string>("");
  const today = new Date();
  const commentDate = `${today.getFullYear()}/${today.getMonth()}/${today.getDate()} ${today.getHours()}:${today.getMinutes()}`;
  const commentValueHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setCommentValue(e.target.value);
  };

  const submitHandler = async () => {
    if (!session) {
      alert("로그인 후 이용해 주세요.");
      router.push("/login");
      return;
    }
    const commentData = {
      postId: meetup.id,
      commentId: commentId,
      username: session.user?.name,
      content: commentValue,
      date: commentDate,
    };
    const response = await fetch("/api/new-comment", {
      method: "POST",
      body: JSON.stringify(commentData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    setCommentValue("");
    router.push(`/meetup/${router.query.meetupId}`);
  };

  return (
    <>
      <h2>this is comments List</h2>
      <textarea value={commentValue} onChange={commentValueHandler} />
      <button onClick={submitHandler}>등록</button>
      {/* 자기가 작성한 글만 수정, 삭제 가능 */}
      {meetup.comments.map((comment, i) => (
        <CommentsList key={i} comment={comment} />
      ))}
    </>
  );
};
export default NewComment;