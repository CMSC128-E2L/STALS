import { type RouterInputs, api } from "~/utils/api";
import { type Accommodation } from "@prisma/client";
import { useSession } from "next-auth/react";
import SearchItem from "./SearchItem";
import { stalsDBstringArray } from "~/utils/helpers";

export const OwnerAccommodations: React.FC<{ showArchived: boolean }> = ({
  showArchived,
}) => {
  const session = useSession();
  const query: RouterInputs["accommodation"]["getMany"] = {
    landlord: session.data?.user.id,
    is_archived: showArchived,
  };

  const { data: firstData, isLoading: queryLoading } =
    api.accommodation.getMany.useQuery(query);

  if (!queryLoading && session.data) {
    return (
      <>
        {firstData ? (
          <>
            {firstData?.map(({ id, name, price, barangay, tagArray }) => (
              <SearchItem
                key={id + name}
                id={id}
                name={name}
                price={
                  price !== undefined && price !== null ? price.toFixed(2) : ""
                }
                location={barangay}
                tags={stalsDBstringArray(tagArray)}
              />
            ))}
          </>
        ) : (
          <p>No content</p>
        )}
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

export default OwnerAccommodations;
