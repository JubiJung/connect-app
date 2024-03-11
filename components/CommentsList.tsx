import { ChangeEvent, useState, useEffect } from "react";
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
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const [commentValue, setCommentValue] = useState<string>(comment.content);
  const today = new Date();
  const todayDate = `${today.getFullYear()}/${String(today.getMonth()).padStart(
    2,
    "0"
  )}/${String(today.getDate()).padStart(2, "0")} ${String(
    today.getHours()
  ).padStart(2, "0")}:${String(today.getMinutes()).padStart(2, "0")}`;

  useEffect(() => {
    if (router) {
      router.events.on("routeChangeStart", () => {
        setIsLoading(true);
      });
    }
    return () => {
      router.events.off("routeChangeStart", () => {
        setIsLoading(true);
      });
    };
  }, [router]);

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
      {isLoading && <p>삭제중</p>}
    </div>
  );
};
export default CommentsList;
{
}
