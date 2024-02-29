"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import Kakao from "next-auth/providers/kakao";
import Link from "next/link";

const Login = () => {
  const { data: session } = useSession();
  const kakaoLoginHandler = async () => {
    const response = signIn(
      `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=58ba5a47bcd61d597eca1c3682cdd249&redirect_uri=http://localhost:3000/api/auth/callback/kakao`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },

        // callbackUrl: "http://localhost:3000/api/auth/callback/kakao",
      }
    );
    console.log(response);

    // <Link href="https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=58ba5a47bcd61d597eca1c3682cdd249&redirect_uri=http://localhost:3000/kakao/auth&scope=account_email"></Link>;
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
