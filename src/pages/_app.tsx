import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import Validate from "../components/globalValidate";
import GlobalToaster from "~/components/globalToster";
import FooterComponent from "~/components/footer";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <div id="top"></div>
      <Validate />
      <GlobalToaster />
      <Component {...pageProps} />
      <FooterComponent />
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
