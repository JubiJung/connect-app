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
}> = ({ comment }) => {
  const router = useRouter();
  const { data: session } = useSession();
  const [isEdit, setIsEdit] = useState<Boolean>(false);
  const [commentValue, setCommentValue] = useState<string>(comment.content);
  const today = new Date();
  const todayDate = `${today.getFullYear()}/${today.getMonth()}/${today.getDate()} ${today.getHours()}:${today.getMinutes()}`;

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

  let commentArea = (
    <>
      {/* 시간에 0 나오게 */}
      <span>{comment.date}</span>
      <span>{comment.content}</span>
    </>
  );

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
    <div>
      <span>{comment.username}</span>
      {isEdit ? (
        <>
          <textarea value={commentValue} onChange={commentValueHandler} />
          <button onClick={() => setIsEdit(false)}>취소</button>
          <button onClick={editHandler}>확인</button>
        </>
      ) : (
        commentArea
      )}
      {!isEdit && session?.user?.name === comment.username && (
        <>
          <button onClick={() => setIsEdit(true)}>수정</button>
          <button onClick={deleteHandler}>삭제</button>
        </>
      )}
    </div>
  );
};
export default CommentsList;
{
}
