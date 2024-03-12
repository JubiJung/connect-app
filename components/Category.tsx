import { ReactNode } from "react";

const categoryList = [
  { id: 0, category: "전체" },
  { id: 1, category: "스터디/독서" },
  { id: 2, category: "악기" },
  { id: 3, category: "베이킹" },
  { id: 4, category: "육아" },
  { id: 5, category: "공예" },
  { id: 6, category: "게임/보드게임" },
  { id: 7, category: "음식" },
  { id: 8, category: "문화/예술" },
  { id: 9, category: "봉사활동" },
  { id: 10, category: "반려동물" },
  { id: 11, category: "스포츠" },
];

const Category: React.FC<{
  children: ReactNode;
  onCategorySelector: (id: number) => void;
  selectedCategory: number;
}> = ({ children, onCategorySelector, selectedCategory }) => {
  return (
    <>
      <ul className="flex flex-row overflow-x-auto my-5">
        {categoryList.map((li, i) => (
          <li
            className="whitespace-nowrap px-2"
            key={li.id}
            onClick={() => {
              onCategorySelector(li.id);
            }}
          >
            <div>{li.category}</div>
            {selectedCategory === i && (
              <div className="bg-sky-500 w-auto h-1" />
            )}
          </li>
        ))}
      </ul>
      <div>{children}</div>
    </>
  );
};
export default Category;
