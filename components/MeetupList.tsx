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
      <ul>
        {filteredList.map((meetup) => (
          <MeetupItem key={meetup.id} meetup={meetup} />
        ))}
      </ul>
    </Category>
  );
};
export default MeetupList;
