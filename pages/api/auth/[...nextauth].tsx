import dotenv from "dotenv";
import NextAuth from "next-auth/next";
import NaverProvider from "next-auth/providers/naver";
import KakaoProvider from "next-auth/providers/kakao";
import CredentialsProvider from "next-auth/providers/credentials";

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
  // callbacks: {
  //   async session({ session, token, user }) {
  //     session.user!.name = token.sub as string;
  //     return session;
  //   },
  // },
});
