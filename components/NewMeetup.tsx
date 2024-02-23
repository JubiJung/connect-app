import { FormEvent, useRef } from "react";
import { useRouter } from "next/router";
import Modal from "./Modal";

const NewMeetup: React.FC<{ onDone: () => void }> = ({ onDone }) => {
  const title = useRef<HTMLInputElement>(null);
  const description = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const addMeetupHandler = async (enteredMeetupData: {
    title: string;
    description: string;
  }) => {
    const response = await fetch("/api/new-meetup", {
      method: "POST",
      body: JSON.stringify(enteredMeetupData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
    router.push("/");
    onDone();
  };
  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    const enteredTitle = title.current!.value;
    const enteredDescription = description.current!.value;
    const meetupData = {
      title: enteredTitle,
      description: enteredDescription,
    };
    addMeetupHandler(meetupData);
  };

  return (
    <Modal title="어떤 모임을 만들어 볼까요?" onClose={onDone}>
      <form onSubmit={submitHandler}>
        <p>
          <label htmlFor="title">모임명</label>
          <input ref={title} id="title" type="text" />
        </p>
        <p>
          <label htmlFor="description">모임소개</label>
          <input ref={description} id="description" type="text" />
        </p>
        <button>취소</button>
        <button>등록</button>
      </form>
    </Modal>
  );
};
export default NewMeetup;
