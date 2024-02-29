import { MeetupType } from "@/pages";
import { ChangeEvent, useState } from "react";
import { useRouter } from "next/router";

const CommentsList: React.FC<{ meetup: MeetupType }> = ({ meetup }) => {
  const router = useRouter();
  const [commentValue, setCommentValue] = useState<string>("");
  const commentValueHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setCommentValue(e.target.value);
  };

  const submitHandler = async () => {
    const commentData = {
      id: meetup.id,
      // user:,
      content: commentValue,
      date: new Date(),
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
        <div key={i}>{comment.content}</div>
      ))}
    </>
  );
};
export default CommentsList;
