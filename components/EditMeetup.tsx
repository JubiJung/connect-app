import { MeetupType } from "@/pages";
import { useRef } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import Image from "next/image";
import CategoryDropDown from "./CategoryDropDown";

const EditMeetup: React.FC<{
  meetup: MeetupType;
  onEdit: () => void;
}> = ({ meetup, onEdit }) => {
  const [selectedCategory, setSelectedCategory] = useState<{
    id: number;
    categoryTitle: string;
  }>({ id: 0, categoryTitle: "전체" });
  const imageRef = useRef<HTMLInputElement>(null);
  const titleRef = useRef<HTMLInputElement>(null);
  const capacityRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const { data: session } = useSession();
  console.log(meetup.category);

  const selectCategoryHandler = (li: { id: number; categoryTitle: string }) => {
    setSelectedCategory(li);
  };

  const submitHandler = () => {};
  return (
    <form onSubmit={submitHandler}>
      <p>
        <label htmlFor="image">대표 이미지</label>
        <Image src={meetup.image} alt="image" width="64" height="64"></Image>
        <input ref={imageRef} id="image" type="file" accept="image/*" />
      </p>
      <p>
        <label htmlFor="title">모임명</label>
        <input
          defaultValue={meetup.title}
          ref={titleRef}
          id="title"
          type="text"
        />
      </p>
      <div>
        <span>카테고리</span>
        <CategoryDropDown
          currentSeletedCategory={meetup.category}
          selectedCategory={selectedCategory}
          onSelectCategory={selectCategoryHandler}
        />
      </div>

      <p>
        <label htmlFor="capacity">정원</label>
        <input
          defaultValue={meetup.capacity}
          ref={capacityRef}
          id="capacity"
          type="number"
        />
      </p>
      <p>
        <label htmlFor="description">모임소개</label>
        <input
          defaultValue={meetup.description}
          ref={descriptionRef}
          id="description"
          type="text"
        />
      </p>
      <button onClick={onEdit}>취소</button>
      <button type="submit">등록</button>
    </form>
  );
};
export default EditMeetup;
