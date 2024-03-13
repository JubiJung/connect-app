import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import categoryIcon from "@/public/image/arrow_down_icon.png";

const categoryList = [
  { id: 1, categoryTitle: "스터디/독서" },
  { id: 2, categoryTitle: "악기" },
  { id: 3, categoryTitle: "베이킹" },
  { id: 4, categoryTitle: "육아" },
  { id: 5, categoryTitle: "공예" },
  { id: 6, categoryTitle: "게임/보드게임" },
  { id: 7, categoryTitle: "음식" },
  { id: 8, categoryTitle: "문화/예술" },
  { id: 9, categoryTitle: "봉사활동" },
  { id: 10, categoryTitle: "반려동물" },
  { id: 11, categoryTitle: "스포츠" },
];

const CategoryDropDown: React.FC<{
  selectedCategory: { id: number; categoryTitle: string };
  onSelectCategory: (li: { id: number; categoryTitle: string }) => void;
}> = ({ selectedCategory, onSelectCategory }) => {
  const [isOpen, setIsOpen] = useState(false);
  const baseClass = `text-sm p-1 m-1 shrink-0 border border-solid border-gray-300 rounded-xl hover:bg-gray-500 hover:text-white`;
  return (
    <>
      <div>
        <div className="inline-block border-solid border px-1 border-blue-400 rounded-md">
          {selectedCategory.categoryTitle}
        </div>
        <motion.div
          className="inline-block mx-2"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ ease: "easeOut", duration: 0.12 }}
        >
          <Image
            className="m-auto"
            onClick={() => {
              setIsOpen(!isOpen);
            }}
            width={16}
            height={16}
            alt="categoryIcon"
            src={categoryIcon}
          ></Image>
        </motion.div>
      </div>
      {isOpen && (
        <ul className="flex flex-wrap justify-around">
          {categoryList.map((li, i) => (
            <li
              className={`${
                selectedCategory.id === i + 1
                  ? `bg-gray-500 text-white ${baseClass}`
                  : `bg-transparent text-black ${baseClass}`
              }`}
              onClick={() => {
                onSelectCategory(li);
              }}
              key={li.id}
            >
              <div>{li.categoryTitle}</div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};
export default CategoryDropDown;
