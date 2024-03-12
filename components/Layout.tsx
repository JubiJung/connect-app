import { ReactNode } from "react";
import Header from "./Header";

const Layout: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="flex flex-col container max-w-3xl h-dvh">
      <Header />
      <div>{children}</div>
    </div>
  );
};
export default Layout;
