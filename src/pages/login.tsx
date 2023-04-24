export default function Login() {
  return (
    <div className="mt-32 flex min-h-full content-center justify-center px-4 py-12 ">
      <div className="w-1/3 rounded-xl p-20 shadow shadow-gray-400/100">
        <form>
          <div className="flex flex-col space-y-4">
            <input
              name="Email"
              type="email"
              placeholder="Email"
              className="rounded-xl px-3 py-3 shadow shadow-gray-400/100"
            />
            <input
              name="Password"
              type="password"
              placeholder="Password"
              className="rounded-xl px-3 py-3 shadow shadow-gray-400/100"
            />
          </div>
        </form>
        <br />
        <div>
          <button className="group relative flex w-full justify-center rounded-md bg-p-dblue px-4 py-2 text-white">
            Log In
          </button>
          <br />
          <p className="text-center text-sm text-gray-400">
            If you are having issues logging in, please contact an
            administrator.
          </p>
          <br />
          <p className="text-center text-sm text-gray-400">
            Don't have an account yet? Sign up.
          </p>
        </div>
      </div>
    </div>
  );
}
