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
  const sortedMeetups = sortMeetups(meetups).slice(0, 12);

  return (
    <section className="my-7">
      <div className="text-lg mx-2 my-4 font-semibold">
        지금 인기있는 모임이에요🔥
      </div>
      <ul className="container flex flex-row overflow-x-auto">
        {sortedMeetups.map((sortedMeetup) => (
          <li
            className="mx-2 w-16 shrink-0"
            onClick={() => router.push(`/meetup/${sortedMeetup.id}`)}
            key={sortedMeetup.id}
          >
            <Image
              className="size-16 rounded-xl"
              alt="image"
              width={64}
              height={64}
              src={sortedMeetup.image}
            />
            <div className="py-1 text-sm text-center line-clamp-2">
              {sortedMeetup.title}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};
export default RankedMeetup;
