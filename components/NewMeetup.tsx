import { useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import imageCompression from "browser-image-compression";
import Image from "next/image";
import { useForm, SubmitHandler } from "react-hook-form";
import Modal from "../components/UI/Modal";
import CategoryDropDown from "./CategoryDropDown";
import { categoryList } from "./Category";
import addImgIcon from "@/public/image/add_image_icon.png";

type Inputs = {
  title: string;
  description: string;
  capacity: number;
  image: any;
  username: any;
  location: string;
  date: string;
};

const NewMeetup: React.FC<{ onDone: () => void }> = ({ onDone }) => {
  const router = useRouter();
  const { data: session } = useSession();
  const today = new Date();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>({
    mode: "onBlur",
  });
  const [selectedCategory, setSelectedCategory] = useState<{
    id: number;
    categoryTitle: string;
  }>(categoryList[1]);
  const [imgData, setImgData] = useState<any>(addImgIcon);
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

  const submitHandler: SubmitHandler<Inputs> = (data) => {
    const checkSubmit = confirm("모임을 등록할까요?");
    if (!checkSubmit) return;
    const meetupData = {
      image: imgData,
      title: data.title,
      category: selectedCategory,
      capacity: data.capacity,
      description: data.description,
      username: session?.user?.name,
      location: data.location,
      date: todayDate,
    };
    addMeetupHandler(meetupData);
  };

  const imgPreviewHandler = async () => {
    const imgFile = watch("image");
    const options = {
      maxSizeMB: 0.02,
      maxWidthOrHeight: 240,
      useWebWorker: true,
    };
    const fileReader = new FileReader();
    const inputImage = imgFile[0];
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
        onSubmit={handleSubmit(submitHandler)}
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
              {...register("image", {
                required: true,
                onChange: imgPreviewHandler,
              })}
              className="hidden"
              id="image"
              type="file"
              accept="image/*"
            />
          </label>
          {errors.image && (
            <div className="my-1 text-center text-red-600">
              이미지를 추가해 주세요.
            </div>
          )}
        </div>
        <div className="py-1">
          <label className="font-semibold" htmlFor="title">
            모임명
          </label>
          <motion.input
            {...register("title", { required: true })}
            whileFocus={{ y: [0, -1.5], transition: { duration: 0.2 } }}
            className="block my-1 border-solid border border-zinc-400 focus:outline-none focus:border-blue-400 rounded-md"
            id="title"
            type="text"
          />
          {errors.title && (
            <div className="my-1 text-red-600">모임명을 입력해 주세요.</div>
          )}
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
            {...register("capacity", { required: true, min: 0 })}
            whileFocus={{ y: [0, -1.5], transition: { duration: 0.2 } }}
            className="block my-1 border-solid border border-zinc-400 focus:outline-none focus:border-blue-400 rounded-md"
            id="capacity"
            type="number"
            min={0}
            max={99}
          />
          {errors.capacity && (
            <div className="my-1 text-red-600">정원을 입력해 주세요.</div>
          )}
        </div>
        <div className="py-1">
          <label className="font-semibold" htmlFor="location">
            위치
          </label>
          <motion.input
            {...register("location", { required: true })}
            whileFocus={{ y: [0, -1.5], transition: { duration: 0.2 } }}
            className="block my-1 border-solid border border-zinc-400 focus:outline-none focus:border-blue-400 rounded-md"
            id="location"
            type="text"
          />
          {errors.location && (
            <div className="my-1 text-red-600">위치를 추가해 주세요.</div>
          )}
        </div>
        <div className="py-1">
          <label className="font-semibold" htmlFor="description">
            모임 소개
          </label>
          <motion.textarea
            {...register("description", { required: true })}
            whileFocus={{ y: [0, -1.5], transition: { duration: 0.2 } }}
            className="block my-1 border-solid border border-zinc-400 focus:outline-none focus:border-blue-400 rounded-md w-2/3 resize-none"
            id="description"
          />
          {errors.description && (
            <div className="my-1 text-red-600">모임 소개를 입력해 주세요.</div>
          )}
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
