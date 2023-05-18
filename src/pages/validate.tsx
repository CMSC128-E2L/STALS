import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

const Validate: NextPage = () => {
  const userSession = useSession();

  useEffect(() => {
    if (userSession.data)
      if (
        userSession.data?.profile.first_name === undefined ||
        userSession.data?.profile.first_name === null
      ) {
        window.location.replace("/signup");
      } else {
        window.location.replace("/homepage");
      }
  });

  // TODO: add spinning loading element here. for better ux/ui
  return <div></div>;
};

export default Validate;
