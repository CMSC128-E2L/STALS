import { type RouterInputs, api } from "~/utils/api";
import { useSession } from "next-auth/react";
import SearchItem from "./SearchItem";
import { useEffect } from "react";

export const FaveAccoms: React.FC = () => {
  const session = useSession();
  const {
    data: favorites,
    isLoading: queryLoading,
    refetch,
  } = api.user.getFavorites.useQuery();

  useEffect(() => {
    // Refetch favorites data whenever the favorites change
    if (!queryLoading && session.data) {
      void refetch();
    }
  }, [queryLoading, session.data]);

  if (!queryLoading && session.data) {
    return (
      <>
        {favorites && favorites.length > 0 ? (
          <>
            {favorites?.map((favorite) => (
              <SearchItem
                key={favorite.accommodation.id + favorite.accommodation.name}
                id={favorite.accommodation.id}
                name={favorite.accommodation.name}
                price={favorite.accommodation.price}
                location={favorite.accommodation.location}
                tags={favorite.accommodation.tags}
              />
            ))}
          </>
        ) : (
          <p className="text-sm italic text-gray-400">No favorites added.</p>
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
