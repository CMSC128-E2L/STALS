import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import { getProviders, signIn } from "next-auth/react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "~/server/auth";
import logo from "public/images/logo.png";
import Link from "next/link";
import Image from "next/image";

export default function SignIn({
  providers,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div>
      <header>
        <div className="absolute inset-0 h-[50%] bg-[url('https://www.camellahomes.net/wp-content/uploads/2022/01/camella-homes-header.jpg')] bg-cover bg-no-repeat">
          <div className="h-[100%] bg-gradient-to-b from-transparent to-black opacity-50"></div>
        </div>
        <h1 className="absolute inset-10 text-center text-5xl font-bold text-white drop-shadow-md">
          <div className="relative flex h-20 w-auto justify-center drop-shadow-md">
            <Image
              src={logo.src}
              alt="STALS Logo"
              fill
              className="object-contain"
            />
          </div>
          Welcome back! <br />
          <p className="text-center text-lg font-bold text-white drop-shadow-md">
            Log in to continue
          </p>
        </h1>
      </header>
      <div className="absolute inset-x-0 top-52 flex justify-center">
        <div className="h-[17rem] w-[30rem] rounded-xl bg-white p-10 shadow shadow-p-black/50">
          <div className="flex flex-col space-y-4">
            {Object.values(providers).map((provider) => (
              <div key={provider.name}>
                <button
                  className={`${provider.id} flex w-full justify-center rounded-full px-4 py-2 font-bold shadow shadow-gray-400/100`}
                  onClick={() => void signIn(provider.id)}
                >
                  <div className="relative mr-3 mt-0.5 h-5 w-7">
                    <Image
                      src={`/assets/${provider.id}.png`}
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
          <div>
            <p className="mt-5 text-center text-sm text-gray-400">
              Don&apos;t have an account yet?{" "}
              <Link className="text-cyan-500 underline" href="/signup">
                Sign up
              </Link>
            </p>
          </div>
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
