import { FormEvent, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Image from "next/image";
import { MeetupType } from "@/pages";
import CategoryDropDown from "./CategoryDropDown";
import { motion } from "framer-motion";

const EditMeetup: React.FC<{
  meetup: MeetupType;
}> = ({ meetup }) => {
  const [selectedCategory, setSelectedCategory] = useState<{
    id: number;
    categoryTitle: string;
  }>(meetup.category);
  const today = new Date();
  const router = useRouter();
  const { data: session } = useSession();
  const [imgValue, setImgValue] = useState<string>(meetup.image);
  const formRef = {
    titleRef: useRef<HTMLInputElement>(null),
    locationRef: useRef<HTMLInputElement>(null),
    imageRef: useRef<HTMLInputElement>(null),
    capacityRef: useRef<HTMLInputElement>(null),
    descriptionRef: useRef<HTMLTextAreaElement>(null),
  };
  const todayDate = `${today.getFullYear()}/${String(today.getMonth()).padStart(
    2,
    "0"
  )}/${String(today.getDate()).padStart(2, "0")} ${String(
    today.getHours()
  ).padStart(2, "0")}:${String(today.getMinutes()).padStart(2, "0")}`;
  const selectCategoryHandler = (li: { id: number; categoryTitle: string }) => {
    setSelectedCategory(li);
  };

  const imgValueHandler = () => {
    const fileReader = new FileReader();
    const inputImage = formRef.imageRef.current!.files![0];
    if (inputImage) {
      fileReader.readAsDataURL(inputImage);
      fileReader.onload = () => {
        setImgValue(fileReader.result as string);
      };
    }
  };

  const addMeetupHandler = async (enteredMeetupData: {
    title: string;
    description: string;
    category: { id: number; categoryTitle: string };
    capacity: number;
    location: string;
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
    const enteredTitle = formRef.titleRef.current!.value;
    const enteredDescription = formRef.descriptionRef.current!.value;
    const enteredCategory = selectedCategory;
    const enteredCapacity = parseInt(formRef.capacityRef.current!.value);
    const enteredLocation = formRef.locationRef.current!.value;
    const meetupData = {
      id: meetup.id,
      comments: meetup.comments,
      date: todayDate,
      image: imgValue,
      title: enteredTitle,
      category: enteredCategory,
      capacity: enteredCapacity,
      description: enteredDescription,
      username: session?.user?.name,
      location: enteredLocation,
    };
    addMeetupHandler(meetupData);
  };

  return (
    <form onSubmit={submitHandler} className="m-5 h-3/5">
      <div className="py-1">
        <label className="font-semibold" htmlFor="image">
          <div className="mx-auto text-center">대표 이미지</div>
          <Image
            className="mx-auto size-24 rounded-full"
            width={96}
            height={96}
            src={imgValue}
            alt="image"
          ></Image>
          <motion.input
            className="hidden"
            ref={formRef.imageRef}
            onChange={imgValueHandler}
            id="image"
            type="file"
            accept="image/*"
          />
        </label>
      </div>
      <div className="py-1">
        <label className="font-semibold" htmlFor="title">
          모임명
        </label>
        <motion.input
          whileFocus={{ y: [0, -1.5], transition: { duration: 0.2 } }}
          className="block my-1 border-solid border border-zinc-400 focus:outline-none focus:border-blue-400 rounded-md"
          defaultValue={meetup.title}
          ref={formRef.titleRef}
          id="title"
          type="text"
          required
        />
      </div>
      <div className="py-1 max-w-md">
        <span className="font-semibold mr-1">카테고리</span>
        <CategoryDropDown
          selectedCategory={selectedCategory}
          onSelectCategory={selectCategoryHandler}
        />
      </div>
      <div className="py-1">
        <label className="font-semibold" htmlFor="capacity">
          정원
        </label>
        <motion.input
          whileFocus={{ y: [0, -1.5], transition: { duration: 0.2 } }}
          className="block my-1 border-solid border border-zinc-400 focus:outline-none focus:border-blue-400 rounded-md"
          defaultValue={meetup.capacity}
          ref={formRef.capacityRef}
          id="capacity"
          type="number"
          min={0}
          required
        />
      </div>
      <div className="py-1">
        <label className="font-semibold" htmlFor="location">
          위치
        </label>
        <motion.input
          whileFocus={{ y: [0, -1.5], transition: { duration: 0.2 } }}
          className="block my-1 border-solid border border-zinc-400 focus:outline-none focus:border-blue-400 rounded-md"
          defaultValue={meetup.location}
          ref={formRef.locationRef}
          id="location"
          type="text"
        />
      </div>
      <div className="py-1">
        <label className="font-semibold" htmlFor="description">
          모임소개
        </label>
        <motion.textarea
          whileFocus={{ y: [0, -1.5], transition: { duration: 0.2 } }}
          className="block my-1 border-solid border border-zinc-400 focus:outline-none focus:border-blue-400 rounded-md w-2/3 resize-none"
          defaultValue={meetup.description}
          ref={formRef.descriptionRef}
          id="description"
          required
        />
      </div>
      <div className="text-right my-1">
        <motion.button
          whileHover={{ y: [0, -3], transition: { duration: 0.3 } }}
          className="px-2 mx-1 border rounded-md font-semibold text-zinc-600 bg-zinc-100 border-zinc-200 border-solid hover:bg-zinc-200"
          type="button"
          onClick={() => router.push(`/meetup/${router.query.meetupId}`)}
        >
          취소
        </motion.button>
        <motion.button
          whileHover={{ y: [0, -3], transition: { duration: 0.3 } }}
          className="px-2 mx-1 border rounded-md font-semibold text-blue-600 bg-blue-100 border-blue-200 border-solid hover:bg-blue-200"
          type="submit"
        >
          등록
        </motion.button>
      </div>
    </form>
  );
};
export default EditMeetup;
