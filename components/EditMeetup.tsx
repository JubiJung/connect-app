import { FormEvent, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Image from "next/image";
import { MeetupType } from "@/pages";
import CategoryDropDown from "./CategoryDropDown";

const EditMeetup: React.FC<{
  meetup: MeetupType;
}> = ({ meetup }) => {
  const [selectedCategory, setSelectedCategory] = useState<{
    id: number;
    categoryTitle: string;
  }>(meetup.category);
  const router = useRouter();
  const { data: session } = useSession();
  const formRef = {
    titleRef: useRef<HTMLInputElement>(null),
    locationRef: useRef<HTMLInputElement>(null),
    imageRef: useRef<HTMLInputElement>(null),
    capacityRef: useRef<HTMLInputElement>(null),
    descriptionRef: useRef<HTMLInputElement>(null),
  };
  const [imgPreview, setImgPreview] = useState<any>(meetup.image);
  const today = new Date();
  const todayDate = `${today.getFullYear()}/${String(today.getMonth()).padStart(
    2,
    "0"
  )}/${String(today.getDate()).padStart(2, "0")} ${String(
    today.getHours()
  ).padStart(2, "0")}:${String(today.getMinutes()).padStart(2, "0")}`;
  const selectCategoryHandler = (li: { id: number; categoryTitle: string }) => {
    setSelectedCategory(li);
  };

  const imgPreviewHandler = () => {
    const fileReader = new FileReader();
    const inputImage = formRef.imageRef.current!.files![0];
    if (inputImage) {
      fileReader.readAsDataURL(inputImage);
      fileReader.onload = () => {
        setImgPreview(fileReader.result);
      };
    }
  };

  const addMeetupHandler = async (enteredMeetupData: {
    title: string;
    description: string;
    category: { id: number; categoryTitle: string };
    capacity: number;
    image: any;
    username: any;
  }) => {
    const response = await fetch("/api/edit-meetup", {
      method: "POST",
      body: JSON.stringify(enteredMeetupData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    router.push(`/meetup/${router.query.meetupId}`);
  };

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    const checkSubmit = confirm("모임을 등록할까요?");
    if (!checkSubmit) return;
    const fileReader = new FileReader();
    const inputImage = formRef.imageRef.current!.files![0];
    const enteredTitle = formRef.titleRef.current!.value;
    const enteredDescription = formRef.descriptionRef.current!.value;
    const enteredCategory = selectedCategory;
    const enteredCapacity = parseInt(formRef.capacityRef.current!.value);
    fileReader.readAsDataURL(inputImage);
    fileReader.onload = () => {
      const meetupData = {
        id: meetup.id,
        comments: meetup.comments,
        date: todayDate,
        image: fileReader.result,
        title: enteredTitle,
        category: enteredCategory,
        capacity: enteredCapacity,
        description: enteredDescription,
        username: session?.user?.name,
      };
      addMeetupHandler(meetupData);
    };
  };
  return (
    <form onSubmit={submitHandler}>
      <p>
        <label htmlFor="image">대표 이미지</label>
        <Image src={imgPreview} alt="image" width="64" height="64"></Image>
        <input
          ref={formRef.imageRef}
          onChange={imgPreviewHandler}
          id="image"
          type="file"
          accept="image/*"
        />
      </p>
      <p>
        <label htmlFor="title">모임명</label>
        <input
          defaultValue={meetup.title}
          ref={formRef.titleRef}
          id="title"
          type="text"
        />
      </p>
      <div>
        <span>카테고리</span>
        <CategoryDropDown
          selectedCategory={selectedCategory}
          onSelectCategory={selectCategoryHandler}
        />
      </div>
      <p>
        <label htmlFor="location">위치</label>
        <input
          defaultValue={meetup.location}
          ref={formRef.locationRef}
          id="location"
          type="text"
        />
      </p>
      <p>
        <label htmlFor="capacity">정원</label>
        <input
          defaultValue={meetup.capacity}
          ref={formRef.capacityRef}
          id="capacity"
          type="number"
        />
      </p>
      <p>
        <label htmlFor="description">모임소개</label>
        <input
          defaultValue={meetup.description}
          ref={formRef.descriptionRef}
          id="description"
          type="text"
        />
      </p>
      <button
        type="button"
        onClick={() => router.push(`/meetup/${router.query.meetupId}`)}
      >
        취소
      </button>
      <button type="submit">등록</button>
    </form>
  );
};
export default EditMeetup;
