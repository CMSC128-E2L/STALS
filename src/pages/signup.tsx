/* eslint-disable @next/next/no-img-element */
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import { getProviders, signIn } from "next-auth/react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "~/server/auth";

import Link from "next/link";
import bgpic from "public/images/bgpic-01.png";

export default function Signup() {
  return (
    <div className="">
      <img
        className="absolute bg-cover bg-fixed bg-center"
        src={bgpic.src}
        alt="background"
      />
      <div className="absolute inset-x-0 top-10 flex h-screen items-center justify-center">
        <div className="w-fit rounded-xl bg-white px-10 py-10">

          <div className="item-center flex justify-center px-2 pb-0 pt-0 drop-shadow-md">
            <h1 className="text-5xl font-bold text-blue-700">Welcome!</h1>
          </div>

          <div className="flex justify-center pb-6 drop-shadow-md">
            <p className="text-sm italic text-gray-400">
              Create an account to get started
            </p>
          </div>

          <form>
            <div className="flex flex-col space-y-2.5">
              <div className="w-auto flex-row space-x-[2%]">
                <input
                  name="Firstname"
                  type="text"
                  placeholder="First Name"
                  className="w-[70%] rounded-xl px-2 py-2 shadow shadow-gray-400/100"
                  required
                />
                <input
                  name="Middleinitial"
                  type="text"
                  placeholder="M.I."
                  className="w-[28%] rounded-xl px-2 py-2 shadow shadow-gray-400/100"
                />
              </div>
              <div className="w-auto flex-row space-x-[2%]">
                <input
                  name="Lastname"
                  type="text"
                  placeholder="Last Name"
                  className="w-[70%] rounded-xl px-2 py-2 shadow shadow-gray-400/100"
                  required
                />
                <input
                  name="Suffix"
                  type="text"
                  placeholder="Suffix"
                  className="w-[28%] rounded-xl px-2 py-2 shadow shadow-gray-400/100"
                />
              </div>
              <input
                name="Username *"
                type="text"
                placeholder="Username"
                className="rounded-xl px-2 py-2 shadow shadow-gray-400/100"
                required
              />
              <div className="flex flex-col space-y-1">
                <input
                  name="Password"
                  type="password"
                  placeholder="Password"
                  className="rounded-xl px-2 py-2 shadow shadow-gray-400/100"
                  required
                />
                {/* <p className="px-2 text-xs">
                  {" "}
                  Password Strength:
                  <label id="Strength" className="text-red-500">
                    {" "}
                    Weak
                  </label>
                </p> */}
              </div>
              <input
                name="Email"
                type="email"
                placeholder="Email"
                className="rounded-xl px-2 py-2 shadow shadow-gray-400/100"
                required
              />
              <input
                name="Contactnumber"
                type="tel"
                placeholder="Contact Number"
                // minlength="8"
                // max="14"
                className="rounded-xl px-2 py-2 shadow shadow-gray-400/100"
                required
              />

              {/* <div className="flex justify-center rounded-xl px-2 py-2 shadow shadow-gray-400/100">
                <input type="radio" id="student" name="accom"/>
                <label className="px-2">   Student    </label>
                <input type="radio" id="landlord"  name="accom"/>
                <label className="px-2">   Landlord    </label><br/>
              </div> */}
            </div>
            <br />
            <div>
              <div className="py-2">
                <button className="group relative flex w-full justify-center rounded-full bg-p-dblue px-4 py-2 font-bold text-white shadow shadow-gray-400/100">
                  Sign up
                </button>
              </div>

              <div>
                <Link href="/homepage">
                  <button className="group relative flex w-full justify-center rounded-full bg-slate-500 px-4 py-2 font-bold text-white shadow shadow-gray-400/100">
                    Continue as guest
                  </button>
                </Link>
              </div>

              <p className="pt-5 text-center text-sm text-gray-400">
                Already have an account?{" "}
                <a href="login" className="text-cyan-500 underline">
                  Login
                </a>
                .
              </p>
            </div>
          </form>
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
