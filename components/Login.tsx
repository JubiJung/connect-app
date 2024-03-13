"use client";
import { signIn } from "next-auth/react";
import Image from "next/image";
import kakaoLoginImg from "@/public/image/kakao_login_medium_narrow.png";
import naverLoginImg from "@/public/image/btnG_완성형.png";

const Login = () => {
  return (
    <div className="flex flex-col w-56 h-56 mx-auto py-auto border-solid border-2 border-indigo-900">
      <Image
        className="w-auto h-auto"
        onClick={() => signIn("kakao", { callbackUrl: "/" })}
        alt="loginImg"
        src={kakaoLoginImg}
      ></Image>
      <Image
        className="w-auto h-auto"
        onClick={() => signIn("naver", { callbackUrl: "/" })}
        alt="loginImg"
        src={naverLoginImg}
      ></Image>
    </div>
  );
};
export default Login;
