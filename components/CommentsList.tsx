import { ChangeEvent, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const CommentsList: React.FC<{
  comment: {
    postId: string;
    commentId: string;
    content: string;
    username: string;
    date: string;
  };
  meetupUsername: string;
}> = ({ comment, meetupUsername }) => {
  const router = useRouter();
  const { data: session } = useSession();
  const [isEdit, setIsEdit] = useState<Boolean>(false);
  const [commentValue, setCommentValue] = useState<string>(comment.content);
  const today = new Date();
  const todayDate = `${today.getFullYear()}/${String(today.getMonth()).padStart(
    2,
    "0"
  )}/${String(today.getDate()).padStart(2, "0")} ${String(
    today.getHours()
  ).padStart(2, "0")}:${String(today.getMinutes()).padStart(2, "0")}`;

  const commentData = {
    postId: comment.postId,
    commentId: comment.commentId,
    content: commentValue,
    username: session?.user?.name,
    date: todayDate,
  };

  const commentValueHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setCommentValue(e.target.value);
  };

  const editHandler = async () => {
    const response = await fetch("/api/edit-comment", {
      method: "POST",
      body: JSON.stringify(commentData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    setIsEdit(false);
  };

  const deleteHandler = async () => {
    const checkRemove = confirm("댓글을 삭제할까요?");
    if (!checkRemove) return;
    const response = await fetch("/api/delete-comment", {
      method: "DELETE",
      body: JSON.stringify(commentData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    router.push(`/meetup/${router.query.meetupId}`);
  };

  return (
    <div className="p-3 border-b bottom-1">
      <div className="inline-block font-semibold">{comment.username}</div>
      {comment.username === meetupUsername && (
        <div className="px-2 mx-2 inline-block rounded-full bg-orange-400 text-white font-semibold text-sm ">
          글쓴이
        </div>
      )}
      {isEdit ? (
        <div>
          <textarea
            className="resize-none w-full rounded-sm focus:outline focus:outline-2 focus:outline-blue-400"
            value={commentValue}
            onChange={commentValueHandler}
          />
          <div className="flex justify-end my-1">
            <button
              className="p-1 border text-sm rounded-md font-semibold text-zinc-600 bg-zinc-100 border-zinc-200 border-solid hover:bg-zinc-200 hover:underline hover:underline-offset-1 hover:decoration-zinc-600"
              onClick={() => {
                setIsEdit(false);
                setCommentValue(comment.content);
              }}
            >
              취소
            </button>
            <button
              disabled={!commentValue && true}
              className="p-1 border ml-3 rounded-md text-sm font-semibold text-blue-600 bg-blue-100 border-blue-200 border-solid hover:bg-blue-200 disabled:text-zinc-400 disabled:bg-blue-200/50"
              onClick={editHandler}
            >
              확인
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="my-2 w-full break-words">{comment.content}</div>
          <div className="text-sm text-gray-500">{comment.date}</div>
        </>
      )}
      {!isEdit && session?.user?.name === comment.username && (
        <div className="my-1 flex justify-end">
          <button
            className="p-1 border rounded-md text-sm font-semibold text-red-600 bg-zinc-100 border-zinc-200 border-solid  hover:bg-zinc-200 hover:underline hover:underline-offset-1 hover:decoration-red-600"
            onClick={deleteHandler}
          >
            삭제
          </button>
          <button
            className="p-1 ml-3 border text-sm rounded-md font-semibold text-zinc-600 bg-zinc-100 border-zinc-200 border-solid hover:bg-zinc-200 hover:underline hover:underline-offset-1 hover:decoration-zinc-600"
            onClick={() => setIsEdit(true)}
          >
            수정
          </button>
        </div>
      )}
    </div>
  );
};
export default CommentsList;
