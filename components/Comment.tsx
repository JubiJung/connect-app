import { useSession } from "next-auth/react";
import { ChangeEvent, useState } from "react";
import { useRouter } from "next/router";

const Comment: React.FC<{
  comment: {
    id: string;
    content: string;
    username: string;
    date: string;
  };
}> = ({ comment }) => {
  const { data: session } = useSession();
  const [isEdit, setIsEdit] = useState(false);
  const [commentValue, setCommentValue] = useState<string>("");
  const router = useRouter();

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
      id: comment.id,
      content: commentValue,
      username: session?.user?.name,
      date: comment.date,
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

  return (
    <div>
      <span>{comment.username}</span>
      {isEdit ? (
        <>
          <textarea
            value={commentValue}
            onChange={commentValueHandler}
            defaultValue={comment.content}
          />
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
        <button>삭제</button>
      )}
    </div>
  );
};
export default Comment;
{
}
