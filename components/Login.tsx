"use client";
import { signIn, signOut, useSession } from "next-auth/react";

const Login = () => {
  const { data: session } = useSession();
  if (session) {
    return <button onClick={() => signOut()}>로그아웃</button>;
  }

  return (
    <>
      {/* <button onClick={}>네이버로 로그인</button> */}
      <button
        onClick={async () => {
          const response = await fetch(
            "http://localhost:3000/api/auth/callback/kakao"
          );
          signIn("kakao", {
            callbackUrl: "http://localhost:3000/api/auth/callback/kakao",
          });
          console.log(response);
        }}
      >
        카카오로 로그인
      </button>
    </>
  );
};
export default Login;
