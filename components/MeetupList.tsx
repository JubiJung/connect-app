import { useState } from "react";
import { MeetupType } from "@/pages";
import MeetupItem from "./MeetupItem";
import Category from "./Category";

const MeetupList: React.FC<{ meetups: MeetupType[] }> = ({ meetups }) => {
  const [selectedCategory, setSelectedCategory] = useState(0);

  const filteredList =
    selectedCategory === 0
      ? meetups
      : meetups.filter((meetup) => meetup.category.id === selectedCategory);

  const categorySelectHandler = (id: number) => {
    setSelectedCategory(id);
  };

  return (
    <Category
      selectedCategory={selectedCategory}
      onCategorySelector={categorySelectHandler}
    >
      <ul className="flex flex-col p-2 h-screen">
        {filteredList.length !== 0 ? (
          filteredList.map((meetup) => (
            <MeetupItem key={meetup.id} meetup={meetup} />
          ))
        ) : (
          <div className="text-center text-xl font-bold">
            새로운 모임을 만들어보세요!
          </div>
        )}
      </ul>
    </Category>
  );
};
export default MeetupList;
