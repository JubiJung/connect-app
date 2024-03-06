import dotenv from "dotenv";
import NextAuth from "next-auth/next";
import NaverProvider from "next-auth/providers/naver";
import KakaoProvider from "next-auth/providers/kakao";
import CredentialsProvider from "next-auth/providers/credentials";

dotenv.config();

export default NextAuth({
  providers: [
    // CredentialsProvider({
    //   id: "",
    //   name: "",
    //   credentials: {
    //     username: { label: "Username", type: "text", placeholder: "id" },
    //     password: { label: "password", type: "password" },
    //   },
    //   async authorize(credentials, req) {
    //     const res = await fetch("/", {
    //       method: "POST",
    //       body: JSON.stringify(credentials),
    //       headers: { "Content-Type": "application/json" },
    //     });
    //     const user = await res.json();
    //     if (res.ok && user) {
    //       return user;
    //     }
    //     return null;
    //   },
    // }),
    NaverProvider({
      clientId: process.env.NAVER_ID!,
      clientSecret: process.env.NAVER_SECRET!,
    }),

    KakaoProvider({
      clientId: process.env.KAKAO_ID!,
      clientSecret: process.env.KAKAO_SECRET!,
    }),
  ],
  // callbacks: {
  //   async session({ session, token, user }) {
  //     session.user!.name = token.sub as string;
  //     return session;
  //   },
  // },
});
