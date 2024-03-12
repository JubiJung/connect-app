import Link from "next/link";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";

const Header: React.FC = () => {
  const { data: session } = useSession();
  if (session) {
    return (
      <div className="flex justify-around">
        <Link href="/">
          <div className="bg-blue-500 text-white font-bold py-2 px-4 rounded">
            Connect
          </div>
        </Link>
        <div className="flex">
          <div className="bg-blue-500 text-white font-bold py-2 px-4 rounded">
            {session.user?.name}님 안녕하세요!
          </div>
          <button onClick={() => signOut({ callbackUrl: "/" })}>
            로그아웃
          </button>
        </div>
      </div>
    );
  }
  return (
    <div>
      <Link href="/">Home</Link>
      <Link href="/login">Login</Link>
    </div>
  );
};
export default Header;
