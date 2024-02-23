import { useRouter } from "next/router";
import MeetupDetailPage from "@/components/MeetupDetailPage";

const MeetupPage: React.FC = () => {
  const router = useRouter();
  const meetupId = router.query.meetupId;
  return (
    <>
      <MeetupDetailPage />
    </>
  );
};
export default MeetupPage;
