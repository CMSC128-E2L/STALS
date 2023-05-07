import { api } from "~/utils/api";
import { useState } from "react";
import Image from "next/image";

export default function AccomRow() {
  return (
    <div className="flex flex-col">
      <div className="mb-4 flex flex-row items-center">
        <h1 className="mr-4 font-bold">Batong Malake</h1>
        <button className="mr-2 rounded-lg bg-p-dblue px-2 py-2 text-xs font-bold text-white hover:bg-sky-600">
          Download PDF
        </button>

        <button
          id="see-more-button"
          className="mr-4 rounded-lg bg-p-gray px-2 py-2 text-xs font-bold text-black hover:bg-gray-400"
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
  const { data: firstData, isLoading: queryLoading } =
    api.file.r2getfiles.useQuery();
  const [count, setCount] = useState(false);

  setTimeout(() => setCount(true), 5000);

  // actual output
  if (!queryLoading && count) {
    return (
      <>
        {firstData?.map((x: string) => (
          <div
            key={x}
            className="relative -z-30 mr-4 mt-4 h-64 w-64 rounded-xl border bg-p-gray"
          >
            <Image
              src={`${x}`}
              alt={x}
              key={x}
              fill
              className="h-64 w-64 object-cover p-4"
            />
          </div>
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
