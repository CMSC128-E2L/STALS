import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { RouterOutputs, api } from "~/utils/api";
import { reviewGetInfSchema } from "~/utils/apitypes";
import ReviewItem from "./reviewItem";
import LoadingSpinner from "./loadingSpinner";

export default function TryReview() {
  const [userInputs, setUserInputs] = useState<
    z.infer<typeof reviewGetInfSchema>
  >({
    accommodationId: undefined,
  });
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
    isLoading,
    isError,
  } = api.accommodation.getManyExperiment.useInfiniteQuery(userInputs, {
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });

  return (
    <div className="h-full">
      {reviews ? (
        reviews?.pages.map((page, i: number) => (
          <GetReviews key={i} items={page?.items} />
        ))
      ) : (
        <LoadingSpinner />
      )}
    </div>
  );
}

const GetReviews: React.FC<{
  items: RouterOutputs["review"]["getInfinite"] | undefined;
}> = ({ items }) => {
  if (items) {
    return (
      <>
        {items?.map(({ id, user, datePosted, time, review, rating }) => (
          <ReviewItem
            id={id}
            user={user}
            datePosted={datePosted}
            time={time}
            review={review}
            rating={rating}
          />
        ))}
      </>
    );
  }
};
