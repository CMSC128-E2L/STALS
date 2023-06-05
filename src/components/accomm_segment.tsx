import { useState } from "react";
import { api } from "~/utils/api";
import Link from "next/link";
import RoomButton from "~/components/roomButton";

import placeholder from "public/images/logo d-violet.png";
import { useSession } from "next-auth/react";
import ConfirmationPrompt from "./prompt";

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
              {userSession?.profile.type === "LANDLORD" &&
                accommData?.landlord === userSession?.user?.id && (
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
            <Link className="management-buttons" href={`${id}/images`}>
              Images
            </Link>

            {/* EDIT */}
            <Link className="management-buttons" href={`${id}/edit`}>
              Edit
            </Link>

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
                Archive
              </button>
            )}

            {/* DELETE */}
            <button
              className="management-buttons"
              // onClick={() => {
              //   deleteAccomm.mutate({
              //     id: id,
              //   });
              // }}
              onClick={() => setShowDelPrompt(true)}
            >
              Delete
            </button>
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
