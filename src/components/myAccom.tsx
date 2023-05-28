import OwnerAccommodations from "./OwnerAccommodations";

export const MyAccom: React.FC<{ showArchived: boolean }> = ({
  showArchived,
}) => {
  return (
    <div className="flex w-full flex-col">
      <div className="mb-4 flex flex-row items-center">
        <h1 className="mr-4 text-xl font-bold">
          My {showArchived ? "Archived" : "Accomodations"}
        </h1>
      </div>
      <div className="flex flex-wrap">
        <OwnerAccommodations showArchived={showArchived} />
      </div>
    </div>
  );
};

export default MyAccom;
