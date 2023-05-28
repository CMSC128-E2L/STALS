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
      </div>
      <p>No {showArchived ? "Archived" : "Accomodations"} yet</p>
      <div className="grid grid-cols-4 place-content-evenly gap-2">
        <OwnerAccommodations showArchived={showArchived} />
      </div>
    </div>
  );
};

export default MyAccom;
