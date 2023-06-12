import { useEffect, useState } from "react";
import { type z } from "zod";
import { api } from "~/utils/api";
import { type reviewGetInfSchema } from "~/utils/apitypes";
import ReviewItem from "./reviewItem";
import LoadingSpinner from "./loadingSpinner";
import { useSession } from "next-auth/react";

export const ReviewList: React.FC<{
  accomId: string;
  refreshComponent: number;
  refreshComponentFunction: () => void;
}> = ({ accomId, refreshComponent, refreshComponentFunction }) => {
  const { data: userSession } = useSession();

  const [userInputs, setUserInputs] = useState<
    z.infer<typeof reviewGetInfSchema>
  >({
    accommodationId: accomId,
    limit: 5,
  });

  const {
    data: reviews,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    isLoading,
    isError,
    refetch,
  } = api.review.getInfinite.useInfiniteQuery(userInputs, {
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });

  const RefetchUserInputs = () => {
    setUserInputs({
      accommodationId: accomId,
      limit: 5,
    });
    void refetch();
    void refreshComponentFunction();
  };

  useEffect(() => {
    void RefetchUserInputs();
  }, [accomId, refreshComponent]);

  return (
    <div className="h-full">
      {reviews ? (
        reviews?.pages.map((page, i: number) =>
          page && page?.items.length != 0 ? (
            <>
              {page?.items?.map(
                ({ id, accommodationId, user, date, time, review, rating }) => (
                  <ReviewItem
                    key={id}
                    id={id}
                    accommodationId={accommodationId}
                    user={user}
                    date={date}
                    time={time}
                    review={review}
                    rating={rating}
                    refetch={RefetchUserInputs}
                  />
                ),
              )}
            </>
          ) : (
            <div
              key={i}
              className="flex h-40 items-center justify-center text-center"
            >
              <p className="w-[60%]">This accommodation has no reviews yet.</p>
            </div>
          ),
        )
      ) : (
        <LoadingSpinner />
      )}

      {isFetchingNextPage ? (
        <LoadingSpinner />
      ) : hasNextPage ? (
        <div className="w-full text-center">
          {userSession && (
            <button
              className="button-style m-5 w-[50%]"
              onClick={() => {
                void fetchNextPage();
                // eslint-disable-next-line
                setUserInputs((prevInputs: any) => ({
                  ...prevInputs,
                }));
              }}
              disabled={!hasNextPage || isFetchingNextPage}
            >
              Load More
            </button>
          )}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default ReviewList;
