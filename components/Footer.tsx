import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { AnimatePresence } from "framer-motion";
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
      <AnimatePresence>
        {isCreateNewMeetup && <NewMeetup onDone={doneHandler} />}
      </AnimatePresence>
      <div className="fixed bottom-12 right-7 md:right-14 lg:right-40 xl:right-72">
        <div className="text-sm px-1 mb-2 font-bold bg-white border rounded-full border-[#4a90dc]">
          나만의 모임 만들기!
        </div>
        <Image
          className="mx-auto cursor-pointer"
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
