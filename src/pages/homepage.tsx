export default function HomePage() {
  return (
    <div>
      <div className="flex justify-between px-8 py-8 bg-p-dblue"> {/* navigation */ }

        <div className="flex"> {/* left side */ }
          
          <img className="h-[50px] " src="https://www.pngfind.com/pngs/m/439-4392840_facebook-link-icon-image-dynamic-spectrum-alliance-pink.png" alt="STALS Logo" />

          <h1 className="text-[30px]">STALS</h1>
        </div>
      

        <div className="flex"> {/* right side */ }
          
        <input className=" rounded-lg " placeholder="Search">
        </input>
          <h1 className="text-[30px]">STALS</h1>
        </div>
        




      </div>
    </div>
  );
}

//  {/* Container for log-in credentials */}
//  <div className="absolute inset-0 mt-32 flex content-center justify-center">
//  <div className="h-[28rem] w-1/3 bg-white rounded-xl p-20 shadow shadow-p-black/50">
//    <form>
//      <div className="flex flex-col space-y-4">
//        <input
//          name="Email"
//          type="email"
//          placeholder="Email"
//          className="rounded-xl px-3 py-3 shadow shadow-p-black/50"
//        />
//        <input
//          name="Password"
//          type="password"
//          placeholder="Password"
//          className="rounded-xl px-3 py-3 shadow shadow-p-black/50"
//        />
//      </div>
//    </form>
//    <br />
//    {/* Log-in, help, sign-up buttons */}
//    <div>
//      <button className="group relative flex w-full justify-center rounded-lg bg-p-dblue px-4 py-2 text-white">
//        <b>Log In</b>
//      </button>
//      <br />
//      <p className="text-center text-sm text-gray-400">
//        If you are having issues logging in, please contact an <a className="underline text-cyan-500" href="">administrator</a>.
//      </p>
//      <br />
//      <p className="text-center text-sm text-gray-400">
//        Don't have an account yet? <a className="underline text-cyan-500" href="">Sign Up</a>.
//      </p>
//    </div>
//  </div>
// </div>