import { useSession } from "next-auth/react";
import { ChangeEvent, useState } from "react";
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
  const { data: session } = useSession();
  const [isEdit, setIsEdit] = useState(false);
  const [commentValue, setCommentValue] = useState<string>(comment.content);
  const router = useRouter();
  const today = new Date();
  const todayDate = `${today.getFullYear()}/${today.getMonth()}/${today.getDate()} ${today.getHours()}:${today.getMinutes()}`;

  let commentArea = (
    <>
      {/* 시간에 0 나오게 */}
      <span>{comment.date}</span>
      <span>{comment.content}</span>
    </>
  );

  const commentValueHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setCommentValue(e.target.value);
  };

  const editHandler = async () => {
    const commentData = {
      postId: comment.postId,
      commentId: comment.commentId,
      content: commentValue,
      username: session?.user?.name,
      date: todayDate,
    };
    const response = await fetch("/api/edit-comment", {
      method: "POST",
      body: JSON.stringify(commentData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    setIsEdit(false);
    router.push(`/meetup/${router.query.meetupId}`);
  };

  const deleteHandler = async () => {
    const commentData = {
      postId: comment.postId,
      commentId: comment.commentId,
      content: commentValue,
      username: session?.user?.name,
      date: todayDate,
    };
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
        <button onClick={() => setIsEdit(true)}>수정</button>
      )}
      {!isEdit && session?.user?.name === comment.username && (
        <button onClick={deleteHandler}>삭제</button>
      )}
    </div>
  );
};
export default CommentsList;
{
}
