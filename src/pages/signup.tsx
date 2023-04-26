// import { type NextPage } from "next";
// import Head from "next/head";
// import Link from "next/link";
// import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { api } from "~/utils/api";
// import { stringify } from "superjson";

export default function Signup() {
  // const createduser = api.user.createUser.useQuery();
  // const createUser = api.user.createUser.useQuery();

  // const { data: firstData, isLoading: queryLoading } =
  //   api.user.getFirst.useQuery();
  // if (queryLoading) {
  //   return <div>Loading</div>;
  // }

  return (
    <div>
      {/* Header design */}
      <header>
        <div className="h-[20rem] bg-[url('https://images.pexels.com/photos/1446378/pexels-photo-1446378.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')] bg-cover bg-no-repeat">
          {/* <h1 className="text-center text-white pt-12 text-4xl"><b>Welcome back!</b></h1> */}
          <div className="h-[100%] bg-gradient-to-b from-transparent to-black opacity-80"></div>
        </div>
        <h1 className="absolute inset-10 text-center text-4xl font-bold text-white drop-shadow-md">
          Welcome back!
        </h1>
        <p className="absolute inset-20 text-center text-lg font-bold text-white drop-shadow-md">
          Login to continue
        </p>
      </header>
      <div className="absolute inset-x-0 top-0 mt-32 flex content-center justify-center">
        <div className="relative flex w-1/3 rounded-xl bg-white px-12 pb-6 pt-10 shadow shadow-p-black/50">
          <form>
            <div className="flex flex-col space-y-3">
              <div className="relative flex-row space-x-[1%]">
                <input
                  name="Firstname"
                  type="text"
                  placeholder="First Name"
                  className="w-[29%] rounded-xl px-3 py-3 shadow shadow-gray-400/100"
                  required
                />
                <input
                  name="Middleinitial"
                  type="text"
                  placeholder="M.I."
                  className="w-[19%] rounded-xl px-3 py-3 shadow shadow-gray-400/100"
                />
                <input
                  name="Lastname"
                  type="text"
                  placeholder="Last Name"
                  className="w-[29%] rounded-xl px-3 py-3 shadow shadow-gray-400/100"
                  required
                />
                <input
                  name="Suffix"
                  type="text"
                  placeholder="Suffix"
                  className="w-[19%] rounded-xl px-3 py-3 shadow shadow-gray-400/100"
                />
              </div>
              <input
                name="Username *"
                type="text"
                placeholder="Username"
                className="rounded-xl px-3 py-3 shadow shadow-gray-400/100"
                required
              />
              <div className="flex flex-col space-y-1">
                <input
                  name="Password"
                  type="password"
                  placeholder="Password"
                  className="rounded-xl px-3 py-3 shadow shadow-gray-400/100"
                  required
                />
                <p className="px-3 text-xs">
                  {" "}
                  Password Strength:
                  <label id="Strength" className="text-green-500">
                    {" "}
                    Good
                  </label>
                </p>
              </div>
              <input
                name="Email"
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
              <div className="rounded-xl px-3 py-0.5 text-gray-400 shadow shadow-gray-400/100">
                <div className="flex flex-col space-y-1 text-sm">
                  <label className="">Type of User</label>
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
                Already have an account?{" "}
                <a href="login" className="text-blue-600 underline">
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
