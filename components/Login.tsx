"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import Kakao from "next-auth/providers/kakao";

const Login = () => {
  const { data: session } = useSession();
  const kakaoLoginHandler = async () => {
    signIn("kakao", {
      callbackUrl: "/",
    });
  };
  if (session) {
    return <button onClick={() => signOut()}>로그아웃</button>;
  }

  return (
    <>
      {/* <button onClick={}>네이버로 로그인</button> */}
      <button onClick={kakaoLoginHandler}>카카오로 로그인</button>
    </>
  );
};
export default Login;
