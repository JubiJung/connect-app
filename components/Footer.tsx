import { useState } from "react";
import NewMeetup from "./NewMeetup";

const Footer: React.FC = () => {
  const [isCreateNewMeetup, setIsCreateNewMeetup] = useState(false);
  const addMeetupHandler = () => {
    setIsCreateNewMeetup(true);
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
