import Image from "next/image";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { MeetupType } from "@/pages";
import NewComment from "./NewComment";
import MeetupInform from "./MeetupInform";

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

  const joinMeetupHandler = async () => {
    const res = confirm("이 모임에 가입할까요?");
    if (session && res) {
      const applyData = {
        id: meetup.id,
        applied: session?.user,
      };
      const response = await fetch("/api/join-meetup", {
        method: "POST",
        body: JSON.stringify(applyData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();
      router.push(`/meetup/${router.query.meetupId}`);
      alert("모임에 가입 되었습니다.");
    } else if (!session && res) {
      alert("로그인 후 이용해 주세요.");
      router.push(`/login`);
      return;
    }
  };
  return (
    <>
      <section className="m-5 h-3/5">
        <div className="mx-auto my-4 flex">
          <Image
            className="size-32 rounded-xl"
            alt="img"
            src={meetup.image}
            width={128}
            height={128}
          />
          <div className="px-3 my-auto">
            <div className="font-semibold text-gray-600">{meetup.date}</div>
            <div className="font-extrabold text-2xl">{meetup.title}</div>
            <div className="font-semibold text-sm text-gray-500">
              {meetup.username}님
            </div>
            <MeetupInform meetup={meetup} />
          </div>
        </div>
        <div>{meetup.description}</div>
      </section>
      <div className="flex justify-between m-5 h-10">
        {meetup.username === session?.user?.name && (
          <div className="my-auto">
            <button
              className="mx-2 w-16 sm:w-20 border rounded-md font-semibold text-red-600 bg-zinc-100 border-zinc-200 border-solid  hover:bg-zinc-200 hover:underline hover:underline-offset-1 hover:decoration-red-600"
              onClick={deleteHandler}
            >
              삭제
            </button>
            <button
              className="mx-2 w-16 sm:w-20 border rounded-md font-semibold text-zinc-600 bg-zinc-100 border-zinc-200 border-solid hover:bg-zinc-200 hover:underline hover:underline-offset-1 hover:decoration-zinc-600"
              onClick={() =>
                router.push(`/updatemeetup/${router.query.meetupId}`)
              }
            >
              수정
            </button>
          </div>
        )}
        <button
          disabled={meetup.applied.length === meetup.capacity && true}
          className="w-40 sm:w-52 ml-auto border rounded-md text-lg font-semibold text-blue-600 bg-blue-100 border-blue-200 border-solid hover:bg-blue-200 disabled:text-zinc-400 disabled:bg-blue-200/50"
          onClick={joinMeetupHandler}
        >
          {meetup.applied.length === meetup.capacity
            ? "마감 되었습니다."
            : "가입하기"}
        </button>
      </div>
      <NewComment meetup={meetup} />
    </>
  );
};
export default MeetupDetailPage;
