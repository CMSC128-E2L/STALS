import NavBar from "~/components/navbar";
import UserProfile from "~/components/userProfile";
import StarRow from "~/components/starRow";
import Link from "next/link";
import Image from "next/image";
import { api } from "~/utils/api";
import { useRouter } from "next/router";
import { dynamicRouteID } from "~/utils/helpers";
import { stringify } from "superjson";

export default function Accommodation() {
  const { shouldReturn, id } = dynamicRouteID(useRouter());
  if (shouldReturn) return;

  const { data: firstData, isLoading: queryLoading } =
    api.accommodation.getOne.useQuery(id);

  return (
    <div className="flex flex-col">
      {/* HEADER */}
      <div className="max-w-screen">
        <NavBar />
      </div>

      {/* BODY */}
      <div className="flex max-h-screen flex-col">
        {/* LANDLORD PROFILE 
        CAN BE MADE INTO A COMPONENT */}
        <div className="position-left ml-10 w-1/4 p-4 py-2">
          <UserProfile />
        </div>
        {/* cONTAINS THE ACCOMMODATION INFO */}
        <div className="flex min-h-screen justify-center">
          {/* Box that contains the accommodation thingy */}
          <div className="margin-40 flex w-11/12 gap-2 bg-p-lblue p-4 py-4 shadow-md">
            {/* GALLERY */}
            <div className="w-1/3 flex-none bg-red-200 p-4">
              <div className="grid h-5/6 gap-4 bg-blue-200">
                {/*div containing all images*/}
                {/* main image */}
                <div className="relative aspect-video h-full w-full bg-yellow-200">
                  {" "}
                  {/*div for main image*/}
                  <Image
                    className="relative rounded-lg object-cover"
                    src="https://flowbite.s3.amazonaws.com/docs/gallery/featured/image.jpg"
                    alt="image"
                    fill
                  />
                </div>
                {/* other images */}
                <div className="grid grid-cols-3 gap-1 bg-green-200">
                  {" "}
                  {/*div for row of bottomimages*/}
                  <div className="relative aspect-video h-1/2 w-5/6">
                    {" "}
                    {/*div for 1 image*/}
                    <Image
                      className="rounded-lg object-cover"
                      src="https://flowbite.s3.amazonaws.com/docs/gallery/featured/image.jpg"
                      alt="image"
                      fill
                    />
                  </div>
                  <div className="relative aspect-video h-1/2 w-5/6">
                    <Image
                      className="rounded-lg object-cover"
                      src="https://flowbite.s3.amazonaws.com/docs/gallery/featured/image.jpg"
                      alt="image"
                      fill
                    />
                  </div>
                  <div className="relative aspect-video h-1/2 w-5/6">
                    <Image
                      className="rounded-lg object-cover"
                      src="https://flowbite.s3.amazonaws.com/docs/gallery/featured/image.jpg"
                      alt="image"
                      fill
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* DESCRIPTION */}
            <div className="flex w-3/4 flex-initial flex-col bg-green-100 p-4">
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
                  {/* So if a registered user is viewing it (remove hidden to show teehee)*/}
                  <div className="float-right inline-flex cursor-pointer">
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
                        stroke-width="1.5"
                        stroke="currentColor"
                        className="h-8 w-8 fill-white stroke-p-dblue"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
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
                        stroke-width="1.5"
                        stroke="currentColor"
                        className="h-8 w-8 fill-white stroke-p-dblue"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
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
                        stroke-width="1.5"
                        stroke="currentColor"
                        className="h-8 w-8 fill-white stroke-p-dblue"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              {/* ACCOMMODATION DESCRIPTION */}
              <div className="px-4 text-xl italic">Accommodation Type</div>

              {/* STATS */}
              <div className="flex flex-row gap-2 px-3 text-sm">
                <div className="flex flex-row items-center gap-x-1 p-1">
                  <div className="rounded-full bg-p-dblue p-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="h-5 w-5 fill-white stroke-p-dblue"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
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
                <div className="flex flex-row items-center gap-x-1 p-1">
                  <div className="rounded-full bg-p-dblue p-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="h-5 w-5 fill-white stroke-p-dblue"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                      />
                    </svg>
                  </div>
                  Email
                </div>
                <div className="flex flex-row items-center gap-x-1 p-1">
                  <div className="rounded-full bg-p-dblue p-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="h-5 w-5 stroke-white"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
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
              </div>

              {/* DESCRIPTION */}
              <div className="flex basis-1/2 flex-col">
                <div className="group basis-1/2 overflow-hidden px-4 py-4">
                  {/* placeholder description to test line cram thing */}

                  {!queryLoading ? (
                    <p className="">{stringify(firstData)}</p>
                  ) : (
                    <>
                      <p className="mb-2 animate-pulse rounded-full bg-gray-400">
                        &nbsp;&nbsp;
                      </p>
                      <p className="mb-2 animate-pulse rounded-full bg-gray-400">
                        &nbsp;&nbsp;
                      </p>
                      <p className="mb-2 animate-pulse rounded-full bg-gray-400">
                        &nbsp;&nbsp;
                      </p>
                    </>
                  )}

                  {/* link to gmaps? */}
                  <Link href="somewhere" className="text-xxs underline">
                    Visit them here
                  </Link>
                </div>

                {/* Other deets */}
                <div className="justify-self-start">
                  <div className="grid grid-cols-2 px-3">
                    <div className="flex flex-col gap-2 p-2">
                      <h1 className="form-h2">Price</h1>
                      <h1 className="form-h2">Capacity</h1>
                    </div>

                    <div className="flex flex-col gap-2 p-2">
                      <p>(min price)-(max price) Pesos</p>
                      <p>(min) to (max) people</p>
                    </div>
                  </div>
                  {/* Rooms */}
                  <div className="flex flex-row gap-3 px-3">
                    <button className="accPButton">Room 1</button>
                    <button className="accPButton">Room 2</button>
                    <button className="accPButton">Room 3</button>
                  </div>
                  {/* Custom Tags */}
                  <p className="px-4 py-1 text-sm">(insert custom tags here)</p>

                  <button className="accPButton mx-3 px-3 text-lg">
                    {" "}
                    Download{" "}
                  </button>
                </div>
              </div>
              {/* Rest */}
              <div className="flex grow flex-row divide-x-2 divide-p-black">
                <div className="basis-2/3 p-3">
                  <h1 className="text-start text-2xl">Ratings and Reviews</h1>
                  <div className="flex flex-row">
                    <div className="basis-1/2 place-self-center text-center ">
                      {/* wao */}
                      <p className="text-5xl font-bold">5.0</p>
                      <p>out of (n) reviews</p>
                    </div>

                    {/* the star thing probably could be a component */}
                    <StarRow />
                  </div>
                </div>
                {/* Review section */}
                <div className="grow basis-1/2">
                  <div className="flex flex-col p-2">
                    <div className="basis-1/8">
                      <UserProfile />
                      <StarRow />
                    </div>
                    <p className="line-clamp-2 text-sm">
                      With the sects clashing against one another, there was no
                      one who could blablahblahblah ye
                    </p>

                    <Link href="ye" className="text-end text-xxs underline">
                      See More
                    </Link>
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
