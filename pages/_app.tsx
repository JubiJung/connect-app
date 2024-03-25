import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import type { NextPage } from "next";
import type { ReactElement, ReactNode } from "react";
import DefaultLayout from "@/components/UI/DefaultLayout";
import localFont from "next/font/local";

const pretendardFont = localFont({
  src: "../public/font/PretendardVariable.ttf",
  variable: "--font-pretendard",
});

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};
function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);
  return (
    <main className={`${pretendardFont.variable}`}>
      <SessionProvider session={pageProps.session}>
        <DefaultLayout>{getLayout(<Component {...pageProps} />)}</DefaultLayout>
      </SessionProvider>
    </main>
  );
}

export default MyApp;
