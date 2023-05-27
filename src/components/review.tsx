import { useForm } from "react-hook-form";
import { type RouterInputs, api } from "~/utils/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { reviewAddSchema } from "~/utils/apitypes";
import Link from "next/link";
import { dynamicRouteID } from "~/utils/helpers";
import { useRouter } from "next/router";
import { useEffect } from "react";
import UserProfile from "~/components/userProfile";

export default function Review() {
  const { shouldReturn, id } = dynamicRouteID(useRouter());
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
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

  const handleFormSubmit = (data) => {
    addReview.mutate(data);
  };

  return (
    <div className="h-50 grid grid-cols-1 justify-items-stretch gap-4">
      <div className="w-auto flex-row space-x-[2%] pl-3 pt-5">
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <div className="mb-4 w-full rounded-[15px] border border-gray-200 bg-gray-50">
            <div className="grid h-10 grid-cols-2 justify-items-stretch gap-4 pl-4">
              <div className="flex items-center">
                <h1 className="text-start text-2xl font-bold">
                  Ratings and Reviews
                </h1>
              </div>
              <div className="flex items-center justify-end pr-4 pt-2 text-gray-800">
                <Link href="ye" className="pt-3 text-end text-xxs underline">
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
                placeholder="Write a review"
                {...register("review")}
              ></textarea>

              <input
                type="number"
                placeholder="Rating"
                {...register("rating", { valueAsNumber: true })}
              ></input>
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

      <div className="h-60 pl-3 pt-1">
        <div className="mb-4 h-full w-full overflow-y-scroll rounded-[15px] border border-gray-200 bg-gray-50">
          <div>
            <UserProfile />
            <div className="flex flex-row rounded-md bg-white pl-20">
              <p className="line-clamp-2 text-sm">
                With the sects clashing against one another, there was no one
                who could blablahblahblah ye
              </p>
            </div>
          </div>

          <div>
            <UserProfile />
            <div className="flex flex-row rounded-md bg-white pl-20">
              <p className="line-clamp-2 text-sm">
                With the sects clashing against one another, there was no one
                who could blablahblahblah ye
              </p>
            </div>
          </div>
          <div>
            <UserProfile />
            <div className="flex flex-row rounded-md bg-white pl-20">
              <p className="line-clamp-2 text-sm">
                With the sects clashing against one another, there was no one
                who could blablahblahblah ye
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
