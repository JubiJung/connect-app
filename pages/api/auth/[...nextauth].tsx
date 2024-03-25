import dotenv from "dotenv";
import NextAuth from "next-auth/next";
import NaverProvider from "next-auth/providers/naver";
import KakaoProvider from "next-auth/providers/kakao";

dotenv.config();

export default NextAuth({
  providers: [
    NaverProvider({
      clientId: process.env.NAVER_ID!,
      clientSecret: process.env.NAVER_SECRET!,
    }),

    KakaoProvider({
      clientId: process.env.KAKAO_ID!,
      clientSecret: process.env.KAKAO_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
});
