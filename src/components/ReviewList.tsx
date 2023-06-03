import { useEffect, useState } from "react";
import { type z } from "zod";
import { type RouterOutputs, api } from "~/utils/api";
import { type reviewGetInfSchema } from "~/utils/apitypes";
import ReviewItem from "./reviewItem";
import LoadingSpinner from "./loadingSpinner";

export const ReviewList: React.FC<{
  accomId: string;
  refreshComponent: number;
}> = ({ accomId, refreshComponent }) => {
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

  useEffect(() => {
    setUserInputs({
      accommodationId: accomId,
      limit: 5,
    });
    void refetch();
  }, [accomId, refetch, refreshComponent]);

  return (
    <div className="h-full">
      {reviews ? (
        reviews?.pages.map((page, i: number) => (
          <GetReviews key={i} items={page?.items} />
        ))
      ) : (
        <LoadingSpinner />
      )}

      {isFetchingNextPage ? (
        <LoadingSpinner />
      ) : hasNextPage ? (
        <div className="w-full text-center">
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
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default ReviewList;

const GetReviews: React.FC<{
  items: RouterOutputs["review"]["getMany"];
}> = ({ items }) => {
  if (items && items.length != 0) {
    return (
      <>
        {items?.map(({ id, user, date, time, review, rating }) => (
          <ReviewItem
            key={id}
            id={id}
            user={user}
            date={date}
            time={time}
            review={review}
            rating={rating}
          />
        ))}
      </>
    );
  }

  return (
    <div className="flex h-40 items-center justify-center text-center">
      <p className="w-[60%]">This accommodation has no reviews yet.</p>
    </div>
  );
};
