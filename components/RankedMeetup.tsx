import { useRouter } from "next/router";
import { MeetupType } from "@/pages";
import Image from "next/image";

const RankedMeetup: React.FC<{ meetups: MeetupType[] }> = ({ meetups }) => {
  const router = useRouter();
  const sortMeetups = (meetups: MeetupType[]) => {
    const sortedMeetup = [...meetups].sort((a, b) => {
      const commentsLengthA = a.comments.length;
      const commentsLengthB = b.comments.length;
      return commentsLengthB - commentsLengthA;
    });
    return sortedMeetup;
  };
  const sortedMeetups = sortMeetups(meetups);

  return (
    <>
      <h1>지금 인기있는 모임이에요🔥</h1>
      <div className="flex">
        {sortedMeetups.map((sortedMeetup) => (
          <div
            onClick={() => router.push(`/meetup/${sortedMeetup.id}`)}
            key={sortedMeetup.id}
          >
            <Image
              alt="image"
              width="64"
              height="64"
              src={sortedMeetup.image}
            ></Image>
            <div>{sortedMeetup.title}</div>
          </div>
        ))}
      </div>
    </>
  );
};
export default RankedMeetup;
