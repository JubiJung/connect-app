import { FormEvent, useRef } from "react";
import { useRouter } from "next/router";
import Modal from "./Modal";

const NewMeetup: React.FC<{ onDone: () => void }> = ({ onDone }) => {
  const imageRef = useRef<HTMLInputElement>(null);
  const titleRef = useRef<HTMLInputElement>(null);
  const categoryRef = useRef<HTMLInputElement>(null);
  const capacityRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const addMeetupHandler = async (enteredMeetupData: {
    title: string;
    description: string;
    category: string;
    capacity: number;
    image: any;
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
    const fileReader = new FileReader();
    const enteredTitle = titleRef.current!.value;
    const enteredDescription = descriptionRef.current!.value;
    const enteredCategory = categoryRef.current!.value;
    const enteredCapacity = parseInt(capacityRef.current!.value);
    const inputImage = imageRef.current!.files![0];
    if (inputImage) {
      fileReader.readAsDataURL(inputImage);
      fileReader.onload = () => {
        const meetupData = {
          image: fileReader.result,
          title: enteredTitle,
          category: enteredCategory,
          capacity: enteredCapacity,
          description: enteredDescription,
        };
        addMeetupHandler(meetupData);
      };
    }

    // URL.revokeObjectURL(url);
  };

  return (
    <Modal title="어떤 모임을 만들어 볼까요?" onClose={onDone}>
      <form onSubmit={submitHandler}>
        <p>
          <label htmlFor="image">대표 이미지</label>
          <input ref={imageRef} id="image" type="file" accept="image/*" />
        </p>
        <p>
          <label htmlFor="title">모임명</label>
          <input ref={titleRef} id="title" type="text" />
        </p>
        <p>
          <label htmlFor="title">카테고리</label>
          <input ref={categoryRef} id="category" type="text" />
        </p>
        <p>
          <label htmlFor="capacity">정원</label>
          <input ref={capacityRef} id="capacity" type="number" />
        </p>
        <p>
          <label htmlFor="description">모임소개</label>
          <input ref={descriptionRef} id="description" type="text" />
        </p>
        <button onClick={onDone}>취소</button>
        <button type="submit">등록</button>
      </form>
    </Modal>
  );
};
export default NewMeetup;
