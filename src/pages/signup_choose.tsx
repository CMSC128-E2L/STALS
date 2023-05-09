/* eslint-disable @next/next/no-img-element */
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import { getProviders, signIn } from "next-auth/react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "~/server/auth";

import Link from "next/link";
import userstud from "public/images/userstudent.png";
import userlandowner from "public/images/userlandowner.png";
import bgpic from "public/images/bgpic-01.png";

export default function Signup() {
  return (
    <div className="">
      <img
        className="absolute bg-cover bg-fixed bg-center"
        src={bgpic.src}
        alt="background"
      />

      <div className="item-center item center flex justify-center px-2 pb-0 pt-0 drop-shadow-md">
        <h1 className="pb-10 pt-10 text-5xl font-bold text-white">
          Type of User
        </h1>
      </div>

      <div className="">
        <div className="item-center absolute inset-x-0 top-20 flex h-screen flex-row justify-center">
          {/* <div className="item-center flex justify-center px-2 pt-0 pb-0 drop-shadow-md">
                    <h1 className="text-5xl font-bold text-white">Type of User</h1>
                </div> */}

          <figure className="relative max-w-sm cursor-pointer grayscale filter transition-all duration-300 hover:grayscale-0">
            <a href="#">
              <img
                className="rounded-lg"
                src={userstud.src}
                alt="userstudent"
              />
            </a>
            <figcaption className="text-center text-4xl font-bold text-white">
              <p>Student</p>
            </figcaption>
          </figure>

          <figure className="relative max-w-sm cursor-pointer grayscale filter transition-all duration-300 hover:grayscale-0">
            <a href="#">
              <img
                className="rounded-lg"
                src={userlandowner.src}
                alt="userstudent"
              />
            </a>
            <figcaption className="text-center text-4xl font-bold text-white">
              <p>Landowner</p>
            </figcaption>
          </figure>
        </div>
      </div>
    </div>
  );
}

// export async function getServerSideProps(context: GetServerSidePropsContext) {
//   const session = await getServerSession(context.req, context.res, authOptions);

//   // If the user is already logged in, redirect.
//   // Note: Make sure not to redirect to the same page
//   // To avoid an infinite loop!
//   if (session) {
//     return { redirect: { destination: "/homepage" } };
//   }

//   const providers = await getProviders();

//   return {
//     props: { providers: providers ?? [] },
//   };
// }
