import Image from "next/image";

export default function HomePage() {
  return (
    <div>
      {/* Navigation bar */}
      <nav className="bg-p-dblue">
        <div className="mx-auto flex flex-wrap items-center justify-between p-4">
          {/* Left side */}
          <div className="items-center align-middle">
            <a href="" className="flex items-center">
              <img
                src="https://www.pngfind.com/pngs/m/439-4392840_facebook-link-icon-image-dynamic-spectrum-alliance-pink.png"
                className="mr-3 h-12 rounded-3xl"
                alt="STALS Logo"
              />
              <h1 className="self-center text-4xl font-bold text-white">
                STALS
              </h1>
            </a>
          </div>
          {/* Right side */}
          <div className="w-full md:block md:w-auto">
            <ul className="mt-4 flex flex-col items-center p-4 font-medium md:mt-0 md:flex-row md:space-x-8 md:border-0 md:p-0 ">
              <li>
                <input
                  className="rounded-2xl px-3 py-1"
                  placeholder="Search"
                ></input>
              </li>
              <li>
                <img
                  src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                  className="h-12 rounded-3xl"
                  alt="Profile"
                />
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
