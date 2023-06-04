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
    <div className="w-[1000px] flex-shrink-0 p-4">
      <div className="mx-auto rounded-xl border-2 bg-white p-2 shadow-md">
        <div className="mx-2 mt-2 flex flex-row space-x-2">
          <Link href={`/accommodation/${id}`}>
            <img
              className="block h-[200px] w-[200px] object-cover"
              src={imgSrc}
              alt="placeholder img"
              onError={() => {
                setImgSrc(placeholder.src);
              }}
            />
          </Link>

          <div className="-mt-2 w-[350px] bg-white p-2">
            <div className="mb-2 w-[320px] rounded-lg bg-p-dviolet p-2 shadow-md">
              {/* ARCHIVED */}
              {is_archived && (
                <p className="mx-1 mb-0.5 text-xl font-bold text-white">
                  {name} (Archived){" "}
                </p>
              )}

              {/* NOT ARCHIVED */}
              {!is_archived && (
                <p className="mx-1 mb-0.5 text-xl font-bold text-white">
                  {name}
                </p>
              )}

              {/* PRICE */}
              <p className="mx-1 text-white">Price: ₱{price}</p>
            </div>

            <div className="flex flex-row space-x-2">
              <div className="w-[100px] w-full rounded-lg bg-p-dviolet shadow-md">
                {/* CATEGORY */}
                <p className="mb-0.5 p-2 text-center text-xl font-bold text-white">
                  Category:
                </p>
                <p className="p-2 text-center text-white">
                  {typeArray && typeArray.join(", ")}
                </p>
              </div>

              <div className="w-[100px] w-full rounded-lg bg-p-dviolet shadow-md">
                {/* LOCATION */}
                <p className="mb-0.5 p-2 text-center text-xl font-bold text-white">
                  Location:
                </p>
                <p className="p-2 text-center text-white">{location}</p>
              </div>

              {/* <div className="w-[100px] w-full rounded-lg bg-p-dviolet shadow-md">
                {/* NUM OF ROOMS */}
              {/* <p className="mb-0.5 p-2 text-center text-xl font-bold text-white">
                  Rooms:
                </p>
                <p className="p-2 text-center text-white">{num_of_rooms}</p>
              </div> */}
            </div>
          </div>

          <div className="w-full bg-white">
            <div className="mb-2 w-[300px] rounded-lg bg-p-dviolet p-2">
              {/* TAGS */}
              <p className="mx-1 mb-0.5 text-xl font-bold text-white">Tags:</p>
              <span className="mx-1 text-sm italic text-white">
                {tagArray &&
                  tagArray
                    .filter((tag) => tag !== "")
                    .map((tag, index, array) => (
                      <span key={tag}>
                        {tag}
                        {index !== array.length - 1 && ", "}
                      </span>
                    ))}
              </span>
            </div>
            <br />

            {/* ARCHIVE, EDIT, & DELETE  BUTTONS */}
            <div className="flex w-[300px] space-x-2">
              <div className="w-full bg-white"></div>

              {/* EDIT */}
              <Link
                className="rounded-md bg-p-dbviolet p-2 text-xl font-bold text-white shadow hover:bg-p-bviolet"
                href={`${id}/edit`}
              >
                Edit
              </Link>

              {/* RESTORE */}
              {is_archived && (
                <button
                  className="rounded-md bg-p-dbviolet p-2 text-xl font-bold text-white shadow hover:bg-p-bviolet"
                  onClick={() => {
                    archiveAccomm.mutate({
                      id: id,
                      is_archived: is_archived,
                    });
                  }}
                >
                  Restore
                </button>
              )}

              {/* ARCHIVE */}
              {!is_archived && (
                <button
                  className="rounded-md bg-p-dbviolet p-2 text-xl font-bold text-white shadow hover:bg-p-bviolet"
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
                className="rounded-md bg-p-dbviolet p-2 text-xl font-bold text-white shadow"
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

        <hr className="mx-2 mt-2"></hr>

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
                  className="flex items-stretch"
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
      </div>
    </div>
  );
};

export default Accomm_Segment;
