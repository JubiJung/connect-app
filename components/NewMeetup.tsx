import { FormEvent, useRef, useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import imageCompression from "browser-image-compression";
import Image from "next/image";
import Modal from "./Modal";
import CategoryDropDown from "./CategoryDropDown";
import addImgIcon from "@/public/image/add_image_icon.png";

const NewMeetup: React.FC<{ onDone: () => void }> = ({ onDone }) => {
  const router = useRouter();
  const { data: session } = useSession();
  const today = new Date();
  const [selectedCategory, setSelectedCategory] = useState<{
    id: number;
    categoryTitle: string;
  }>({ id: 0, categoryTitle: "전체" });
  const [imgData, setImgData] = useState<any>(addImgIcon);
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
    const enteredTitle = formRef.titleRef.current!.value;
    const enteredDescription = formRef.descriptionRef.current!.value;
    const enteredLocation = formRef.locationRef.current!.value;
    const enteredCategory = selectedCategory;
    const enteredCapacity = parseInt(formRef.capacityRef.current!.value);
    const meetupData = {
      image: imgData,
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

  const imgPreviewHandler = async () => {
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 240,
      useWebWorker: true,
    };
    const fileReader = new FileReader();
    const inputImage = formRef.imageRef.current!.files![0];
    const compressedFile = await imageCompression(inputImage, options);
    if (inputImage) {
      fileReader.readAsDataURL(compressedFile);
      fileReader.onload = () => {
        setImgData(fileReader.result);
      };
    }
  };

  return (
    <Modal title="어떤 모임을 만들어 볼까요?" onClose={onDone}>
      <form
        style={{ fontFamily: "Pretendard Variable" }}
        className="my-2"
        onSubmit={submitHandler}
      >
        <div className="py-1">
          <label className="font-semibold font-score" htmlFor="image">
            <div className="mx-auto text-center">대표 이미지</div>
            <Image
              className="mx-auto size-20 rounded-full cursor-pointer"
              width={80}
              height={80}
              alt="image"
              src={imgData}
            ></Image>
            <motion.input
              className="hidden"
              onChange={imgPreviewHandler}
              ref={formRef.imageRef}
              id="image"
              type="file"
              accept="image/*"
              required
            />
          </label>
          <div className="my-1 text-center text-red-600">
            이미지를 추가해 주세요!
          </div>
        </div>
        <div className="py-1">
          <label className="font-semibold" htmlFor="title">
            모임명
          </label>
          <motion.input
            whileFocus={{ y: [0, -1.5], transition: { duration: 0.2 } }}
            className="block my-1 border-solid border border-zinc-400 focus:outline-none focus:border-blue-400 rounded-md"
            ref={formRef.titleRef}
            id="title"
            type="text"
            required
          />
        </div>
        <div className="py-1">
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
            ref={formRef.locationRef}
            id="location"
            type="text"
            required
          />
        </div>
        <div className="py-1">
          <label className="font-semibold" htmlFor="description">
            모임 소개
          </label>
          <motion.textarea
            whileFocus={{ y: [0, -1.5], transition: { duration: 0.2 } }}
            className="block my-1 border-solid border border-zinc-400 focus:outline-none focus:border-blue-400 rounded-md w-2/3 resize-none"
            ref={formRef.descriptionRef}
            id="description"
            required
          />
        </div>
        <div className="text-right my-1">
          <motion.button
            type="button"
            whileHover={{ y: [0, -3], transition: { duration: 0.3 } }}
            className="px-2 mx-1 border rounded-md font-semibold text-zinc-600 bg-zinc-100 border-zinc-200 border-solid hover:bg-zinc-200"
            onClick={onDone}
          >
            취소
          </motion.button>
          <motion.button
            whileHover={{ y: [0, -3], transition: { duration: 0.3 } }}
            className="font-pretendard px-2 mx-1 border rounded-md font-semibold text-blue-600 bg-blue-100 border-blue-200 border-solid hover:bg-blue-200"
            type="submit"
          >
            등록
          </motion.button>
        </div>
      </form>
    </Modal>
  );
};
export default NewMeetup;
