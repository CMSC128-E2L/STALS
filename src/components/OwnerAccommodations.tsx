import { type RouterInputs, api } from "~/utils/api";
import { type Accommodation } from "@prisma/client";
import { useSession } from "next-auth/react";
import SearchItem from "./SearchItem";

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
            {firstData?.map(({ id, name, price, barangay, tags }) => (
              <SearchItem
                key={id + name}
                id={id}
                name={name}
                price={price}
                location={barangay}
                tags={tags}
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
