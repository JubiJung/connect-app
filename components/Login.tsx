"use client";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import kakaoLoginImg from "@/public/image/kakao_login_large_narrow.png";
import naverLoginImg from "@/public/image/btnG_완성형.png";

const Login = () => {
  return (
    <>
      <header className="mb-10 flex items-end justify-center h-52 text-center ">
        <Link href="/" className="text-5xl font-bold text-blue-400">
          Connect
        </Link>
      </header>
      <div className="flex flex-col items-center">
        <div className="m-2 inline-block">SNS 계정을 이용해 로그인하세요.</div>
        <Image
          className="w-56 h-14 mb-4"
          width={224}
          height={56}
          onClick={() => signIn("kakao", { callbackUrl: "/" })}
          alt="loginImg"
          src={kakaoLoginImg}
        ></Image>
        <Image
          className="w-56 h-14"
          width={224}
          height={56}
          onClick={() => signIn("naver", { callbackUrl: "/" })}
          alt="loginImg"
          src={naverLoginImg}
        ></Image>
      </div>
    </>
  );
};
export default Login;
