export default function Login() {
  return (
    <div>
        {/* Header design */}
        <header> 
          <div className="absolute inset-0 bg-[url('https://www.camellahomes.net/wp-content/uploads/2022/01/camella-homes-header.jpg')] bg-no-repeat bg-cover h-[50%]">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-p-black opacity-50 h-[100%]"></div>
          </div>
          <h1 className="absolute inset-10 text-center text-white text-4xl font-bold drop-shadow-2xl">Welcome back!</h1>
          <p className="absolute inset-20 text-center text-white text-lg font-bold drop-shadow-2xl">Login to continue</p>
        </header>
    {/* Container for log-in credentials */}
    <div className="absolute inset-0 mt-32 flex content-center justify-center">
      <div className="h-[27rem] w-85 bg-white rounded-xl p-20 shadow shadow-p-black/50">
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
          <button className="group relative flex w-full justify-center rounded-lg bg-p-dblue px-4 py-2 text-white font-bold">
            Log In
          </button>
          <br />
          <p className="text-center text-sm text-gray-400">
            If you are having issues logging in, please contact an <a className="underline text-cyan-500" href="">administrator</a>.
          </p>
          <br />
          <p className="text-center text-sm text-gray-400">
            Don&apos;t have an account yet? <a className="underline text-cyan-500" href="">Sign up</a>.
          </p>
        </div>
      </div>
    </div>
    </div>
  );
}
