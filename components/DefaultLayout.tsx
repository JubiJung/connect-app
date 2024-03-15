import { ReactNode } from "react";

const DefaultLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="flex flex-col container max-w-3xl h-dvh">
      <>{children}</>
    </div>
  );
};
export default DefaultLayout;
