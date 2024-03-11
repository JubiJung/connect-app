import { FormEvent, useRef, useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Modal from "./Modal";
import CategoryDropDown from "./CategoryDropDown";

const NewMeetup: React.FC<{ onDone: () => void }> = ({ onDone }) => {
  const today = new Date();
  const todayDate = `${today.getFullYear()}/${String(today.getMonth()).padStart(
    2,
    "0"
  )}/${String(today.getDate()).padStart(2, "0")} ${String(
    today.getHours()
  ).padStart(2, "0")}:${String(today.getMinutes()).padStart(2, "0")}`;
  const [selectedCategory, setSelectedCategory] = useState<{
    id: number;
    categoryTitle: string;
  }>({ id: 0, categoryTitle: "전체" });
  const formRef = {
    titleRef: useRef<HTMLInputElement>(null),
    locationRef: useRef<HTMLInputElement>(null),
    imageRef: useRef<HTMLInputElement>(null),
    capacityRef: useRef<HTMLInputElement>(null),
    descriptionRef: useRef<HTMLInputElement>(null),
  };
  const router = useRouter();

  const { data: session } = useSession();

  const selectCategoryHandler = (li: { id: number; categoryTitle: string }) => {
    setSelectedCategory(li);
  };

  const addMeetupHandler = async (enteredMeetupData: {
    title: string;
    description: string;
    category: { id: number; categoryTitle: string };
    capacity: number;
    image: any;
    username: any;
    location: string;
    date: string;
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
    const checkSubmit = confirm("모임을 등록할까요?");
    if (!checkSubmit) return;
    const fileReader = new FileReader();
    const enteredTitle = formRef.titleRef.current!.value;
    const enteredDescription = formRef.descriptionRef.current!.value;
    const enteredLocation = formRef.locationRef.current!.value;
    const enteredCategory = selectedCategory;
    const enteredCapacity = parseInt(formRef.capacityRef.current!.value);
    const inputImage = formRef.imageRef.current!.files![0];
    if (inputImage) {
      fileReader.readAsDataURL(inputImage);
      fileReader.onload = () => {
        const meetupData = {
          image: fileReader.result,
          title: enteredTitle,
          category: enteredCategory,
          capacity: enteredCapacity,
          description: enteredDescription,
          username: session?.user?.name,
          location: enteredLocation,
          date: todayDate,
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
          <input
            ref={formRef.imageRef}
            id="image"
            type="file"
            accept="image/*"
          />
        </p>
        <p>
          <label htmlFor="title">모임명</label>
          <input ref={formRef.titleRef} id="title" type="text" />
        </p>
        <div>
          <span>카테고리</span>
          <CategoryDropDown
            selectedCategory={selectedCategory}
            onSelectCategory={selectCategoryHandler}
          />
        </div>
        <p>
          <label htmlFor="capacity">정원</label>
          <input ref={formRef.capacityRef} id="capacity" type="number" />
        </p>
        <p>
          <label htmlFor="location">위치</label>
          <input ref={formRef.locationRef} id="location" type="text" />
        </p>
        <p>
          <label htmlFor="description">모임소개</label>
          <input ref={formRef.descriptionRef} id="description" type="text" />
        </p>
        <button onClick={onDone}>취소</button>
        <button type="submit">등록</button>
      </form>
    </Modal>
  );
};
export default NewMeetup;
