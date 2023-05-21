import { type NextPage } from "next";
import Image from "next/image";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import graphics from "public/images/pic.png";
import bg from "public/images/landing-bg-02.png";
import logo from "public/images/logo.png";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>STALS</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* layout whole page */}
      <main className="">
        {/* landing page whole screen content */}
        <div className="flex flex-col">
          {/* graphics */}
          {/* <div className="absolute bottom-1 right-1/2 h-[100%] w-screen translate-x-1/2 opacity-70">
            <Image className="" src={bg} alt="background" fill />
          </div> */}

          <img
            className="absolute w-screen bg-cover bg-fixed bg-center"
            src={bg.src}
            alt="background"
          />

          {/* 1 header nav bar [logo name home about contact]*/}
          <header className="sticky top-0 justify-between">
            {/* logo name */}
            <div className="absolute left-0 top-1/2 flex p-5">
              <div className="relative flex h-20 w-20 flex-col items-start rounded-full pl-1">
                <Image
                  src={logo}
                  className="object-scale-down object-left"
                  alt="STALS Logo"
                  fill
                />
              </div>
              <h1 className="p-3 font-extrabold text-white sm:text-[2rem]">
                STALS
              </h1>
            </div>

            {/* home about contact */}
            <div className="text-bold text-s absolute right-0 top-1/2 flex p-1 text-white">
              {/* <div className="flex text-white text-bold text-s w-full md:block md:w-auto mt-4 flex flex-col items-center p-4 font-medium md:mt-0 md:flex-row md:space-x-8 md:border-0 md:p-0"> */}
              <Link
                href="homepage"
                className="p-10 no-underline hover:underline"
              >
                Home
              </Link>
              <Link
                href="contactpage"
                className="p-10 no-underline hover:underline"
              >
                Contact
              </Link>
              <Link
                href="aboutpage"
                className="p-10 no-underline hover:underline"
              >
                About Us
              </Link>
            </div>
          </header>

          {/* lowest prio: nagsslide yung description [description -> full name] */}
          {/* 2 main content after header navbar [title subtitle get started button] */}
          <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col justify-center text-center">
            <h1 className="pb-4 text-5xl font-extrabold tracking-tight text-white drop-shadow-md sm:text-[5rem]">
              Comfort At Its Best!
            </h1>

            <p className="p-2 font-sans text-lg leading-normal tracking-wider text-white drop-shadow-md">
              You can search, get information, review, and <br />
              rate apartments, bed spaces, hotels, dormitories,
              <br /> and transient spaces in Los Baños.
            </p>

            {/* get started button edit color */}
            <div className="flex flex-col items-center">
              <AuthShowcase />
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;

const AuthShowcase: React.FC = () => {
  const { data: sessionData } = useSession();

  return (
    <div className="flex flex-col items-start justify-start gap-4">
      <p className="text-start text-2xl text-white">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
      </p>
      <button
        className="rounded-full bg-[#1C5D99]/90 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Get Started"}
      </button>
    </div>
  );
};
