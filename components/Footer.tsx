import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import NewMeetup from "./NewMeetup";

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
      <div>나만의 모임 만들기!</div>
      <div onClick={addMeetupHandler}>➕</div>
    </>
  );
};
export default Footer;
