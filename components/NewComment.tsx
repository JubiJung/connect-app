import { ChangeEvent, useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { v4 as uuid } from "uuid";
import { MeetupType } from "@/pages";
import CommentsList from "./CommentsList";

const NewComment: React.FC<{ meetup: MeetupType }> = ({ meetup }) => {
  const router = useRouter();
  const commentId = uuid();
  const { data: session } = useSession();
  const [commentValue, setCommentValue] = useState<string>("");
  const today = new Date();
  const commentDate = `${today.getFullYear()}/${String(
    today.getMonth()
  ).padStart(2, "0")}/${String(today.getDate()).padStart(2, "0")} ${String(
    today.getHours()
  ).padStart(2, "0")}:${String(today.getMinutes()).padStart(2, "0")}`;
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
      <div className="m-5 p-3 border border-solid border-zinc-300">
        <div className="inline-block font-semibold text-md">
          {session?.user?.name}
        </div>
        {session?.user?.name === meetup.username && (
          <div className="px-2 mx-2 inline-block rounded-full bg-orange-400 text-white font-semibold text-sm">
            글쓴이
          </div>
        )}
        <textarea
          className="w-full resize-none rounded-sm focus:outline focus:outline-2 focus:outline-blue-400"
          value={commentValue}
          onChange={commentValueHandler}
        />
        <button
          disabled={!commentValue && true}
          className="block ml-auto p-1 border rounded-md text-sm font-semibold text-blue-600 bg-blue-100 border-blue-200 border-solid hover:bg-blue-200 disabled:text-zinc-400 disabled:bg-blue-200/50"
          onClick={submitHandler}
        >
          등록
        </button>
      </div>
      {meetup.comments.map((comment, i) => (
        <CommentsList
          key={i}
          comment={comment}
          meetupUsername={meetup.username}
        />
      ))}
    </>
  );
};
export default NewComment;
