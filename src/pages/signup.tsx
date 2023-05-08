/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import logo from "public/images/logo.png";
import bgpic from "public/images/bgpic-01.png";

export default function Signup() {
  return (
    <div className="">
      <img className="bg-cover bg-center" src={bgpic.src} alt="background" />
      {/* Header design */}
      <header>
        <div className="absolute inset-0 h-[50%] bg-[url('https://www.camellahomes.net/wp-content/uploads/2022/01/camella-homes-header.jpg')] bg-cover bg-no-repeat">
          {/* <h1 className="text-center text-white pt-12 text-4xl"><b>Welcome back!</b></h1> */}
          <div className="h-[100%] bg-gradient-to-b from-transparent to-black opacity-80"></div>
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
          Welcome! <br />
        </h1>
      </header>
      <div className="absolute inset-x-0 top-10 flex justify-center">
        <div className="w-fit rounded-xl bg-white p-10 shadow shadow-p-black/50">
          <form>
            <div className="flex flex-col space-y-2.5">
              <div className="w-auto flex-row space-x-[2%]">
                <input
                  name="Firstname"
                  type="text"
                  placeholder="First Name"
                  className="w-[60%] rounded-xl px-3 py-3 shadow shadow-gray-400/100"
                  required
                />
                <input
                  name="Middleinitial"
                  type="text"
                  placeholder="Middle Initial"
                  className="w-[38%] rounded-xl px-3 py-3 shadow shadow-gray-400/100"
                />
              </div>
              <div className="w-auto flex-row space-x-[2%]">
                <input
                  name="Lastname"
                  type="text"
                  placeholder="Last Name"
                  className="w-[60%] rounded-xl px-3 py-3 shadow shadow-gray-400/100"
                  required
                />
                <input
                  name="Suffix"
                  type="text"
                  placeholder="Suffix"
                  className="w-[38%] rounded-xl px-3 py-3 shadow shadow-gray-400/100"
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
                {/* <p className="px-3 text-xs">
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
                className="rounded-xl px-3 py-3 shadow shadow-gray-400/100"
                required
              />
              <input
                name="Contactnumber"
                type="number"
                placeholder="Contact Number"
                // minlength="8"
                // max="14"
                className="rounded-xl px-3 py-3 shadow shadow-gray-400/100"
                required
              />
            </div>
            <br />
            <div>
              <button className="group relative flex w-full justify-center rounded-md bg-p-dblue px-4 py-2 text-white">
                Sign up
              </button>
              <br />
              <p className="text-center text-sm text-gray-400">
                Already have an account?{" "}
                <a href="login" className="text-cyan-500 underline">
                  Login
                </a>
                .
              </p>
              <p className="text-center text-sm text-gray-400">
                {" "}
                <a href="homepage" className="text-cyan-500">
                  Continue as Guest
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
