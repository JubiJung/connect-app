import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { categoryList } from "./Category";
import categoryIcon from "@/public/image/arrow_down_icon.png";

const CategoryDropDown: React.FC<{
  selectedCategory: { id: number; categoryTitle: string };
  onSelectCategory: (li: { id: number; categoryTitle: string }) => void;
}> = ({ selectedCategory, onSelectCategory }) => {
  const [isOpen, setIsOpen] = useState(false);
  const baseClass = `text-sm p-1 m-1 shrink-0 border border-solid border-gray-300 rounded-xl hover:bg-gray-500 hover:text-white`;
  return (
    <>
      <div className="inline-block">
        <div className="inline-block border-solid border px-1 border-blue-400 rounded-md">
          {selectedCategory.categoryTitle}
        </div>
        <motion.div
          className="inline-block mx-2"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ ease: "easeOut", duration: 0.12 }}
        >
          <Image
            className="m-auto cursor-pointer"
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
          {categoryList.slice(1, 13).map((li, i) => (
            <motion.li
              animate={{ opacity: [0, 0.5, 1], scale: [0, 1.1, 1] }}
              transition={{ type: "spring", stiffness: 80 }}
              className={`cursor-pointer ${
                selectedCategory.id === i + 1
                  ? `bg-gray-500 text-white ${baseClass} `
                  : `bg-transparent text-black ${baseClass}`
              }`}
              onClick={() => {
                onSelectCategory(li);
              }}
              key={li.id}
            >
              <div>{li.categoryTitle}</div>
            </motion.li>
          ))}
        </ul>
      )}
    </>
  );
};
export default CategoryDropDown;
