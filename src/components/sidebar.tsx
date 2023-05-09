import { useState } from "react";

export default function SideBar() {
  return (
    <>
      {/* Filters */}
      <div className="flex flex-col bg-p-lblue p-5">
        <h1 className="mb-2 text-xl font-bold">Filter</h1>

        {/* Location */}
        <div className="mb-4">
          <Location />
        </div>

        {/* Types */}
        <div className="mb-4">
          <h2 className="mb-2 text-base font-bold">Types</h2>
          <div className="mb-2 flex items-center">
            <input
              id="Apartments"
              type="checkbox"
              value=""
              className="ml-3 h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
            />
            <label htmlFor="Apartments" className="ml-2 text-sm font-medium">
              Apartments
            </label>
          </div>

          <div className="mb-2 flex items-center">
            <input
              id="Bedspaces"
              type="checkbox"
              value=""
              className="ml-3 h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
            />
            <label htmlFor="Bedspaces" className="ml-2 text-sm font-medium">
              Bedspaces
            </label>
          </div>

          <div className="mb-2 flex items-center">
            <input
              id="Dormitories"
              type="checkbox"
              value=""
              className="ml-3 h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
            />
            <label htmlFor="Dormitories" className="ml-2 text-sm font-medium">
              Dormitories
            </label>
          </div>

          <div className="mb-2 flex items-center">
            <input
              id="Hotels"
              type="checkbox"
              value=""
              className="ml-3 h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
            />
            <label htmlFor="Hotels" className="ml-2 text-sm font-medium">
              Hotels
            </label>
          </div>

          <div className="flex items-center">
            <input
              id="Transients"
              type="checkbox"
              value=""
              className="ml-3 h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
            />
            <label htmlFor="Transients" className="ml-2 text-sm font-medium">
              Transients
            </label>
          </div>
        </div>

        {/* Price Range */}
        <div className="mb-4">
          <h2 className="mb-2 text-base font-bold">Price Range</h2>
          <div className="mb-2 flex items-center">
            <input
              id="below-1000"
              type="checkbox"
              value=""
              className="ml-3 h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
            />
            <label htmlFor="below-1000" className="ml-2 text-sm font-medium">
              Below ₱ 1000
            </label>
          </div>

          <div className="mb-2 flex items-center">
            <input
              id="one-to-two"
              type="checkbox"
              value=""
              className="ml-3  h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
            />
            <label htmlFor="one-to-two" className="ml-2 text-sm font-medium">
              ₱ 1000 – ₱ 2000{" "}
            </label>
          </div>

          <div className="mb-2 flex items-center">
            <input
              id="two-to-three"
              type="checkbox"
              value=""
              className="ml-3  h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
            />
            <label htmlFor="two-to-three" className="ml-2 text-sm font-medium">
              ₱ 2001 – ₱ 3000{" "}
            </label>
          </div>

          <div className="mb-2 flex items-center">
            <input
              id="three-to-four"
              type="checkbox"
              value=""
              className="ml-3 h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
            />
            <label htmlFor="three-to-four" className="ml-2 text-sm font-medium">
              ₱ 3001 – ₱ 4000{" "}
            </label>
          </div>

          <div className="flex items-center">
            <input
              id="above-four"
              type="checkbox"
              value=""
              className="ml-3 h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
            />
            <label htmlFor="above-four" className="ml-2 text-sm font-medium">
              Above ₱ 4001
            </label>
          </div>
        </div>

        {/* Capacity */}
        <div className="mb-4 flex flex-col">
          <h2 className="mb-2 text-base font-bold">Capacity</h2>
          <label className="mb-1">
            <input
              type="radio"
              className="form-radio ml-3"
              name="radio-group"
              value="option1"
              defaultChecked
            />
            <span className="ml-2 font-medium">Solo</span>
          </label>

          <label className="mb-1">
            <input
              type="radio"
              className="form-radio ml-3"
              name="radio-group"
              value="option1"
              defaultChecked
            />
            <span className="ml-2 font-medium">2 Persons</span>
          </label>

          <label className="mb-1">
            <input
              type="radio"
              className="form-radio ml-3"
              name="radio-group"
              value="option1"
              defaultChecked
            />
            <span className="ml-2 font-medium">3 Persons</span>
          </label>

          <label className="mb-1">
            <input
              type="radio"
              className="form-radio ml-3"
              name="radio-group"
              value="option1"
              defaultChecked
            />
            <span className="ml-2 font-medium">4 Persons</span>
          </label>

          <label className="">
            <input
              type="radio"
              className="form-radio ml-3"
              name="radio-group"
              value="option1"
              defaultChecked
            />
            <span className="ml-2 font-medium">More than 4</span>
          </label>
        </div>

        {/* Include */}
        <div className="mb-4">
          <h2 className="mb-2 text-base font-bold">Include</h2>
          <input
            className="rounded-2xl px-3 py-1"
            placeholder="Type for suggestions..."
          ></input>
        </div>
      </div>
    </>
  );
}

const Location: React.FC = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const toggleDropdown = () => {
    setShowDropdown((prevState) => !prevState);
  };

  return (
    <div className="">
      <button
        className="flex inline-flex w-full items-center items-center justify-center rounded-lg bg-white px-12 py-1 text-center font-medium text-black hover:bg-p-dblue focus:outline-none focus:outline-none focus:ring-2 focus:ring-p-dblue dark:bg-white dark:hover:bg-p-dblue dark:focus:ring-p-dblue"
        onClick={toggleDropdown}
      >
        Location
        <svg
          className="ml-2 h-4 w-4"
          aria-hidden="true"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 9l-7 7-7-7"
          ></path>
        </svg>
      </button>
      {showDropdown && (
        <div
          id="dropdownBgHover"
          className="mt-1 rounded-lg bg-white p-1 shadow shadow-lg dark:bg-white"
        >
          <ul
            className="flex flex-col space-y-1 text-black dark:text-black"
            aria-labelledby="dropdownBgHoverButton"
          >
            <li>
              <div className="flex h-auto w-auto items-center rounded p-2 hover:bg-gray-500 dark:hover:bg-p-dblue">
                <input
                  id="checkbox-item-4"
                  type="checkbox"
                  value=""
                  className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-500 dark:bg-gray-600 dark:ring-offset-gray-700 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-700"
                ></input>
                <label className="ml-2 rounded text-sm font-medium text-black dark:text-black">
                  Batong Malake
                </label>
              </div>
            </li>
            <li>
              <div className="flex h-auto w-auto items-center rounded p-2 hover:bg-gray-500 dark:hover:bg-p-dblue">
                <input
                  id="checkbox-item-4"
                  type="checkbox"
                  value=""
                  className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-500 dark:bg-gray-600 dark:ring-offset-gray-700 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-700"
                ></input>
                <label className="ml-2 rounded text-sm font-medium text-black dark:text-black">
                  Batong Maleet
                </label>
              </div>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};
