import { ReactNode } from "react";
import Header from "./Header";
const Layout: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <>
      <Header />
      <div>{children}</div>
    </>
  );
};
export default Layout;
