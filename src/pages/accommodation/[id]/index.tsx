import NavBar from "~/components/navbar";
import UserProfile from "~/components/userProfile";
import StarRow from "~/components/starRow";
import RoomButton from "~/components/roomButton";
import Link from "next/link";
import Image from "next/image";
import { api } from "~/utils/api";
import { useRouter } from "next/router";
import { dynamicRouteID } from "~/utils/helpers";
import Error404 from "~/pages/404";
import { useSession } from "next-auth/react";
import Review from "~/components/review";
import { useState } from "react";
import userImage from "public/placeholder_1.png";

export default function Accommodation() {
  const { id } = dynamicRouteID(useRouter());

  const [showReview, setShowReview] = useState(false);

  const { data: accommData, isLoading: accommLoading } =
    api.accommodation.getOneRelations.useQuery(id);

  const { data: ImageList, isLoading: imageLoading } =
    api.file.getAccommImages.useQuery({ id });

  const { data: userReview, isLoading: reviewLoading } =
    api.review.getOneTopReview.useQuery();

  // const { data: RoomList, isLoading: roomLoading } = api.room.getMany.useQuery({
  //   id: id,
  //   status: undefined,
  // });

  const { data: userSession } = useSession();

  if (accommData === null) {
    return Error404();
  }

  const isLandlordViewing = accommData?.landlord === userSession?.user?.id;

  return (
    <div className="scrollbar flex h-screen flex-col overflow-auto bg-p-ngray">
      {/* HEADER */}
      <NavBar />

      {/* BODY */}
      <div className="mt-10 flex flex-auto flex-col">
        {/* cONTAINS THE ACCOMMODATION INFO */}
        <div className="flex flex-row justify-center object-contain">
          {/* Box that contains the accommodation thingy */}
          <div className="flex w-11/12">
            {/* GALLERY */}
            <div className="w-1/4 flex-none p-4">
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

            {/* DESCRIPTION */}
            <div className="w-3/4 flex-none p-4">
              {/* ACCOMMODATION NAME + edit + delete thngy idk*/}
              <div className="flex flex-row items-stretch justify-between">
                {/* Left column (accommodation name) */}
                <div className="flex flex-auto items-center px-3">
                  {!accommLoading ? (
                    <h1 className="text-3xl font-bold">{accommData?.name}</h1>
                  ) : (
                    <h1 className="w-[100%] animate-pulse rounded-full bg-gray-400 text-3xl font-bold">
                      &nbsp;&nbsp;
                    </h1>
                  )}
                </div>

                {/* Right column: the editing thingy ig */}
                <div className="shrink">
                  {/* TODO: So if a registered user is viewing it (remove hidden to show teehee)
                  WONDERING KUNG UNG IMPLEMENTATION NA LANG NITO VIA COMPONENT OR NAH*/}
                  <div className="flex flex-row items-center gap-2">
                    <form>
                      <label className="cursor-pointer">
                        <input
                          type="checkbox"
                          value="favorite"
                          className="peer sr-only"
                        />
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="h-8 w-8 transition peer-checked:fill-p-red peer-checked:stroke-p-red"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                          />
                        </svg>
                      </label>
                    </form>
                    <label className="cursor-pointer">
                      <button
                        className="accPButton sr-only mx-3 mb-2 self-end px-3 text-lg"
                        onClick={() => {
                          print();
                        }}
                      />
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="h-8 w-8"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
                        />
                      </svg>
                    </label>
                    {/* If a landlord is viewing the page */}
                    {isLandlordViewing && (
                      <div className="float-right flex gap-1">
                        {/* Edit button */}
                        <Link className="accomP-button" href={`${id}/edit`}>
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
                        </Link>
                        {/* Archive button */}
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
                    )}
                  </div>
                </div>
              </div>

              {/* ACCOMMODATION DESCRIPTION */}
              <div className="px-4 text-xl italic">{accommData?.type}</div>

              {/* STATS */}

              {/* TODO:
              Yung idea na meron ako for dito is ipasa na lang ung PATH and ung i-priprint na info tulad ng number and address

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
                  {!accommLoading ? (
                    <div className="">{accommData?.contact_number}</div>
                  ) : (
                    <div className="w-10 animate-pulse overflow-hidden rounded-full bg-gray-400">
                      &nbsp;&nbsp;
                    </div>
                  )}
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
                  {!accommLoading ? (
                    <div className="">{accommData?.location}</div>
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
                  {accommData?.fb_page ?? "Facebook link"}
                </div>
              </div>

              {/* DESCRIPTION */}
              <div className="flex basis-1/2 flex-col">
                <div className="group overflow-hidden px-4 py-2">
                  {/* TODO: since the tags of an accommodation is just a string, just print that string here.*/}
                  <p className="py-1 text-sm italic">{accommData?.tags}</p>
                </div>

                {/* Other deets */}

                <div className="grid w-1/2 grid-cols-2 px-3">
                  {/* TODO get the corresponding info: */}
                  <div className="flex flex-col gap-2 p-4">
                    <h1 className="form-h2">Price</h1>
                    <h1 className="form-h2">Capacity</h1>
                    {/*TODO: CONTRACT LENGTH IS A CONDITIONAL THAT ONLY APPEARS IF THE ACCOMMODATION IS A DORMITORY */}
                    <h1 className="form-h2">Contract Length</h1>
                  </div>

                  <div className="flex flex-col gap-2 space-y-1 p-4">
                    <p>{accommData?.price} Pesos</p>
                    <p>(min) to (max) people</p>
                    <p>{accommData?.contract_length}</p>
                  </div>
                </div>

                {/* Rooms 
                TODO: This is gonna get the list of rooms in prisma/schema.prisma and load the component <RoomButton /> (components/RoomButton.tsx) with the room id.*/}
                <div className="scrollbar flex flex-row items-stretch space-x-3 overflow-x-auto px-3 py-3">
                  {accommData?.Room && accommData?.Room.length > 0 ? (
                    accommData?.Room.map((room, i: number) => (
                      <RoomButton
                        key={room.id}
                        id={room.id}
                        roomIndex={i}
                        status={room.occupied}
                        hidden={
                          userSession?.profile.type === "LANDLORD" &&
                          accommData?.landlord === userSession?.user?.id &&
                          accommData?.id === room.accommodationId
                            ? false
                            : room.is_archived
                        }
                      />
                    ))
                  ) : (
                    <p>No rooms are available yet.</p>
                  )}

                  {/* TODO: ADD ROOM BUTTON SHOULD ONLY APPEAR IF LANDLORD IS LOOKING AT PAGE */}
                  {userSession?.profile.type === "LANDLORD" &&
                    accommData?.landlord === userSession?.user?.id && (
                      <Link
                        href={`/accommodation/${id}/room/add`}
                        className="flex items-stretch"
                      >
                        <button className="flex flex-col items-center rounded-lg border-2 border-dashed border-p-black/50 px-8">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="h-6 w-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M12 4.5v15m7.5-7.5h-15"
                            />
                          </svg>
                          <label className="text-xs">Add Room</label>
                        </button>
                      </Link>
                    )}
                </div>
              </div>

              {/* Rest */}
              <div className="mt-4 flex grow flex-row divide-x-2  divide-p-black">
                <div className="w-[40%] p-3">
                  <div className="items-center">
                    <div className="text-center ">
                      {/* wao */}
                      <h1 className="text-2xl">Ratings and Reviews</h1>
                      <p className="text-5xl font-bold">
                        {Number(accommData?.average_rating ?? 0).toFixed(1)} / 5
                      </p>
                      <p>out of {accommData?.total_reviews ?? 0} reviews</p>
                      <StarRow rating={accommData?.average_rating ?? 0} />
                    </div>

                    {/* TODO: For this, go through the review array in schema.prisma and get the average ratings the plug the number in this component.*/}
                  </div>
                </div>
                {/* Review section */}
                <div className="grow basis-1/2">
                  <div className="flex h-full flex-col p-2">
                    {/* TODO: For this, get the first review from the accomm's review array, and load the following:*/}
                    <UserProfile
                      first_name={userReview?.user.first_name}
                      last_name={userReview?.user.last_name}
                      date={userReview?.date}
                      time={userReview?.time}
                      review={userReview?.review}
                    />
                    {/* <div className="flex max-w-full flex-row gap-3 rounded-md p-3">
                      <img
                        src={userImage.src}
                        className="w-[15%] self-start rounded-full"
                      /> */}

                    {/* <div className="flex flex-col">
                        <div>

                          <h1 className="text-xl font-bold"></h1> 
                        <p className="text-sm ">
                            {" "}
                            Reviewed Date Posted | Time
                          </p>
                        </div>
                        <label className="pb-1">
                          <p className="line-clamp-2 cursor-pointer pt-2 text-sm">
                            twink earrings wwx twink earrings wwx twink earrings
                            wwx twink earrings wwx twink earrings wwx twink
                            earrings wwx twink earrings wwx twink earrings wwx
                            twink earrings wwx twink earrings wwx twink earrings
                            wwx twink earrings wwx twink earrings wwx twink
                            earrings wwx twink earrings wwx twink earrings wwx
                            twink earrings wwx twink earrings wwx twink earrings
                            wwx twink earrings wwx twink earrings wwx twink
                            earrings wwx twink earrings wwx twink earrings wwx
                            twink earrings wwx twink earrings wwx twink earrings
                            wwx twink earrings wwx twink earrings wwx twink
                            earrings wwx twink earrings wwx twink earrings wwx
                            twink earrings wwx twink earrings wwx twink earrings
                            wwx twink earrings wwx twink earrings wwx twink
                            earrings wwx twink earrings wwx twink earrings wwx
                            twink earrings wwx twink earrings wwx
                          </p>
                        </label>
                      </div>
                    </div> */}
                    {/* This is the review */}
                    {showReview && (
                      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="flex max-h-[80%] w-[60%] flex-col rounded-xl bg-white p-2">
                          <Review />

                          <button
                            className="m-3 mt-4 w-[20%] rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                            onClick={() => setShowReview(false)}
                          >
                            Close
                          </button>
                        </div>
                      </div>
                    )}

                    <div className="px-3 text-end text-xs">
                      <button
                        className=" pl-1 text-sm text-gray-500 underline"
                        onClick={() => setShowReview(true)}
                      >
                        See more
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/*Report button*/}
        <div className="w">
          <button
            className="m-5 space-y-10 rounded-full p-3"
            // onClick={() => {;}}
          >
            Report a Problem
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
