import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { type z } from "zod";
import { RouterOutputs, api } from "~/utils/api";
import { reviewGetInfSchema } from "~/utils/apitypes";
import ReviewItem from "./reviewItem";
import LoadingSpinner from "./loadingSpinner";
import { type Review, type User } from "@prisma/client";

export const TryReview: React.FC<{ accomId: string; refetchReviews: any }> = ({
  accomId,
  refetchReviews,
}) => {
  const [userInputs, setUserInputs] = useState<
    z.infer<typeof reviewGetInfSchema>
  >({
    accommodationId: accomId,
    limit: 5,
  });

  console.log(accomId);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(reviewGetInfSchema),
  });

  const {
    data: reviews,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    isLoading,
    isError,
  } = api.review.getInfinite.useInfiniteQuery(userInputs, {
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });

  useEffect(() => {
    if (typeof refetchReviews === "function") {
      (refetchReviews as () => void)();
    }
  }, [refetchReviews]);

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

export default TryReview;

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

  return <></>;
};
