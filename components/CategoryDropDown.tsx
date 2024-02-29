import { useState } from "react";

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
  onSelectCategory: (id: { id: number; categoryTitle: string }) => void;
}> = ({ selectedCategory, onSelectCategory }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div>
        {selectedCategory.categoryTitle}
        <div
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          🔻
        </div>
      </div>
      {isOpen && (
        <ul>
          {categoryList.map((li) => (
            <li
              onClick={() => {
                onSelectCategory(li);
                setIsOpen(false);
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
