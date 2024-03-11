import { ReactNode, Suspense } from "react";
import Header from "./Header";
import Loading from "@/pages/loading";
const Layout: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <>
      <Header />
      <div>{children}</div>
    </>
  );
};
export default Layout;
