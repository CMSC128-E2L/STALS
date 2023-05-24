import NavBar from "~/components/navbar";
import UserProfile from "~/components/userProfile";
import Link from "next/link";
import { api } from "~/utils/api";
import { useRouter } from "next/router";
import { dynamicRouteID } from "~/utils/helpers";

//adapted accom view code

export default function Room() {
  const { shouldReturn, id } = dynamicRouteID(useRouter());
  if (shouldReturn) return;

  const { data: firstData, isLoading: queryLoading } =
    api.room.getOne.useQuery(id);

  const archiveRoom = api.room.archive.useMutation();
  const deleteRoom = api.room.delete.useMutation();

  return (
    <div className="flex h-screen flex-col">
      {/* HEADER */}
      <NavBar />

      {/* BODY */}
      <div className="mt-10 flex flex-auto flex-col">
        {/* USER PROFILE */}
        <div className="position-left ml-12 mt-10 w-1/4 p-4 py-3">
          <UserProfile />
        </div>

        {/* CONTAINS THE ROOM INFO */}
        <div className="flex flex-row justify-center object-contain">
          {/* Box that contains the accommodation thingy */}
          <div className="flex w-11/12 gap-2 rounded-md bg-p-lblue p-4 py-4 shadow-md">
            {/* DESCRIPTION */}
            <div className="flex w-3/4 flex-initial flex-col p-4">
              {/* ACCOMMODATION NAME + edit + delete thngy idk*/}
              <div className="flex flex-row items-stretch justify-between">
                {/* Left column (accommodation name) */}
                <div className="flex w-3/4 items-center px-3">
                  {!queryLoading ? (
                    <h1 className="form-h1">Room Details</h1>
                  ) : (
                    <h1 className="form-h1 w-[100%] animate-pulse rounded-full bg-gray-400">
                      &nbsp;&nbsp;
                    </h1>
                  )}
                </div>

                {/* Right column: the editing thingy ig */}
                <div className="basis-1/4">
                  {/* if landlord view */}
                  <div className="float-right flex gap-1">
                    {/* Edit button */}
                    <Link href={`${id}/edit`}>
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
                    </Link>
                    {/* Archive button */}
                    <button
                      type="button"
                      className="accomP-button "
                      onClick={(d) => {
                        archiveRoom.mutate(id);
                        window.location.replace(
                          `/accommodation/${
                            firstData ? firstData.accommodationId : ""
                          }`,
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

                    {/* Delete button */}
                    <button
                      type="button"
                      className="accomP-button"
                      onClick={(d) => {
                        deleteRoom.mutate(id);
                        window.location.replace(
                          `/accommodation/${
                            firstData ? firstData.accommodationId : ""
                          }`,
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
                </div>
              </div>

              {/* STATS */}

              {/* TODO:
              Yung Idea na meron ako for dito is ipasa na lang ung PATH and ung i-priprint na info tulad ng number and address

              Make the parts that have info appear only. */}
              {/* DESCRIPTION */}
              <div className="flex basis-1/2 flex-col">
                {/* Other deets */}
                <div className="justify-self-start">
                  <div className="mt-4 grid grid-cols-2 px-3">
                    {/* TODO get the corresponding info: */}
                    <div className="flex flex-col gap-1 py-2">
                      <h1 className="form-h2">Price</h1>
                      <h1 className="form-h2">Number of Beds</h1>
                      <h1 className="form-h2">Availability</h1>
                      <h1 className="form-h2">With Airconditioner</h1>
                      <h1 className="form-h2">With Utilities</h1>
                    </div>

                    <div className="flex flex-col gap-2 py-2">
                      <div className="flex w-3/4 items-center">
                        {!queryLoading ? (
                          <h1 className="">{firstData?.price}</h1>
                        ) : (
                          <h1 className="">&nbsp;&nbsp;</h1>
                        )}
                      </div>

                      <div className="flex w-3/4 items-center">
                        {!queryLoading ? (
                          <h1 className="">{firstData?.num_of_beds}</h1>
                        ) : (
                          <h1 className="">&nbsp;&nbsp;</h1>
                        )}
                      </div>

                      <div className="flex w-3/4 items-center">
                        {!queryLoading ? (
                          <h1 className="">
                            {firstData?.occupied ? "Occupied" : "Unoccupied"}
                          </h1>
                        ) : (
                          <h1 className="">&nbsp;&nbsp;</h1>
                        )}
                      </div>

                      <div className="flex w-3/4 items-center">
                        {!queryLoading ? (
                          <h1 className="">
                            {firstData?.with_aircon ? "With" : "Without"}
                          </h1>
                        ) : (
                          <h1 className="">&nbsp;&nbsp;</h1>
                        )}
                      </div>

                      <div className="flex w-3/4 items-center">
                        {!queryLoading ? (
                          <h1 className="">
                            {firstData?.with_utilities ? "With" : "Without"}
                          </h1>
                        ) : (
                          <h1 className="">&nbsp;&nbsp;</h1>
                        )}
                      </div>
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
