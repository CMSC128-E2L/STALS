export default function Login() {
  return (
    <div>
      {/* Header design */}
      <header>
        <div className="h-halfscreen bg-[url('https://images.pexels.com/photos/1446378/pexels-photo-1446378.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')] bg-cover bg-no-repeat">
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
      {/* Container for log-in credentials */}
      <div className="absolute inset-x-0 top-32 flex justify-center">
        <div className="w-auto rounded-xl bg-white p-10 shadow shadow-p-black/50">
          <form>
            <div className="flex flex-col space-y-4">
              <input
                name="Email"
                type="email"
                placeholder="Email"
                className="rounded-xl px-3 py-3 shadow shadow-p-black/50"
              />
              <input
                name="Password"
                type="password"
                placeholder="Password"
                className="rounded-xl px-3 py-3 shadow shadow-p-black/50"
              />
            </div>
          </form>
          <br />
          {/* Log-in, help, sign-up buttons */}
          <div>
            <button className="group relative flex w-full justify-center rounded-lg bg-p-dblue px-4 py-2 font-bold text-white">
              Log In
            </button>
            {/* Log-in, help, sign-up buttons */}
            <div>
              <br />
              <p className="text-center text-sm text-gray-400">
                If you are having issues logging in, please contact an{" "}
                <a className="text-cyan-500 underline" href="">
                  administrator
                </a>
                .
              </p>
              <br />
              <p className="text-center text-sm text-gray-400">
                Don&apos;t have an account yet?{" "}
                <a className="text-cyan-500 underline" href="">
                  Sign Up
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
