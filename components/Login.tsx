import { useRef } from "react";

const Login = () => {
  const enteredId = useRef(null);
  const enteredPassword = useRef(null);
  return (
    <form>
      <p>
        <label htmlFor="id">아이디</label>
        <input ref={enteredId} id="id" type="text"></input>
      </p>
      <p>
        <label htmlFor="password">비밀번호</label>
        <input ref={enteredPassword} id="password" type="password"></input>
      </p>
      <button>회원가입</button>
      <button type="submit">로그인</button>
    </form>
  );
};
export default Login;
