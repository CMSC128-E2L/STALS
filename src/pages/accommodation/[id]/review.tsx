import NavBar from "~/components/navbar";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { reviewAddSchema } from "~/utils/apitypes";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { type RouterInputs, api } from "~/utils/api";
import { dynamicRouteID } from "~/utils/helpers";
import { useEffect } from "react";
import UserProfile from "~/components/userProfile";

export default function Accommodation() {
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

  const { data: firstData, isLoading: queryLoading } =
    api.accommodation.getOne.useQuery(id);

  const { data: ImageList, isLoading: imageLoading } =
    api.file.getAccommImages.useQuery({ id });

  return (
    <div className="flex h-screen flex-col">
      {/* HEADER */}
      <NavBar />

      {/* BODY */}
      <div className="mt-10 flex flex-auto flex-col pt-10">
        {/* LANDLORD PROFILE 
        CAN BE MADE INTO A COMPONENT */}
        {/* <div className="position-left ml-10 mt-10 w-1/4 p-4 py-3">
          <UserProfile />
        </div> */}

        {/* cONTAINS THE ACCOMMODATION INFO */}
        <div className="flex flex-row justify-center object-contain">
          {/* Box that contains the accommodation thingy */}
          <div className="margin-40 flex w-11/12 gap-2 rounded-md bg-p-lblue p-4 py-4 shadow-md">
            {/* GALLERY */}
            <div className="w-1/3 flex-none p-4">
              <div className="grid grid-cols-2 gap-4">
                {/* main image */}
                {!imageLoading && ImageList ? (
                  ImageList?.length > 0 ? (
                    ImageList?.map((src, i) => {
                      if (i == 0) {
                        return (
                          <div
                            key={i}
                            className="max-w relative col-span-2 aspect-square"
                          >
                            <Image
                              className="rounded-lg object-cover"
                              src={src}
                              alt="image"
                              fill
                              unoptimized
                            />
                          </div>
                        );
                      } else {
                        return (
                          <div key={i} className="max-w relative aspect-video">
                            <Image
                              className="rounded-lg object-cover"
                              src={src}
                              alt="image"
                              fill
                              unoptimized
                            />
                          </div>
                        );
                      }
                    })
                  ) : (
                    <div className="max-w relative col-span-2 aspect-square rounded-md bg-gray-400 text-center">
                      No Image
                    </div>
                  )
                ) : (
                  <>
                    <div className="max-w relative col-span-2 aspect-square animate-pulse rounded-md bg-gray-400"></div>
                    <div className="max-w relative aspect-video animate-pulse rounded-md bg-gray-400"></div>
                    <div className="max-w relative aspect-video animate-pulse rounded-md bg-gray-400"></div>
                  </>
                )}
              </div>
            </div>

            <div className="flex w-3/4 flex-initial flex-col p-4">
              {/* ACCOMMODATION NAME + edit + delete thngy idk*/}
              <div className="flex flex-row items-stretch">
                {/* Left column (accommodation name) */}
                <div className="flex w-3/4 items-center px-3">
                  {!queryLoading ? (
                    <h1 className="form-h1">{firstData?.name}</h1>
                  ) : (
                    <h1 className="form-h1 w-[100%] animate-pulse rounded-full bg-gray-400">
                      &nbsp;&nbsp;
                    </h1>
                  )}
                </div>

                {/* Right column: the editing thingy ig */}
                <div className="basis-1/4">
                  {/* TODO: So if a registered user is viewing it (remove hidden to show teehee)
                  
                  WONDERING KUNG UNG IMPLEMENTATION NA LANG NITO VIA COMPONENT OR NAH*/}
                  <div className="float-right cursor-pointer">
                    <form>
                      <input
                        type="checkbox"
                        value="favorite"
                        className="peer sr-only"
                      ></input>
                      {/* hover: active-within: static rounded-full bg-transparent fill-p-red p-2 opacity-75 transition hover:bg-p-red */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="h-8 w-8 transition hover:h-9 hover:w-9 peer-checked:fill-p-red peer-checked:stroke-p-red"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                        />
                      </svg>
                    </form>
                  </div>

                  {/* If a landlord is viewing the page */}
                  <div className="float-right flex hidden gap-1">
                    {/* Edit button */}
                    <button type="button" className="accomP-button">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="h-8 w-8 fill-white stroke-p-dblue"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                        />
                      </svg>
                    </button>
                    {/* Archive button */}
                    <button type="button" className="accomP-button ">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="h-8 w-8 fill-white stroke-p-dblue"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
                        />
                      </svg>
                    </button>

                    {/* Delete button */}
                    <button type="button" className="accomP-button">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="h-8 w-8 fill-white stroke-p-dblue"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              {/* ACCOMMODATION DESCRIPTION */}
              <div className="px-4 text-xl italic">{firstData?.type}</div>

              {/* STATS */}

              {/* TODO:
              Yung Idea na meron ako for dito is ipasa na lang ung PATH and ung i-priprint na info tulad ng number and address

              Make the parts that have info appear only. */}
              <div className="flex flex-row gap-2 px-3 text-sm">
                {/* pHONE NUMBER */}
                <div className="flex flex-row items-center gap-x-1 p-1">
                  <div className="rounded-full bg-p-dblue p-1">
                    <svg
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="h-5 w-5 fill-white stroke-p-dblue"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                      />
                    </svg>
                  </div>
                  {!queryLoading ? (
                    <div className="">{firstData?.contact_number}</div>
                  ) : (
                    <div className="w-10 animate-pulse overflow-hidden rounded-full bg-gray-400">
                      &nbsp;&nbsp;
                    </div>
                  )}
                </div>

                {/* EMAIL */}
                <div className="flex flex-row items-center gap-x-1 p-1">
                  <div className="rounded-full bg-p-dblue p-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="h-5 w-5 fill-white stroke-p-dblue"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                      />
                    </svg>
                  </div>
                  Email
                </div>

                {/* LOCATION */}
                <div className="flex flex-row items-center gap-x-1 p-1">
                  <div className="rounded-full bg-p-dblue p-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="h-5 w-5 stroke-white"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                      />
                    </svg>
                  </div>
                  {!queryLoading ? (
                    <div className="">{firstData?.location}</div>
                  ) : (
                    <div className="w-10 animate-pulse overflow-hidden rounded-full bg-gray-400">
                      &nbsp;&nbsp;
                    </div>
                  )}
                </div>

                {/* SHOULD APPEAR IF SOCIAL MEDIA EXISTS */}
                <div className="flex flex-row items-center gap-x-1 p-1">
                  <div className="rounded-full bg-p-dblue p-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="white"
                      className=""
                      viewBox="0 0 16 16"
                    >
                      <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
                    </svg>
                  </div>
                  Facebook link
                </div>
              </div>
              <div className="h-50 grid grid-cols-1 justify-items-stretch gap-4">
                <div className="w-auto flex-row space-x-[2%] pl-3 pt-5">
                  <form
                    // https://github.com/orgs/react-hook-form/discussions/8020
                    onSubmit={(...args) =>
                      void handleSubmit(
                        (d) => {
                          addReview.mutate(d);
                        },
                        (e) => {
                          console.log(e);
                        },
                      )(...args)
                    }
                  >
                    <div className="mb-4 w-full rounded-[15px] border border-gray-200 bg-gray-50">
                      {/* <div className="flex items-center justify-between px-3 py-2 border-b"> */}

                      <div className="grid h-10 grid-cols-2 justify-items-stretch gap-4 pl-4">
                        <div className="flex items-center">
                          <h1 className="text-start text-2xl font-bold">
                            Ratings and Reviews
                          </h1>
                        </div>

                        <div className="text-gray-800flex items-center justify-center justify-self-end pr-4 pt-2">
                          <Link
                            href="ye"
                            className="justify-self-end pt-3 text-end text-xxs underline"
                          >
                            Report a problem
                          </Link>
                        </div>
                      </div>
                      {/* </div> */}
                      <div className="rounded-b-lg bg-white px-4 py-2">
                        <label className="sr-only">Publish post</label>
                        <textarea
                          id="editor"
                          rows={3}
                          className="block w-full border-0 bg-white px-3 pt-2 text-sm text-gray-800 focus:ring-0"
                          placeholder="Write a review"
                          {...register("review")}
                        ></textarea>

                        <input
                          type="number"
                          placeholder="rating"
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
              </div>

              {/* <div className="grid h-40 grid-cols-1 justify-items-stretch gap-4">

              </div> */}

              <div className="h-60 pl-3 pt-1">
                <div className="mb-4 h-full w-full overflow-y-scroll rounded-[15px] border border-gray-200 bg-gray-50">
                  <div>
                    <UserProfile />
                    <div className="flex flex-row rounded-md bg-white pl-20">
                      <p className="line-clamp-2 text-sm">
                        With the sects clashing against one another, there was
                        no one who could blablahblahblah ye
                      </p>
                    </div>
                  </div>

                  <div>
                    <UserProfile />
                    <div className="flex flex-row rounded-md bg-white pl-20">
                      <p className="line-clamp-2 text-sm">
                        With the sects clashing against one another, there was
                        no one who could blablahblahblah ye
                      </p>
                    </div>
                  </div>
                  <div>
                    <UserProfile />
                    <div className="flex flex-row rounded-md bg-white pl-20">
                      <p className="line-clamp-2 text-sm">
                        With the sects clashing against one another, there was
                        no one who could blablahblahblah ye
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
