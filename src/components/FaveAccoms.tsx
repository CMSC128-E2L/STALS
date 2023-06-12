import { type RouterInputs, api } from "~/utils/api";
import { useSession } from "next-auth/react";
import SearchItem from "./SearchItem";
import { useEffect } from "react";
import { stalsDBstringArray } from "~/utils/helpers";

export const FaveAccoms: React.FC = () => {
  const session = useSession();
  const {
    data: favorites,
    isLoading: queryLoading,
    refetch,
    isFetching,
  } = api.user.getFavorites.useQuery();

  useEffect(() => {
    if (!queryLoading && session.data) {
      void refetch();
    }
  }, [queryLoading, session.data]);

  if (!queryLoading && session.data) {
    return (
      <>
        {isFetching ? (
          <>
            <div className="-z-30 ml-4 mr-4 mt-4 h-64 w-64 animate-pulse rounded-xl border bg-p-gray"></div>
            <div className="ml-4h-64 -z-30 mr-4 mt-4 w-64 animate-pulse rounded-xl border bg-p-gray"></div>
            <div className="-z-30 ml-4 mr-4 mt-4 h-64 w-64 animate-pulse rounded-xl border bg-p-gray"></div>
            <div className="-z-30 ml-4 mr-4 mt-4 h-64 w-64 animate-pulse rounded-xl border bg-p-gray"></div>
          </>
        ) : favorites && favorites.length > 0 ? (
          <>
            {favorites?.map((favorite) => (
              <SearchItem
                key={favorite.accommodation.id + favorite.accommodation.name}
                id={favorite.accommodation.id}
                name={favorite.accommodation.name}
                price={
                  favorite.accommodation.price !== undefined &&
                  favorite.accommodation.price !== null
                    ? favorite.accommodation.price.toFixed(2)
                    : ""
                }
                location={favorite.accommodation.barangay}
                average_rating={favorite.accommodation.average_rating ?? 0}
                type={stalsDBstringArray(favorite.accommodation.typeArray)}
                tags={stalsDBstringArray(favorite.accommodation.tagArray)}
              />
            ))}
          </>
        ) : (
          <p className="justify center mt-5 text-sm italic text-gray-400">
            No favorites added.
          </p>
        )}
      </>
    );
  }

  // waiting for query output
  return (
    <>
      <div className="-z-30 ml-4 mr-4 mt-4 h-64 w-64 animate-pulse rounded-xl border bg-p-gray"></div>
      <div className="ml-4h-64 -z-30 mr-4 mt-4 w-64 animate-pulse rounded-xl border bg-p-gray"></div>
      <div className="-z-30 ml-4 mr-4 mt-4 h-64 w-64 animate-pulse rounded-xl border bg-p-gray"></div>
      <div className="-z-30 ml-4 mr-4 mt-4 h-64 w-64 animate-pulse rounded-xl border bg-p-gray"></div>
    </>
  );
};

export default FaveAccoms;
