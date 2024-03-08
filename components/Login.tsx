"use client";
import { signIn } from "next-auth/react";

const Login = () => {
  return (
    <>
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
