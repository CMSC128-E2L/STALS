import { useState } from "react";
import { api } from "~/utils/api";
import Link from "next/link";
import RoomButton from "~/components/roomButton";

import placeholder from "public/images/logo d-violet.png";
import { useSession } from "next-auth/react";
import ConfirmationPrompt from "./prompt";
import { UserType } from "@prisma/client";

{
  /* TODO: Tweak data types to be displayed for each variable in the component */
}
// eslint-disable-next-line
const Accomm_Segment: React.FC<{
  id: string;
  name: string;
  price: string /* SHOULD BE FLOAT */;
  num_of_rooms: number;
  barangay: string | null;
  typeArray: Array<string>;
  tagArray: Array<string>;
  is_archived: boolean;
  location: string;
  refetch?: any;
}> = ({
  id,
  name,
  price,
  num_of_rooms,
  barangay,
  typeArray,
  tagArray,
  is_archived,
  location,
  refetch,
}) => {
  const [imgSrc, setImgSrc] = useState(
    // `https://stals-worker.p0lbang.workers.dev/${id}.jpg`,
    `https://stals-worker.p0lbang.workers.dev/api/v2/${id}/${id}`,
  );
  const { data: userSession } = useSession();
  const { data: accommData, isLoading: accommLoading } =
    api.accommodation.getOneRelations.useQuery(id);
  const [showDelPrompt, setShowDelPrompt] = useState(false);

  const archiveAccomm = api.accommodation.archive.useMutation({
    onSuccess: () => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      void refetch();
    },
  });

  const deleteAccomm = api.accommodation.delete.useMutation({
    onSuccess: () => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      void refetch();
    },
  });
  const isLandlordViewing =
    (userSession?.profile.type === UserType.LANDLORD ||
      userSession?.profile.type === UserType.ADMIN) &&
    accommData?.landlord === userSession?.user?.id;
  return (
    <>
      <div className="w-[1000px] justify-self-center p-4">
        <div className="mx-auto rounded-xl border-2 bg-white p-2 shadow-md">
          <Link href={`/accommodation/${id}`}>
            <div className="mx-2 mt-2 flex flex-row space-x-2 ">
              <div className="aspect-square w-[30%]">
                <img
                  className=" aspect-square w-full object-contain"
                  src={imgSrc}
                  alt="placeholder img"
                  onError={() => {
                    setImgSrc(placeholder.src);
                  }}
                />
              </div>
              {/* Accom info */}
              <div className="flex flex-1 flex-col place-content-between p-4">
                {/* accom name */}
                <div>
                  <h1 className="text-3xl font-bold">
                    {name} {is_archived ? "(Archived)" : ""}
                  </h1>
                  <p className="italic">{typeArray && typeArray.join(", ")}</p>
                  {/* Tags */}
                  <div className="flex flex-row">
                    <span className="mx-3 text-sm italic">
                      {tagArray &&
                        tagArray
                          .filter((tag) => tag !== "")
                          .map((tag, index, array) => (
                            <span
                              key={tag}
                              className="mr-2 mt-2 inline-block rounded-full bg-p-lviolet px-3 py-1 text-sm font-semibold text-gray-700"
                            >
                              {tag}
                            </span>
                          ))}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-1 text-xl ">
                  <div className="flex flex-row">
                    <label className="w-[30%] font-bold">Price</label>
                    <p className="">₱{price}</p>
                  </div>
                  <div className="flex flex-row">
                    <label className="w-[30%] font-bold">Location</label>
                    <p className="">{location}</p>
                  </div>
                </div>
              </div>
            </div>
          </Link>

          <hr className="mx-2 mt-2"></hr>
          {/* Rooms */}
          <div className="flex flex-shrink-0 justify-center">
            <div className="scrollbar flex flex-row items-stretch space-x-3 overflow-x-scroll p-3">
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
                    roomAccID={room.accommodationId}
                    roomAvail={room.occupied}
                    roomPrice={
                      room.price !== undefined && room.price !== null
                        ? room.price.toFixed(2)
                        : ""
                    }
                    roomBeds={room.num_of_beds}
                    roomAircon={room.with_aircon}
                    roomUtils={room.with_utilities}
                    roomArchive={room.is_archived}
                  />
                ))
              ) : (
                <p className="items-center justify-center">
                  No rooms are available yet.
                </p>
              )}

              {/* TODO: ADD ROOM BUTTON SHOULD ONLY APPEAR IF LANDLORD IS LOOKING AT PAGE */}
              {isLandlordViewing && (
                <Link
                  href={`/accommodation/${id}/room/add`}
                  className="flex items-stretch "
                >
                  <button className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-p-black/50 px-8">
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
          {/* ARCHIVE, EDIT, & DELETE  BUTTONS */}
          <div className="flex justify-end space-x-2">
            {/* Images */}
            {isLandlordViewing && (
              <Link className="management-buttons" href={`${id}/images`}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-photo-down mr-2 mt-0.5"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M15 8h.01"></path>
                  <path d="M12.5 21h-6.5a3 3 0 0 1 -3 -3v-12a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v6.5"></path>
                  <path d="M3 16l5 -5c.928 -.893 2.072 -.893 3 0l4 4"></path>
                  <path d="M14 14l1 -1c.653 -.629 1.413 -.815 2.13 -.559"></path>
                  <path d="M19 16v6"></path>
                  <path d="M22 19l-3 3l-3 -3"></path>
                </svg>
                Images
              </Link>
            )}

            {/* EDIT */}
            {isLandlordViewing && (
              <Link className="management-buttons" href={`${id}/edit`}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-edit mr-2 mt-0.5"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1"></path>
                  <path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z"></path>
                  <path d="M16 5l3 3"></path>
                </svg>
                Edit
              </Link>
            )}

            {/* RESTORE */}
            {is_archived ? (
              <button
                className="management-buttons"
                onClick={() => {
                  archiveAccomm.mutate({
                    id: id,
                    is_archived: is_archived,
                  });
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-reload mr-2 mt-0.5"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M19.933 13.041a8 8 0 1 1 -9.925 -8.788c3.899 -1 7.935 1.007 9.425 4.747"></path>
                  <path d="M20 4v5h-5"></path>
                </svg>
                Restore
              </button>
            ) : (
              <button
                className="management-buttons"
                onClick={() => {
                  archiveAccomm.mutate({
                    id: id,
                    is_archived: is_archived,
                  });
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-archive mr-2 mt-0.5"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M3 4m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v0a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z"></path>
                  <path d="M5 8v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-10"></path>
                  <path d="M10 12l4 0"></path>
                </svg>
                Archive
              </button>
            )}

            {/* DELETE */}
            {isLandlordViewing && (
              <button
                className="management-buttons"
                onClick={() => setShowDelPrompt(true)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-trash-x mr-2 mt-0.5"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M4 7h16"></path>
                  <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12"></path>
                  <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3"></path>
                  <path d="M10 12l4 4m0 -4l-4 4"></path>
                </svg>
                Delete
              </button>
            )}

            {showDelPrompt && (
              <ConfirmationPrompt
                onConfirm={() => {
                  deleteAccomm.mutate({
                    id: id,
                  });
                }}
                onCancel={() => setShowDelPrompt(false)}
                message="Are you sure you want to delete this accommodation? "
                submessage="This action cannot be undone."
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Accomm_Segment;
