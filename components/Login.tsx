"use client";
import { getCsrfToken, signIn, signOut, useSession } from "next-auth/react";
import Kakao from "next-auth/providers/kakao";

const Login = () => {
  return (
    <>
      {/* <button onClick={}>네이버로 로그인</button> */}
      <button onClick={() => signIn("kakao", { callbackUrl: "/" })}>
        카카오로 로그인
      </button>
      <button onClick={() => signIn("naver", { callbackUrl: "/" })}>
        네이버로 로그인
      </button>
    </>
  );
};
export default Login;
