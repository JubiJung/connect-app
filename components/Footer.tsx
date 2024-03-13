import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Image from "next/image";
import NewMeetup from "./NewMeetup";
import addIcon from "@/public/image/add_icon.png";

const Footer: React.FC = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [isCreateNewMeetup, setIsCreateNewMeetup] = useState(false);

  const addMeetupHandler = () => {
    if (session) {
      setIsCreateNewMeetup(true);
      return;
    }
    alert("로그인 후 이용해 주세요.");
    router.push("/login");
  };

  const doneHandler = () => {
    setIsCreateNewMeetup(false);
  };

  return (
    <>
      {isCreateNewMeetup && <NewMeetup onDone={doneHandler} />}
      <div className="fixed bottom-12 right-7 lg:right-72">
        <div className="text-sm mb-2">나만의 모임 만들기!</div>
        <Image
          className="mx-auto"
          src={addIcon}
          width={64}
          height={64}
          alt="addIcon"
          onClick={addMeetupHandler}
        ></Image>
      </div>
    </>
  );
};
export default Footer;
