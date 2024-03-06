import Link from "next/link";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";

const Header: React.FC = () => {
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        <div>{session.user?.name}님 안녕하세요.</div>
        <button onClick={() => signOut({ callbackUrl: "/" })}>로그아웃</button>
      </>
    );
  }
  return (
    <div>
      <Link href="/login">Login</Link>
    </div>
  );
};
export default Header;
