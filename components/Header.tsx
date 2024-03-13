import Link from "next/link";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import Image from "next/image";
import unlockIcon from "@/public/image/unlock_icon.png";
import lockIcon from "@/public/image/lock_icon.png";

const Header: React.FC = () => {
  const { data: session } = useSession();
  if (session) {
    return (
      <div className="flex justify-between py-3 px-2">
        <Link className="my-auto" href="/">
          <div className="text-blue-400 text-3xl font-bold">Connect</div>
        </Link>
        <div className="flex">
          <div className="bg-blue-500 text-white font-bold py-1 px-4 rounded">
            {session.user?.name}님 안녕하세요!
          </div>
          <Image
            alt="lockImg"
            src={unlockIcon}
            className="w-7 h-7 mx-2"
            onClick={() => signOut({ callbackUrl: "/" })}
          />
        </div>
      </div>
    );
  }
  return (
    <div className="flex justify-between py-3 px-2">
      <Link className="my-auto" href="/">
        <div className="text-blue-400 text-3xl font-bold">Connect</div>
      </Link>
      <div>
        <Link href="/login">
          <Image alt="lockImg" src={lockIcon} className="w-7 h-7 mx-2" />
        </Link>
      </div>
    </div>
  );
};
export default Header;
