import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { type RouterInputs, api } from "~/utils/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { reviewAddSchema } from "~/utils/apitypes";
import Link from "next/link";
import { dynamicRouteID } from "~/utils/helpers";
import { useRouter } from "next/router";
import { useEffect } from "react";
import StarRating from "./StarRating";
import TryReview from "~/components/tryreview";
import { useSession } from "next-auth/react";

export default function Review() {
  const { id } = dynamicRouteID(useRouter());
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    getValues,
  } = useForm<RouterInputs["review"]["add"]>({
    resolver: zodResolver(reviewAddSchema),
    defaultValues: {
      accommodationId: "",
    },
  });

  useEffect(() => {
    setValue("accommodationId", id);
  }, [id, setValue]);

  const addReview = api.review.add.useMutation();

  const handleFormSubmit = (data: {
    accommodationId: string;
    rating: number;
    review?: string | undefined;
    time?: string | undefined;
    date?: string | undefined;
  }) => {
    addReview.mutate(data);
  };

  const [rating, setRating] = useState(0); // State for storing the selected rating

  const handleRatingChange = (selectedRating: number) => {
    setRating(selectedRating);
    setValue("rating", selectedRating); // Set the value of the "rating" field in the form
  };

  const { data: userSession } = useSession();

  return (
    <div className="scrollbar overflow-y-auto pt-8">
      <div className="grid grid-cols-1 justify-items-stretch gap-4">
        {userSession !== null && (
          <div className="w-auto flex-row ">
            {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
            <form onSubmit={handleSubmit(handleFormSubmit)}>
              <div className="mb-4 w-full rounded-[15px] border border-gray-200 bg-gray-50">
                <div className="grid h-10 grid-cols-2 justify-items-stretch gap-4 pl-4">
                  <div className="flex items-center">
                    <h1 className="text-start text-2xl font-bold">
                      Write a Review
                    </h1>
                  </div>
                  <div className="flex items-center justify-end pr-4 pt-2 text-gray-800">
                    <Link
                      href="ye"
                      className="pt-0 text-end text-xxs underline"
                    >
                      Report a problem
                    </Link>
                  </div>
                </div>

                <div className="rounded-b-lg bg-white px-4 py-2">
                  <label htmlFor="editor" className="sr-only">
                    Publish post
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
                  />
                </div>

                <div className="grid h-10 grid-cols-1 justify-items-stretch px-2 pt-2">
                  <div className="justify-self-end pr-2">
                    <button
                      type="submit"
                      className="inline-flex items-center justify-self-end rounded-lg bg-blue-700 px-10 py-1 text-center text-sm font-medium text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900"
                    >
                      Publish post
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        )}
        <TryReview accomId={id} />
      </div>
    </div>
  );
}
