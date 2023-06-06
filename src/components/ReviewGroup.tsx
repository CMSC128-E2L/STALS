import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { api } from "~/utils/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { reviewAddSchema } from "~/utils/apitypes";
import { dynamicRouteID } from "~/utils/helpers";
import { useRouter } from "next/router";
import { useEffect } from "react";
import StarRating from "./StarRating";
import ReviewList from "~/components/ReviewList";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import FormError from "./formError";
import { type z } from "zod";
import { UserType } from "@prisma/client";

export default function ReviewGroup() {
  const { id } = dynamicRouteID(useRouter());
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<z.infer<typeof reviewAddSchema>>({
    resolver: zodResolver(reviewAddSchema),
    defaultValues: {
      accommodationId: id,
      rating: 0,
    },
  });

  useEffect(() => {
    setValue("accommodationId", id);
  }, [id, setValue]);

  const [refreshReviewComponent, setrefreshReviewComponent] = useState(0);

  const addReview = api.review.add.useMutation({
    onSuccess: () => {
      toast.success("Successfully Added Review!", {
        position: "bottom-right",
        duration: 2000,
      });
      void reset();
      setRating(0);
      setValue("rating", 0);
      setrefreshReviewComponent((prev) => prev + 1);
    },
    onError: () => {
      toast.error("Review failed to submit!", {
        position: "bottom-center",
        duration: 3000,
      });
    },
  });

  const [rating, setRating] = useState(0); // State for storing the selected rating

  const handleRatingChange = (selectedRating: number) => {
    setRating(selectedRating);
    setValue("rating", selectedRating); // Set the value of the "rating" field in the form
  };

  const { data: userSession } = useSession();
  const isUser = userSession && userSession.profile.type === UserType.USER;

  const ReviewFrom = () => {
    return (
      <>
        <div className="w-auto flex-row ">
          <form
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            onSubmit={handleSubmit(
              (data: {
                accommodationId: string;
                rating: number;
                review?: string | undefined;
                time?: string | undefined;
                date?: string | undefined;
              }) => {
                addReview.mutate(data);
              },
              (error) => {
                // console.log(error);
              },
            )}
          >
            <div className="mb-4 w-full rounded-[15px] border border-gray-200 bg-gray-50">
              <div className="grid grid-cols-2 justify-items-stretch">
                <div className="flex items-center py-2 pl-4">
                  <h1 className="text-start text-2xl font-bold">
                    Write a Review
                  </h1>
                </div>
                <div className="flex items-center justify-end pr-4 pt-2 text-gray-800">
                  {/* <Link
                      href="ye"
                      className="pt-0 text-end text-xxs underline"
                    >
                      Report a problem
                    </Link> */}
                </div>
              </div>

              <div className="rounded-b-lg bg-white px-4 py-2">
                <label htmlFor="editor" className="sr-only">
                  Publish Post
                </label>
                <textarea
                  id="editor"
                  rows={3}
                  className="block w-full border-0 bg-white px-3 pt-2 text-sm text-gray-800 focus:ring-0"
                  placeholder="Share your thoughts on the accommodation"
                  {...register("review")}
                ></textarea>

                <StarRating
                  totalStars={5}
                  initialRating={rating}
                  onChange={handleRatingChange}
                  refreshComponent={refreshReviewComponent}
                />
                <FormError error={errors.rating?.message} />
              </div>

              <div className="grid py-2">
                <div className="justify-self-end pr-2">
                  <button
                    type="submit"
                    className="inline-flex items-center justify-self-end rounded-lg bg-p-dviolet px-10 py-2 text-center text-sm font-medium text-white hover:bg-p-dbviolet focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900"
                  >
                    Publish Post
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </>
    );
  };

  return (
    <div className="overflow-y-auto">
      <div className="grid grid-cols-1 justify-items-stretch gap-4">
        {isUser ? (
          <ReviewFrom />
        ) : (
          <h1 className="text-2xl font-bold text-p-dbviolet">Reviews</h1>
        )}
        <ReviewList accomId={id} refreshComponent={refreshReviewComponent} />
      </div>
    </div>
  );
}
