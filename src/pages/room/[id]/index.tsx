import NavBar from "~/components/navbar";
import UserProfile from "~/components/userProfile";
import Link from "next/link";
import Image from "next/image";
import { api } from "~/utils/api";
import { useRouter } from "next/router";
import { dynamicRouteID } from "~/utils/helpers";
import iconavail from "public/images/icon_avail.png";
import iconaircon from "public/images/icon_aircon.png";
import iconutils from "public/images/icon_utils.png";
import Error404 from "~/pages/404";

export default function Room() {
  const { shouldReturn, id } = dynamicRouteID(useRouter());
  if (shouldReturn) return;

  const { data: roomData, isLoading: roomLoading } =
    api.room.getOne.useQuery(id);

  const archiveRoom = api.room.archive.useMutation();
  const deleteRoom = api.room.delete.useMutation();

  if (roomData === null) {
    return Error404();
  }

  return (
    <div className="flex h-screen flex-col">
      {/* HEADER */}
      <NavBar />
      {/* BODY */}
      <div className=" flex flex-auto flex-col">
        <div>
          {/* USER PROFILE */}
          <div className="mt-20 flex justify-center">
            <UserProfile />
          </div>
          <div className="flex justify-center">
            {/* BUTTON NG EDIT */}
            <Link href={`${id}/edit`}>
              <button type="button" className="accomP-button m-2">
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
            </Link>
            {/* BUTTON NG ARCHIVE */}
            <button
              type="button"
              className="accomP-button m-2"
              onClick={(d) => {
                archiveRoom.mutate(id);
                window.location.replace(
                  `/accommodation/${roomData ? roomData.accommodationId : ""}`,
                );
              }}
            >
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
            {/* BUTTON NG DELETE */}
            <button
              type="button"
              className="accomP-button m-2"
              onClick={(d) => {
                deleteRoom.mutate(id);
                window.location.replace(
                  `/accommodation/${roomData ? roomData.accommodationId : ""}`,
                );
              }}
            >
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
          {/* end ng icons */}
          <div className="absolute inset-x-0 flex flex-col items-center justify-center">
            <div className="mb-2 mt-5 w-1/3 rounded-xl border-2 bg-p-dblue px-5 py-5">
              <div className="flex flex-row justify-center px-2 pb-0 pt-0 drop-shadow-md">
                <div className="flex w-[50%] flex-col">
                  <h1 className="text-3xl font-bold text-white">Price</h1>
                  {!roomLoading ? (
                    <h1 className="text-xl font-bold text-white">
                      {roomData?.price}
                    </h1>
                  ) : (
                    <h1 className="text-xl font-bold text-white">
                      &nbsp;&nbsp;
                    </h1>
                  )}
                  {/* <h1 className="text-xl font-bold text-white">999999</h1> */}
                </div>
                <div className="flex w-[50%] flex-col">
                  <h1 className="text-3xl font-bold text-white">No. of Beds</h1>
                  {!roomLoading ? (
                    <h1 className="text-xl font-bold text-white">
                      {roomData?.num_of_beds}
                    </h1>
                  ) : (
                    <h1 className="text-xl font-bold text-white">
                      &nbsp;&nbsp;
                    </h1>
                  )}
                  {/* <h1 className="text-xl font-bold text-white">10</h1> */}
                </div>
              </div>
            </div>
            {/* dito pasok details */}
            <div className="mb-2 mt-2 w-1/3 rounded-xl border-2 bg-white px-5 py-3">
              {/* availability */}
              <div className="flex flex-row">
                <div className="relative flex h-20 w-20 flex-col items-start rounded-full pl-1">
                  <Image
                    src={iconavail}
                    className="object-scale-down object-left"
                    alt="STALS Logo"
                    fill
                  />
                </div>
                <div className="flex flex-row justify-center drop-shadow-md">
                  <div className="ml-3 flex w-[50%] flex-col">
                    <h1 className="text-2xl font-bold text-blue-700">
                      Availability
                    </h1>
                    {!roomLoading ? (
                      <h1 className="">
                        {roomData?.occupied ? "Occupied" : "Unoccupied"}
                      </h1>
                    ) : (
                      <h1 className="">&nbsp;&nbsp;</h1>
                    )}
                    {/* <h1 className="text-xl font-bold text-blue-700">Unoccupied</h1> */}
                  </div>
                </div>
              </div>
            </div>
            <div className="mb-2 mt-2 w-1/3 rounded-xl border-2 bg-white px-5 py-3   ">
              <div className="flex flex-row">
                <div className="relative flex h-20 w-20 flex-col items-start rounded-full pl-1">
                  <Image
                    src={iconaircon}
                    className="object-scale-down object-left"
                    alt="STALS Logo"
                    fill
                  />
                </div>
                <div className="flex flex-row justify-center drop-shadow-md">
                  <div className="flex w-[50%] flex-col">
                    <h1 className="text-2xl font-bold text-blue-700">
                      Airconditioner
                    </h1>
                    {!roomLoading ? (
                      <h1 className="">
                        {roomData?.with_aircon ? "With" : "Without"}
                      </h1>
                    ) : (
                      <h1 className="">&nbsp;&nbsp;</h1>
                    )}
                    {/* <h1 className="text-xl font-bold text-blue-700">Without</h1> */}
                  </div>
                </div>
              </div>
            </div>
            <div className="mb-2 mt-2 w-1/3 rounded-xl border-2 bg-white px-5 py-3">
              <div className="flex flex-row">
                <div className="relative flex h-20 w-20 flex-col rounded-full">
                  <Image
                    src={iconutils}
                    className="object-scale-down object-left"
                    alt="STALS Logo"
                    fill
                  />
                </div>
                <div className="flex flex-row justify-center drop-shadow-md">
                  <div className="ml-6 flex w-[50%] flex-col">
                    <h1 className="text-2xl font-bold text-blue-700">
                      Utilities
                    </h1>
                    {!roomLoading ? (
                      <h1 className="">
                        {roomData?.with_utilities ? "With" : "Without"}
                      </h1>
                    ) : (
                      <h1 className="">&nbsp;&nbsp;</h1>
                    )}
                    {/* <h1 className="text-xl font-bold text-blue-700">Without</h1> */}
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
