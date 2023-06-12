import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import { getProviders, signIn } from "next-auth/react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "~/server/auth";
import Link from "next/link";
import Image from "next/image";
import bgpic from "public/images/login_bg.png";

export default function SignIn({
  providers,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div className="h-[80vh]">
      <img className="site-background" src={bgpic.src} alt="background" />
      <div className="absolute inset-x-0 top-20 flex justify-center">
        <div className="rounded-xl px-16 py-8">
          <div className="item-center flex justify-center px-2 pb-0 pt-0 drop-shadow-md">
            <h1 className="text-5xl font-extrabold text-[#420EB3]">
              Welcome back!
            </h1>
          </div>

          <div className="flex justify-center pb-4 drop-shadow-md">
            <p className="text-md mt-1 italic text-gray-400">
              Select a provider to continue
            </p>
          </div>
          <div className="py-2"></div>

          <div className="flex flex-col space-y-4">
            {Object.values(providers).map((provider) => (
              <div key={provider.name}>
                <button
                  className={`${provider.id} flex w-full justify-center rounded-full px-4 py-2 font-bold shadow shadow-gray-400/100`}
                  onClick={() => void signIn(provider.id)}
                >
                  <div className="relative mr-3 mt-0.5 h-5 w-7">
                    <Image
                      src={`/images/${provider.id}.png`}
                      className="object-contain"
                      alt={`${provider.name} Logo`}
                      fill
                    />
                  </div>
                  Sign in with {provider.name}
                </button>
              </div>
            ))}
            <Link href="/homepage">
              <button className="group relative flex w-full justify-center rounded-full bg-slate-500 px-4 py-2 font-bold text-white shadow shadow-gray-400/100">
                Continue as guest
              </button>
            </Link>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);

  // If the user is already logged in, redirect.
  // Note: Make sure not to redirect to the same page
  // To avoid an infinite loop!
  if (session) {
    return { redirect: { destination: "/homepage" } };
  }

  const providers = await getProviders();

  return {
    props: { providers: providers ?? [] },
  };
}
