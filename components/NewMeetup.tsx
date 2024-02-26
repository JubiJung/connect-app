import { FormEvent, useRef } from "react";
import { useRouter } from "next/router";
import Modal from "./Modal";

const NewMeetup: React.FC<{ onDone: () => void }> = ({ onDone }) => {
  const image = useRef<HTMLInputElement>(null);
  const title = useRef<HTMLInputElement>(null);
  const category = useRef<HTMLInputElement>(null);
  const capacity = useRef<HTMLInputElement>(null);
  const description = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const addMeetupHandler = async (enteredMeetupData: {
    title: string;
    description: string;
    category: string;
    capacity: number;
    image: string;
  }) => {
    const response = await fetch("/api/new-meetup", {
      method: "POST",
      body: JSON.stringify(enteredMeetupData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    router.push("/");
    onDone();
  };
  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    const enteredTitle = title.current!.value;
    const enteredDescription = description.current!.value;
    const enteredCategory = category.current!.value;
    const enteredCapacity = parseInt(capacity.current!.value);
    const inputImage = image.current!.value;
    const meetupData = {
      image: inputImage,
      title: enteredTitle,
      category: enteredCategory,
      capacity: enteredCapacity,
      description: enteredDescription,
    };
    addMeetupHandler(meetupData);
  };

  return (
    <Modal title="어떤 모임을 만들어 볼까요?" onClose={onDone}>
      <form onSubmit={submitHandler}>
        <p>
          <label htmlFor="image">대표 이미지</label>
          <input ref={image} id="image" type="file" />
        </p>
        <p>
          <label htmlFor="title">모임명</label>
          <input ref={title} id="title" type="text" />
        </p>
        <p>
          <label htmlFor="title">카테고리</label>
          <input ref={category} id="category" type="text" />
        </p>
        <p>
          <label htmlFor="capacity">정원</label>
          <input ref={capacity} id="capacity" type="number" />
        </p>
        <p>
          <label htmlFor="description">모임소개</label>
          <input ref={description} id="description" type="text" />
        </p>
        <button onClick={onDone}>취소</button>
        <button type="submit">등록</button>
      </form>
    </Modal>
  );
};
export default NewMeetup;
