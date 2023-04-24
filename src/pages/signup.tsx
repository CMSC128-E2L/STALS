import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

import { api } from "~/utils/api";
import { stringify } from "superjson";

export default function Signup() {
  // const createduser = api.user.createUser.useQuery();
  // const createUser = api.user.createUser.useQuery();

  const { data: firstData, isLoading: queryLoading } =
    api.user.getFirst.useQuery();
  if (queryLoading) {
    return <div>Loading</div>;
  }

  return (
    <div className="mt-32 flex min-h-full content-center justify-center px-2 py-14">
      <div className="w-1/3 rounded-xl p-20 shadow shadow-gray-400/100">
        <form>
          <div className="flex flex-col space-y-2 text-sm">
            <div className="flex flex-row space-x-1.5">
              <input
                name="Firstname*"
                type="text"
                placeholder="First Name"
                className="w-24 rounded-xl px-3 py-3 shadow shadow-gray-400/100"
                required
              />
              <input
                name="Middleinitial"
                type="text"
                placeholder="M.I."
                className="w-16 rounded-xl px-3 py-3 shadow shadow-gray-400/100"
              />
            <input
              name="Lastname"
              type="text"
              placeholder="Last Name *"
              className="w-24 rounded-xl px-3 py-3 shadow shadow-gray-400/100"
              required
            />
            <input
              name="Suffix"
              type="text"
              placeholder="Suffix"
              className="w-16 rounded-xl px-3 py-3 shadow shadow-gray-400/100"
            />
            </div>  
          <input
              name="Username *"
              type="text"
              placeholder="Username"
              className="rounded-xl px-3 py-3 shadow shadow-gray-400/100"
              required
            />
          <input
              name="Password *"
              type="password"
              placeholder="Password"
              className="rounded-xl px-3 py-3 shadow shadow-gray-400/100"
              required
            />
          <input
              name="Email *"
              type="email"
              placeholder="Email"
              className="rounded-xl px-3 py-3 shadow shadow-gray-400/100"
              required
            />
          <input
              name="Contactnumber"
              type="number"
              placeholder="Contact Number"
              className="rounded-xl px-3 py-3 shadow shadow-gray-400/100"
            />
          <div className="text-gray-400 rounded-xl px-3 py-0.5 shadow shadow-gray-400/100">
            <div className="flex flex-col space-y-1 text-sm">
              <label className="">Type of User *</label>
              <div className="flex flex-row space-x-1">
                <input
                    name="Student"
                    type="radio"
                    className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  />
                <label>Student</label>
                <input
                    name="Landowner"
                    type="radio"
                    // className="shadow-gray-400/100"
                  />
                <label>Landowner</label>
              </div>
            </div>
          </div>
          </div>
          <br />
          <div>
            <button className="group relative flex w-full justify-center rounded-md bg-p-dblue px-4 py-2 text-white">
              Signup
            </button>
            <br />
            <p className="text-center text-sm text-gray-400">
              Already have an account yet? <a href="login" className="text-blue-600 underline">Login</a>.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
