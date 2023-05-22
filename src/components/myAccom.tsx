import OwnerAccommodations from "./OwnerAccommodations";

export const MyAccom: React.FC<{ showArchived: boolean }> = ({
  showArchived,
}) => {
  return (
    <div className="flex flex-col">
      <div className="mb-4 flex flex-row items-center">
        <h1 className="mr-4 text-xl font-bold">
          My {showArchived ? "Archived" : "Accomodations"}
        </h1>
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
      <div className="grid grid-cols-4 place-content-evenly gap-2">
        <OwnerAccommodations showArchived={showArchived} />
      </div>
      <div id="more-content" className="max-h-0 overflow-hidden transition-all">
        <p>Additional content here...</p>
      </div>
    </div>
  );
};

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

export default MyAccom;
