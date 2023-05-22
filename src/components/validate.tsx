import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const Validate: React.FC = () => {
  const userSession = useSession();
  const router = useRouter();

  // useEffect(() => {
  if (userSession.data)
    if (
      userSession.data?.profile.first_name === undefined ||
      userSession.data?.profile.first_name === null
    ) {
      if (router.pathname !== "/signup") {
        window.location.replace("/signup");
      }
    }
  // });

  return <></>;
};

export default Validate;
