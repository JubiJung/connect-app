import { ReactNode } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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

const settings = {
  className: "center",
  infinite: false,
  slidesToShow: 5,
  swipeToSlide: true,
  variableWidth: true,
  afterChange: function (index: number) {
    console.log(
      `Slider Changed to: ${index + 1}, background: #222; color: #bada55`
    );
  },
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 10,
        slidesToScroll: 2,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 5,
        slidesToScroll: 5,
      },
    },
    {
      breakpoint: 320,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 5,
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
              <div>{li.category}</div>
              {selectedCategory === i && (
                <div className="bg-sky-500 w-auto h-1" />
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
