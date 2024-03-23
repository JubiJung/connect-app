import { ReactNode } from "react";
import { motion } from "framer-motion";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export const categoryList = [
  { id: 0, categoryTitle: "전체" },
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
  { id: 12, categoryTitle: "여행" },
];

const settings = {
  arrows: false,
  dots: false,
  className: "center",
  infinite: false,
  swipeToSlide: true,
  variableWidth: true,
  slidesToShow: 7,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 720,
      settings: {
        slidesToShow: 5,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 365,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

const Category: React.FC<{
  children: ReactNode;
  onCategorySelector: (id: number) => void;
  selectedCategory: number;
}> = ({ children, onCategorySelector, selectedCategory }) => {
  return (
    <>
      <ul className="my-5 slider-container">
        <Slider {...settings}>
          {categoryList.map((li, i) => (
            <li
              className="whitespace-nowrap px-2"
              key={li.id}
              onClick={() => {
                onCategorySelector(li.id);
              }}
            >
              {selectedCategory === i ? (
                <>
                  <div className="cursor-pointer font-bold">
                    {li.categoryTitle}
                  </div>
                  <motion.div
                    layoutId="tab-indicator"
                    transition={{ duration: "0.14" }}
                    className="bg-sky-500 w-auto h-1"
                  />
                </>
              ) : (
                <div className="cursor-pointer">{li.categoryTitle}</div>
              )}
            </li>
          ))}
        </Slider>
      </ul>
      <div>{children}</div>
    </>
  );
};
export default Category;
