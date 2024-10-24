# Connect-app (2024/02 ~ 2024/03/26)
![image](https://github.com/JubiJung/connect-app/assets/124552101/84a151a4-91fc-43d8-807d-5989a4adf6b8)

**배포** [https://connect-app-teal.vercel.app/](https://connect-project-jubi.vercel.app/)
***

Next.js, Typescript, Tailwind CSS, Framer-motion을 이용하여 만들고 vercel로 배포한 모임 웹입니다.

### 📃프로젝트 소개
***
+ 당근마켓의 모임기능을 착안하여 만든 모임 웹 입니다. 정기적인 모임에도 적합하지만, 즉석 모임에 더 강점을 두고자 하였습니다.

### 🙋‍♀️참여인원
***
1명(개인프로젝트)

### 📚맡은 업무
***
+ 소셜로그인 구현
+ 전반적인 프론트엔드 코드 구현
+ 폼을 통해 모임 추가, 수정 구현
+ 데이터 관리를 위해 MongoDB 데이터베이스 사용
+ vercel을 통해 배포

### 💻기술
***
+ language는 타입스크립트를 사용하여 데이터의 정확성을 높였습니다.
+ React router 보다 Next.js를 사용하는 것이 라우팅에 간편하고 코드가 간결해서 Next.js를 사용했습니다.
+ Next-auth와 useSession기능을 이용해 소셜 로그인 기능을 구현했습니다.
+ DB관리를 위해 MongoDB를 연동하여 CRUD를 구현하였습니다.
+ 기존에 리액트 훅인 useRef를 사용하여 form 데이터를 관리하였으나, 코드가 복잡하고 가독성이 떨어져서 react hook form을 사용하여 해결하고 유효성 검사도 처리했습니다.
+ 이미지 처리시 이미지 크기때문에 배포 후 속도 저하 문제를 일으켰습니다. 이를 해결하기 위해 Next.js의 Image 컴포넌트를 사용했고, browser-image-compression 라이브러리를 사용해 이미지를 압축하여 더욱 성능을 높였습니다.
+ Tailwind css로 전반적인 스타일링 및 동적 스타일링을 하였습니다.
+ Framer-motion을 이용해 스타일링에 사용자 경험을 더욱 향상시켰습니다.
+ vercel로 배포하였습니다.

### 🤔개선사항
***
+ 배포 후 다양한 피드백을 받았는데, 그 중 닉네임 수정 기능이 있으면 좋겠다는 피드백을 받았습니다. 이후 마이페이지 기능을 추가하여 프로필 수정, 관심있는 모임 저장, 알림받기, 내가 만든 모임 관리 등의 기능을 구현하고 싶습니다.
+ 코드의 중복을 좀 더 줄이기 위해 컴포넌트를 좀 더 효율적으로 분리할 것 입니다.
+ 화면 로딩 속도를 개선하기 위해 이미지 처리를 하였으나, 글이 늘어남에 따라 어김없이 속도가 저하되는 문제가 발생했습니다. 이미지 화질을 유지하면서도 로딩속도를 개선할 수 있도록 개선해야합니다.
  
### 🗂저작권
***
  + 해당 웹앱에 사용한 이미지는 <https://pixabay.com/>, <https://www.freepik.com/popular-photos>, <https://unsplash.com/ko> 사이트를 이용하였습니다.
  + 해당 웹앱에 사용한 아이콘은 <https://www.flaticon.com/> 사이트를 이용하였습니다.
