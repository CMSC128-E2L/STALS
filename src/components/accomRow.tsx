import { api } from "~/utils/api";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function AccomRow() {
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown((prevState) => !prevState);
  };

  return (
    <div className="flex flex-col">
      <div className="mb-4 flex flex-row items-center">
        <h1 className="mr-4 text-xl font-bold">Batong Malake</h1>

        <button
          className="mr-2 flex items-center rounded-full bg-p-dblue px-3 py-2 text-xs font-bold text-white hover:bg-sky-600"
          // className="flex items-center items-center justify-center rounded-full mr-2 rounded-full bg-p-dblue px-1 py-1 text-xs font-bold text-white hover:bg-sky-600"
          onClick={toggleDropdown}
        >
          Sort By
          <svg
            className="ml-2 h-3 w-3"
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
          <div id="dropdownBgHover" className="relative inline-block text-left">
            <ul
              className="absolute left-0 mt-2 flex flex-col space-y-1 bg-white p-1 text-black shadow shadow-lg dark:bg-white dark:text-black"
              aria-labelledby="dropdownBgHoverButton"
            >
              <li className="">
                <div className="flex h-auto w-auto items-center rounded p-2 hover:bg-p-gray dark:hover:bg-p-dblue">
                  <label
                    htmlFor="batong-malaki"
                    className="ml-2 rounded text-sm font-medium text-black dark:text-black"
                  >
                    Top Rated
                  </label>
                </div>
              </li>
              <li>
                <div className="flex h-auto w-auto items-center rounded p-2 hover:bg-p-gray dark:hover:bg-p-dblue">
                  <label
                    htmlFor="batong-maliit"
                    className="ml-2 rounded text-sm font-medium text-black dark:text-black"
                  >
                    Availability
                  </label>
                </div>
              </li>
              <li>
                <div className="flex h-auto w-auto items-center rounded p-2 hover:bg-p-gray dark:hover:bg-p-dblue">
                  <label
                    htmlFor="batong-maliit"
                    className="ml-2 rounded text-sm font-medium text-black dark:text-black"
                  >
                    Name
                  </label>
                </div>
              </li>
            </ul>
          </div>
        )}
        <button className="mr-2 rounded-full bg-p-dblue px-3 py-2 text-xs font-bold text-white hover:bg-sky-600">
          Download PDF
        </button>

        <button
          id="see-more-button"
          className="mr-4 rounded-full bg-p-gray px-3 py-2 text-xs font-bold text-black hover:bg-gray-400"
          onClick={() => toggleShow()}
        >
          See More
        </button>
      </div>
      <div className="flex flex-row flex-wrap ">
        <Accoms />
      </div>
      <div id="more-content" className="max-h-0 overflow-hidden transition-all">
        <p>Additional content here...</p>
      </div>
    </div>
  );
}

function toggleShow() {
  const div = document.querySelector(".max-h-0");
  div?.classList.toggle("max-h-screen");
  div?.classList.toggle("overflow-auto");
  const button = document.getElementById("see-more-button");

  if (button != null) {
    button.innerHTML =
      button?.innerHTML === "See More" ? "See Less" : "See More";
  }
}

const Accoms: React.FC = () => {
  // const { data: firstData, isLoading: queryLoading } =
  // api.file.r2getfiles.useQuery();
  const { data: firstData, isLoading: queryLoading } =
    api.accommodation.getMany.useQuery({
      page: 0,
      multiplier: 5,
      location: "",
    });
  const [count, setCount] = useState(false);

  setTimeout(() => setCount(true), 5);

  // actual output
  if (!queryLoading && count) {
    return (
      <>
        {firstData?.map(({ id, name }) => (
          <Link key={id} href={`/accommodation/${id}`}>
            <div className="relative -z-30 mr-4 mt-4 h-64 w-64 rounded-xl border bg-p-gray">
              {name}
              {/* <Image
                src={`${x}`}
                alt={x}
                fill
                className="h-64 w-64 object-cover p-4"
                unoptimized
              /> */}
            </div>
          </Link>
        ))}
      </>
    );
  }

  // waiting for query output
  return (
    <>
      <div className="-z-30 mr-4 mt-4 h-64 w-64 animate-pulse rounded-xl border bg-p-gray"></div>
      <div className="-z-30 mr-4 mt-4 h-64 w-64 animate-pulse rounded-xl border bg-p-gray"></div>
      <div className="-z-30 mr-4 mt-4 h-64 w-64 animate-pulse rounded-xl border bg-p-gray"></div>
      <div className="-z-30 mr-4 mt-4 h-64 w-64 animate-pulse rounded-xl border bg-p-gray"></div>
    </>
  );
};
