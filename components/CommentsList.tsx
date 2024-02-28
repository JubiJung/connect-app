import { MeetupType, getStaticProps } from "@/pages";
import { EventType } from "next-auth";
import { ChangeEvent, useState } from "react";

const CommentsList: React.FC<{ meetup: MeetupType }> = ({ meetup }) => {
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
  };

  return (
    <>
      <h2>this is comments List</h2>
      <textarea value={commentValue} onChange={commentValueHandler} />
      <button onClick={submitHandler}>등록</button>
      {meetup.comments && <div>{meetup.comments.content}</div>}
    </>
  );
};
export default CommentsList;
