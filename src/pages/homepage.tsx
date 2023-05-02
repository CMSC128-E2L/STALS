// import Image from "next/image";

export default function HomePage() {
  return (
    <div>
      {/* Navigation bar */}
      <header className="sticky top-0 mx-auto mb-5 flex flex-wrap items-center justify-between bg-p-dblue p-4">
        {/* Left side */}
        <div className="items-center align-middle">
          <a href="" className="flex items-center">
            <img
              src="https://www.pngfind.com/pngs/m/439-4392840_facebook-link-icon-image-dynamic-spectrum-alliance-pink.png"
              className="mr-3 h-12 rounded-3xl"
              alt="STALS Logo"
            />
            <h1 className="self-center text-4xl font-bold text-white">STALS</h1>
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
      </header>

      {/* Content */}
      <div className="flex flex-row">
        {/* Filters */}
        {/* fixed left-0 */}
        <div className="max-w-1/6 mr-4 flex h-[90%] flex-col rounded-r-[60px] bg-p-lblue p-10">
          <h1 className="mb-5">Filter</h1>

          {/* Location */}
          <div className="mb-5">
            <h2 className="mb-2">Location</h2>
            <input
              className="rounded-2xl px-3 py-1"
              placeholder="Ex: Brgy. Batong Malake"
            ></input>
          </div>

          {/* Types */}
          <div>
            <h2>Types</h2>
            <div className="mb-2 mt-2 flex items-center">
              <input
                id="Apartments"
                type="checkbox"
                value=""
                className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
              />
              <label
                htmlFor="Apartments"
                className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Apartments
              </label>
            </div>

            <div className="mb-2 flex items-center">
              <input
                id="Bedspaces"
                type="checkbox"
                value=""
                className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
              />
              <label
                htmlFor="Bedspaces"
                className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Bedspaces
              </label>
            </div>

            <div className="mb-2 flex items-center">
              <input
                id="Dormitories"
                type="checkbox"
                value=""
                className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
              />
              <label
                htmlFor="Dormitories"
                className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Dormitories
              </label>
            </div>

            <div className="mb-2 flex items-center">
              <input
                id="Hotels"
                type="checkbox"
                value=""
                className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
              />
              <label
                htmlFor="Hotels"
                className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Hotels
              </label>
            </div>

            <div className="mb-2 flex items-center">
              <input
                id="Transients"
                type="checkbox"
                value=""
                className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
              />
              <label
                htmlFor="Transients"
                className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Transients
              </label>
            </div>
          </div>

          {/* Price Range */}
          <div className="mt-5">
            <h2>Price Range</h2>
            <div className="mb-2 mt-2 flex items-center">
              <input
                id="default-checkbox"
                type="checkbox"
                value=""
                className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
              />
              <label
                htmlFor="below-1000"
                className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Below ₱ 1000
              </label>
            </div>

            <div className="mb-2 flex items-center">
              <input
                id="default-checkbox"
                type="checkbox"
                value=""
                className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
              />
              <label
                htmlFor="one-to-two"
                className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                ₱ 1000 – ₱ 2000{" "}
              </label>
            </div>

            <div className="mb-2 flex items-center">
              <input
                id="default-checkbox"
                type="checkbox"
                value=""
                className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
              />
              <label
                htmlFor="two-to-three"
                className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                ₱ 2001 – ₱ 3000{" "}
              </label>
            </div>

            <div className="mb-2 flex items-center">
              <input
                id="default-checkbox"
                type="checkbox"
                value=""
                className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
              />
              <label
                htmlFor="three-to-four"
                className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                ₱ 3001 – ₱ 4000{" "}
              </label>
            </div>

            <div className="mb-2 flex items-center">
              <input
                id="default-checkbox"
                type="checkbox"
                value=""
                className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
              />
              <label
                htmlFor="above-four"
                className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Above ₱ 4001
              </label>
            </div>
          </div>

          {/* Capacity */}
          <div className="mt-7 flex flex-col">
            <h2 className="mb-2">Capacity</h2>
            <label className="mb-2">
              <input
                type="radio"
                className="form-radio"
                name="radio-group"
                value="option1"
                checked
              />
              <span className="ml-2">Solo</span>
            </label>

            <label className="mb-2">
              <input
                type="radio"
                className="form-radio"
                name="radio-group"
                value="option1"
                checked
              />
              <span className="ml-2">2 Persons</span>
            </label>

            <label className="mb-2">
              <input
                type="radio"
                className="form-radio"
                name="radio-group"
                value="option1"
                checked
              />
              <span className="ml-2">3 Persons</span>
            </label>

            <label className="mb-2">
              <input
                type="radio"
                className="form-radio"
                name="radio-group"
                value="option1"
                checked
              />
              <span className="ml-2">4 Persons</span>
            </label>

            <label className="mb-2">
              <input
                type="radio"
                className="form-radio"
                name="radio-group"
                value="option1"
                checked
              />
              <span className="ml-2">More than 4</span>
            </label>
          </div>

          {/* Include */}
          <div className="mt-5">
            <h2 className="mb-2">Include</h2>
            <input
              className="rounded-2xl px-3 py-1"
              placeholder="Type for suggestions..."
            ></input>
          </div>
        </div>

        {/* Accommodations List */}
        {/* bg-gray-300 */}
        <div className=" flex w-5/6 flex-col p-10">
          {/* List of Accommodations */}

          <div className="flex flex-col">
            <div className="mb-4 flex flex-row items-center">
              <h1 className="mr-4 font-bold">Batong Malake</h1>
              <button className="mr-2 rounded-lg bg-p-dblue px-2 py-2 text-xs font-bold text-white hover:bg-sky-600">
                Download PDF
              </button>

              <button className="bg-p-gray mr-4 rounded-lg px-2 py-2 text-xs font-bold text-black hover:bg-gray-400">
                See more...
              </button>
            </div>
            <div className="flex flex-row flex-wrap ">
              <div className="bg-p-gray mr-4 mt-4 h-64 w-64 rounded-xl border p-4"></div>
              <div className="bg-p-gray mr-4 mt-4 h-64 w-64 rounded-xl border p-4"></div>
              <div className="bg-p-gray mr-4 mt-4 h-64 w-64 rounded-xl border p-4"></div>
              <div className="bg-p-gray mr-4 mt-4 h-64 w-64 rounded-xl border p-4"></div>
              <div className="bg-p-gray mr-4 mt-4 h-64 w-64 rounded-xl border p-4"></div>
              <div className="bg-p-gray mr-4 mt-4 h-64 w-64 rounded-xl border p-4"></div>
              <div className="bg-p-gray mr-4 mt-4 h-64 w-64 rounded-xl border p-4"></div>
              <div className="bg-p-gray mr-4 mt-4 h-64 w-64 rounded-xl border p-4"></div>
              <div className="bg-p-gray mr-4 mt-4 h-64 w-64 rounded-xl border p-4"></div>
              <div className="bg-p-gray mr-4 mt-4 h-64 w-64 rounded-xl border p-4"></div>
              <div className="bg-p-gray mr-4 mt-4 h-64 w-64 rounded-xl border p-4"></div>
              <div className="bg-p-gray mr-4 mt-4 h-64 w-64 rounded-xl border p-4"></div>
              <div className="bg-p-gray mr-4 mt-4 h-64 w-64 rounded-xl border p-4"></div>
              <div className="bg-p-gray mr-4 mt-4 h-64 w-64 rounded-xl border p-4"></div>
              {/* {Array(5).fill(1).map((x) => <div key={`${x}`} className="bg-p-gray border rounded-xl p-4 h-64 w-64 mr-4 mt-4"></div>)} */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
