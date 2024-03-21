import { useRouter } from "next/router";
import { MeetupType } from "@/pages";
import Slider from "react-slick";
import Image from "next/image";
import "./slick.css";

function SampleNextArrow(props: any) {
  const { style, onClick } = props;
  return (
    <div
      className="slick-next"
      style={{
        ...style,
        display: "block",
      }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props: any) {
  const { style, onClick } = props;
  return (
    <div
      className="slick-prev"
      style={{ ...style, display: "block" }}
      onClick={onClick}
    />
  );
}

const settings = {
  dots: true,
  infinite: true,
  slidesToShow: 9,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2500,
  pauseOnHover: true,
  nextArrow: <SampleNextArrow />,
  prevArrow: <SamplePrevArrow />,
  appendDots: (dots: any) => (
    <div
      style={{
        width: "100%",
        position: "absolute",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <ul> {dots} </ul>
    </div>
  ),
  dotsClass: "dots_custom",
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 8,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 520,
      settings: {
        slidesToShow: 6,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 430,
      settings: {
        slidesToShow: 5,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 374,
      settings: {
        dots: false,
        slidesToShow: 4,
        slidesToScroll: 1,
      },
    },
  ],
};

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
      <ul className="container">
        <Slider {...settings}>
          {sortedMeetups.map((sortedMeetup) => (
            <li
              className="w-10 m-2"
              onClick={() => router.push(`/meetup/${sortedMeetup.id}`)}
              key={sortedMeetup.id}
            >
              <Image
                className="size-16 rounded-xl cursor-pointer"
                alt="image"
                width={64}
                height={64}
                src={sortedMeetup.image}
              />
              <div className="cursor-pointer w-16 py-1 text-[12px] text-center line-clamp-2">
                {sortedMeetup.title}
              </div>
            </li>
          ))}
        </Slider>
      </ul>
    </section>
  );
};
export default RankedMeetup;
