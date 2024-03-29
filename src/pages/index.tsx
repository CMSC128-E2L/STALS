import { type NextPage } from "next";
import Image from "next/image";
import Head from "next/head";
import { signOut, useSession } from "next-auth/react";
import bg from "public/images/background.png";
import logo from "public/images/logo.png";
import about_us from "public/images/about_us.png";
import contact_us from "public/images/contact.png";
import React, { useState, useEffect } from "react";

const Home: NextPage = () => {
  const [isLargeText, setIsLargeText] = useState(false);

  const [currentText, setCurrentText] = useState(0);
  const textList = [
    "You can search, get information, review, and\nrate apartments, bed spaces, hotels, dormitories,\nand transient spaces in Los Baños.",
    "Creating a home away from home, where comfort meets your needs.\nWelcome to STALS, where your journey in Los Baños begins with a\nspace designed for warmth, safety, and affection.",
    // Add additional texts for the slideshow
  ];

  const splitText = (textList[currentText] ?? "").split("\n");

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentText((prevText) => (prevText + 1) % textList.length);
    }, 10000);

    return () => {
      clearInterval(interval);
    };
  }, [textList.length]);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeText(window.innerWidth >= 768); // Adjust the breakpoint as needed
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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
        <div className="">
          <img
            className="relative h-full w-screen bg-cover bg-fixed bg-center"
            src={bg.src}
            alt="background"
          />

          <div className="absolute inset-x-0 top-0 z-30">
            {/* 1 header nav bar [logo name home about contact]*/}
            <header
              className="sticky top-0 z-50 justify-between text-white "
              id="up"
            >
              <div className="container mx-auto flex flex-col items-center justify-between py-4 lg:flex-row">
                <a href="homepage" className="mb-4 flex items-center lg:mb-0">
                  <Image src={logo} alt="Logo" className="mr-2 h-8 w-8" />
                  <span className="text-xl font-bold">STALS</span>
                </a>

                <nav className="flex items-center font-bold">
                  <a
                    href="homepage"
                    className="mx-5 text-white no-underline hover:text-gray-300 hover:underline"
                  >
                    Home
                  </a>
                  <a
                    href="#contactus"
                    className="mx-5 text-white no-underline hover:text-gray-300 hover:underline"
                  >
                    Contact
                  </a>
                  <a
                    href="#aboutus"
                    className="mx-5 text-white no-underline hover:text-gray-300 hover:underline"
                  >
                    About
                  </a>
                </nav>
              </div>
            </header>
          </div>

          <section className="mt-16">
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center">
              <p
                className={`text-3xl font-extrabold tracking-tight lg:text-6xl xl:text-8xl ${
                  isLargeText ? "text-white" : "text-violet-950"
                } ${isLargeText ? "pt-5" : "pt-20"} `}
              >
                Comfort At Its Best
              </p>

              <p
                className={`max-h-30 mt-2 overflow-hidden py-3 text-center font-sans text-sm lg:text-lg xl:text-xl ${
                  isLargeText ? "text-white" : "text-black"
                }`}
              >
                {splitText.map((line, index) => (
                  <React.Fragment key={index}>
                    {line}
                    <br />
                  </React.Fragment>
                ))}
              </p>

              {/* get started button edit color */}
              <div className="x flex flex-col items-center pt-2">
                <AuthShowcase />
              </div>
            </div>
          </section>

          <section className="mt-16 pt-40" id="aboutus">
            <div className="container mx-auto max-w-4xl">
              <div className="flex flex-col items-center justify-center gap-4 lg:flex-row lg:justify-between lg:gap-8">
                <div>
                  <img
                    className="floating-image h-60 w-auto lg:h-80"
                    src={about_us.src}
                    alt="aboutus"
                  />
                </div>
                <div className="px-10 text-center lg:text-left">
                  <h1 className="text-6xl font-bold">About Us</h1>
                  <p className="max-w-lg pt-3">
                    STALS is a student-led software engineering team from the
                    University of the Philippines Los Baños. Our goal is to
                    revolutionize the way students find lodging and help
                    landlords advertise their spaces. With our web application,
                    we centralize and simplify Los Baños&apos; accommodation
                    systems for a better user experience.
                  </p>
                </div>
              </div>

              <div className="container mx-auto flex flex-col justify-between gap-10 px-4 py-10 lg:flex-row lg:px-0">
                <div className="mb-4 w-full rounded-lg bg-purple-800 p-8 text-white transition-all hover:scale-105 lg:mb-0 lg:w-1/3">
                  <h2 className="mb-4 text-2xl font-bold">SYSTEMATIC</h2>
                  <p className="text-white">
                    Being systematic is at the heart of our mission. We
                    understand the importance of filtering out the right home in
                    a quick and convenient way. We ensure that searching for the
                    perfect accommodation will be a smooth and gratifying
                    experience for you.
                  </p>
                </div>
                <div className="mb-4 w-full rounded-lg bg-purple-700 p-8 text-white transition-all hover:scale-105 lg:mb-0 lg:w-1/3">
                  <h2 className="mb-4 text-2xl font-bold">SERVICES</h2>
                  <p className="text-white">
                    We offer a wide range of services to support your
                    preferences. With our comprehensive suite of features, you
                    can search, get, and view reviews for the different types of
                    accommodation on the platform.
                  </p>
                </div>
                <div className="mb-4 w-full rounded-lg bg-purple-600 p-8 text-white transition-all hover:scale-105 lg:mb-0 lg:w-1/3">
                  <h2 className="mb-4 text-2xl font-bold">SOLUTIONS</h2>
                  <p className="text-white">
                    At STALS, we are driven by a passion to solve real problems
                    faced by students and landlords in having accommodations to
                    reside in and accommodations to offer. We are committed to
                    delivering the best solutions that are tailored to meet your
                    specific needs.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="mt-16 py-40" id="contactus">
            <div className="container mx-auto max-w-4xl">
              <div className="flex flex-col items-center justify-center gap-4 lg:flex-row lg:justify-between lg:gap-8">
                <div className="px-10 text-center lg:text-left">
                  <h1 className="text-6xl font-bold">Contact Us</h1>
                  <p className="max-w-lg pt-3">
                    We appreciate your interest in our website and are here to
                    assist you. If you have any questions or feedback, please
                    feel free to reach out to us through our email:{" "}
                    <a
                      href="mailto:uplb.stals@gmail.com"
                      className="font-bold text-purple-600"
                    >
                      uplb.stals@gmail.com
                    </a>
                    . We value your input and will respond to your inquiries or
                    reviews as soon as possible.
                  </p>
                </div>

                <div>
                  <img
                    className="floating-image h-60 w-auto lg:h-80"
                    src={contact_us.src}
                    alt="contactus"
                  />
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
};

export default Home;

const AuthShowcase: React.FC = () => {
  const { data: sessionData } = useSession();
  const fullName = `${sessionData?.profile.first_name ?? ""} ${
    sessionData?.profile?.middle_name ?? ""
  } ${sessionData?.profile.last_name ?? ""}
  ${sessionData?.profile.Suffix ?? ""}`;
  return (
    <div className="flex flex-col items-center justify-start gap-4">
      <button
        className="rounded-full bg-[#420EB3]/90 px-10 py-2 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={
          sessionData
            ? () => void signOut()
            : () => window.location.replace("/login")
        }
      >
        {sessionData ? "Sign out" : "Get Started"}
      </button>
    </div>
  );
};
