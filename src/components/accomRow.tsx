import { api } from "~/utils/api";
import {
  JSXElementConstructor,
  PromiseLikeOfReactNode,
  ReactElement,
  ReactFragment,
  ReactNode,
  ReactPortal,
  useState,
} from "react";
import Image from "next/image";
import Link from "next/link";

export default function AccomRow(props: {
  barangay: string | undefined | null;
}) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [multiplier, setMultiplier] = useState(8);

  const toggleDropdown = () => {
    setShowDropdown((prevState) => !prevState);
  };

  const toggleMultiplier = () => {
    setMultiplier((prevMultiplier) => (prevMultiplier === 8 ? 16 : 8)); // Step 2: Toggle multiplier value
  };

  return (
    <div className="flex flex-col">
      <div className="mb-3 flex flex-row items-center">
        <h1 className="mr-4 text-2xl font-bold">{props.barangay}</h1>

        <button
          className="mr-2 flex items-center rounded-full bg-p-dblue px-3 py-2 text-xs font-bold text-white hover:bg-sky-600"
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
          <div className="absolute left-[28rem] top-36 w-[10rem] rounded-lg bg-white p-3 pt-0 text-sm shadow-lg">
            <Link className="dropdown-buttons" href={"/"}>
              Name
            </Link>
            <Link className="dropdown-buttons" href={"/"}>
              Rating
            </Link>
            <Link className="dropdown-buttons" href={"/"}>
              Availability
            </Link>
          </div>
        )}
        <button className="mr-2 rounded-full bg-p-dblue px-3 py-2 text-xs font-bold text-white hover:bg-sky-600">
          Download PDF
        </button>

        <button
          id="see-more-button"
          className="mr-4 rounded-full bg-p-gray px-3 py-2 text-xs font-bold text-black hover:bg-gray-400"
          onClick={() => {
            toggleShow();
            toggleMultiplier();
          }}
        >
          See More
        </button>
      </div>
      <div className="flex flex-row flex-wrap ">
        {/* <Accoms barangay={props.barangay} /> */}
        <Accoms multiplier={multiplier} barangay={props.barangay} />
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

// const Accoms: React.FC<{ barangay:string }> = (barangay)  => {
const Accoms: React.FC<{
  multiplier: number;
  barangay: string | undefined | null;
}> = ({ multiplier, barangay }) => {
  // const { data: firstData, isLoading: queryLoading } =
  // api.file.r2getfiles.useQuery();
  const { data: firstData, isLoading: queryLoading } =
    api.accommodation.getMany.useQuery({
      page: 0,
      multiplier: multiplier,
      barangay: barangay!,
    });

  // const accommodations =
  //  api.accommodation.getMany.useQuery({
  //    barangay: barangay!,
  //   });

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
