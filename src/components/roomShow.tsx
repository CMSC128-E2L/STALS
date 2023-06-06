import Link from "next/link";
import Image, { type StaticImageData } from "next/image";
import { api } from "~/utils/api";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import iconavail from "public/images/icon_avail.png";
import iconaircon from "public/images/icon_aircon.png";
import iconutils from "public/images/icon_utils.png";
import iconarchive from "public/images/icon_archive.png";
import { useState } from "react";
import toast from "react-hot-toast";

const RoomShow: React.FC<{
  roomID: string;
  roomAccID: string;
  roomOccupied: boolean;
  roomPrice: string;
  roomBeds: number;
  roomAircon: boolean;
  roomUtils: boolean;
  roomArchive: boolean;
}> = ({
  roomID,
  roomAccID,
  roomOccupied,
  roomPrice,
  roomBeds,
  roomAircon,
  roomUtils,
  roomArchive,
}) => {
  const { data: sessionData } = useSession();

  const router = useRouter();

  const { data: roomData, isLoading: roomLoading } =
    api.room.getOne.useQuery(roomID);

  const { data: accommData, isLoading: accommLoading } =
    api.accommodation.getOne.useQuery(
      roomData ? roomData?.accommodationId : "",
    );

  const archiveRoom = api.room.archive.useMutation({
    onSuccess: () => {
      toast.success("Successfully Archived Room!", {
        position: "bottom-right",
        duration: 2000,
      });
      setShowPopUpArchive(false);
      router.reload();
    },
  });
  const unarchiveRoom = api.room.unarchive.useMutation({
    onSuccess: () => {
      toast.success("Successfully Unarchived Room!", {
        position: "bottom-right",
        duration: 2000,
      });
      setShowPopUpUnarchive(false);
      router.reload();
    },
  });
  const deleteRoom = api.room.delete.useMutation({
    onSuccess: () => {
      setShowPopUpDelete(false);
      toast.success("Successfully Deleted Room!", {
        position: "bottom-right",
        duration: 2000,
      });
      router.reload();
    },
  });

  const [showPopUpArchive, setShowPopUpArchive] = useState(false);
  const [showPopUpUnarchive, setShowPopUpUnarchive] = useState(false);
  const [showPopUpDelete, setShowPopUpDelete] = useState(false);

  const isLandlordViewing = accommData?.landlord === sessionData?.user?.id;

  return (
    <div className="flex flex-col">
      {/* HEADER + BUTTONS*/}
      <div className="flex items-center justify-between">
        <h1 className=" text-3xl font-bold text-p-dviolet">Room Details</h1>
        {/* if landlord ka, makikita mo to, otherwise not */}
        {isLandlordViewing && (
          <div className="flex flex-row items-center gap-x-1 p-1">
            {/* BUTTON NG EDIT */}
            <Link href={`room/${roomID}/edit`}>
              <button type="button" className="">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-8 w-8 stroke-p-dviolet"
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
            {/* to archive */}
            {roomArchive == false && (
              <button
                type="button"
                className=""
                onClick={() => setShowPopUpArchive(true)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-8 w-8 stroke-p-dviolet"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
                  />
                </svg>
              </button>
            )}
            {/* to unarchive */}
            {roomArchive == true && (
              <button
                type="button"
                className=""
                onClick={() => setShowPopUpUnarchive(true)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-8 w-8 stroke-p-dviolet"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
                  />
                </svg>
              </button>
            )}
            {/* BUTTON NG DELETE */}
            <button
              type="button"
              className=""
              onClick={() => setShowPopUpDelete(true)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-8 w-8 stroke-p-dviolet"
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
      {/* BODY */}
      <div className="flex flex-col justify-center">
        <div className="flex flex-col">
          {/* PRICE AND NO OF BED */}
          <div className="mt-1 flex flex-row justify-center rounded-xl border-2 bg-p-dviolet px-5 py-1">
            <div className="flex w-[50%] flex-col">
              <h1 className="text-2xl font-bold text-white">Price</h1>
              <h2 className="text-xl font-bold text-white">{roomPrice}</h2>
            </div>
            <div className="flex w-[50%] flex-col">
              <h1 className="text-2xl font-bold text-white">No. of Beds</h1>
              <h2 className="text-xl font-bold text-white">{roomBeds}</h2>
            </div>
          </div>

          {/* ICONS */}
          {[
            { icon: iconavail, name: "Availability", boolvalue: roomOccupied },
            { icon: iconaircon, name: "Aiconditioner", boolvalue: roomAircon },
            { icon: iconutils, name: "Ulitities", boolvalue: roomUtils },
          ].map((item, index) => (
            <RoomRow
              key={index}
              icon={item.icon}
              name={item.name}
              boolvalue={item.boolvalue}
            />
          ))}

          {/* ARCHIVED */}
          {/* if landlord ka you will see it, otherwise no */}
          {isLandlordViewing && (
            <RoomRow
              icon={iconarchive}
              name={"Archived"}
              boolvalue={roomArchive}
            />
          )}
        </div>
      </div>

      {/* ============================================================================= */}
      {/* POP UP PROMPTS */}
      {/* POP UP FOR ARCHIVING */}
      {showPopUpArchive && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="rounded-xl bg-white p-5">
            <h1 className="flex justify-center">Archive This Room?</h1>
            <div className="flex flex-row">
              <button
                className="mx-2 mt-4 rounded bg-p-dviolet px-4 py-2 text-white hover:bg-p-dbviolet"
                onClick={() => {
                  archiveRoom.mutate(roomID);
                }}
              >
                Yes
              </button>
              <button
                className="mx-2 mt-4 rounded bg-p-dviolet px-4 py-2 text-white hover:bg-p-dbviolet"
                onClick={() => setShowPopUpArchive(false)}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
      {/* POP UP FOR UNARCHIVING */}
      {showPopUpUnarchive && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="rounded-xl bg-white p-5">
            <h1 className="flex justify-center">Unarchive This Room?</h1>
            <div className="flex flex-row">
              <button
                className="mx-2 mt-4 rounded bg-p-dviolet px-4 py-2 text-white hover:bg-p-dbviolet"
                onClick={() => {
                  unarchiveRoom.mutate(roomID);
                }}
              >
                Yes
              </button>
              <button
                className="mx-2 mt-4 rounded bg-p-dviolet px-4 py-2 text-white hover:bg-p-dbviolet"
                onClick={() => setShowPopUpUnarchive(false)}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
      {/* POP UP FOR DELETNG */}
      {showPopUpDelete && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="rounded-xl bg-white p-5">
            <h1 className="flex justify-center">Delete This Room?</h1>
            <div className="flex flex-row">
              <button
                className="mx-2 mt-4 rounded bg-p-dviolet px-4 py-2 text-white hover:bg-p-dbviolet"
                onClick={() => {
                  deleteRoom.mutate(roomID);
                }}
              >
                Yes
              </button>
              <button
                className="mx-2 mt-4 rounded bg-p-dviolet px-4 py-2 text-white hover:bg-p-dbviolet"
                onClick={() => setShowPopUpDelete(false)}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
      {/* ============================================================================= */}
    </div>
  );
};

export default RoomShow;

const RoomRow: React.FC<{
  name: string;
  icon: StaticImageData;
  boolvalue: boolean;
}> = ({ name, icon, boolvalue }) => {
  return (
    <div className="mb-2 mt-2 rounded-xl border-2 bg-white px-5 py-1">
      <div className="flex flex-row">
        <div className="relative flex h-12 w-12 flex-col items-start rounded-full sm:h-20 sm:w-20">
          <Image src={icon} className="object-left" alt={`${name} Icon`} fill />
        </div>
        <div className="flex grow flex-row items-center">
          <h1 className="w-[50%] min-w-fit px-4 text-2xl font-bold text-p-dviolet">
            {name}
          </h1>

          {boolvalue ? (
            <h1 className="text-2xl font-extrabold text-green-600">✓</h1>
          ) : (
            <h1 className="text-2xl font-extrabold text-red-600">✕</h1>
          )}
        </div>
      </div>
    </div>
  );
};
