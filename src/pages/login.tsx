export default function Login() {
  return (
    <div>
      {/* Header design */}
      <header>
        <div className="absolute inset-0 h-[50%] bg-[url('https://www.camellahomes.net/wp-content/uploads/2022/01/camella-homes-header.jpg')] bg-cover bg-no-repeat">
          <div className="absolute inset-0 h-[100%] bg-gradient-to-b from-transparent to-p-black opacity-50"></div>
        </div>
        <h1 className="absolute inset-10 text-center text-4xl font-bold text-white drop-shadow-2xl">
          Welcome back!
        </h1>
        <p className="absolute inset-20 text-center text-lg font-bold text-white drop-shadow-2xl">
          Login to continue
        </p>
      </header>
      {/* Container for log-in credentials */}
      <div className="absolute inset-0 mt-32 flex content-center justify-center">
        <div className="w-85 h-[27rem] rounded-xl bg-white p-20 shadow shadow-p-black/50">
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
                Sign up
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
