// import logo from "../images/logo.png";
import bgpic from "public/images/bgpic-01.png";

// ror

export default function Signup() {
  return (
    <div className="">
      <div className="h-100 bg-fix relative w-full bg-white bg-cover bg-center">
        <section>
          <img className="h-full w-full object-cover" src={bgpic.src} />

          <div className="item-center absolute inset-x-0 top-10 flex justify-center p-0 drop-shadow-md">
            <a href="#down" className="text-5xl font-bold text-white">
              Sign Up
            </a>
          </div>

          <div className="item-center absolute inset-x-0 top-20 flex justify-center p-4 drop-shadow-md">
            <a href="#down" className="text-1xl italic text-white">
              Click me to create an account!
            </a>
          </div>
        </section>

        <div className="item-center flex justify-center p-0 drop-shadow-md">
          <h1 className="text-5xl font-bold text-blue-700">Welcome!</h1>
        </div>

        <div className="flex justify-center p-0 drop-shadow-md">
          <p className="text-sm italic text-gray-400">
            Create an account to continue
          </p>
        </div>

        <div className="item center flex justify-center" id="down">
          <div className="w-fit rounded-xl bg-white p-7">
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
    </div>
  );
}
