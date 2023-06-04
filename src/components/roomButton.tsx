import Link from "next/link";
import { useEffect, useState } from "react";
import RoomShow from "./roomShow";
import { useSession } from "next-auth/react";

const RoomButton: React.FC<{
  id: string;
  roomIndex: number;
  status: boolean;
  hidden: boolean;
  roomAccID: string;
  roomAvail: boolean;
  roomPrice: string;
  roomBeds: number;
  roomAircon: boolean;
  roomUtils: boolean;
  roomArchive: boolean;
}> = ({
  id,
  roomIndex,
  status,
  hidden,
  roomAccID,
  roomAvail,
  roomPrice,
  roomBeds,
  roomAircon,
  roomUtils,
  roomArchive,
}) => {
  const [showRooms, setShowRooms] = useState(false);

  const { data: sessionData } = useSession();

  // Must accept variables: int n and get whether the room is occupied or not
  if (!hidden) {
    return (
      <>
        {/* if unoccupied */}
        {!status && (
          <button
            className="flex flex-none flex-col rounded-md bg-p-dviolet px-5 px-8 py-1 text-sm shadow shadow-p-dblue/50 hover:bg-p-dbviolet"
            onClick={() => setShowRooms(true)}
          >
            <label className="bold self-center text-lg text-white">
              Room {String(roomIndex + 1)}
            </label>
            <p className="text-md self-center whitespace-nowrap px-1 italic text-white">
              {status ? "Occupied" : "Unoccupied"} <br /> ₱ {roomPrice}
            </p>
          </button>
        )}
        {/* if occupied */}
        {status && (
          <button
            className="flex flex-none flex-col rounded-md bg-gray-300 px-8 py-1 text-sm shadow shadow-p-black/50 hover:bg-gray-400"
            onClick={() => setShowRooms(true)}
          >
            <label className="bold self-center text-lg">
              Room {String(roomIndex + 1)}
            </label>
            <p className="text-md self-center whitespace-nowrap px-1 italic">
              {status ? "Occupied" : "Unoccupied"} <br /> ₱ {roomPrice}
            </p>
          </button>
        )}

        {/* POPUP HELPER */}
        {showRooms && (
          <div className="fixed inset-0 mt-10 flex items-center justify-center bg-black bg-opacity-50">
            <div className="flex w-1/3 flex-col rounded-xl bg-white p-8">
              <RoomShow
                roomID={id}
                roomAccID={roomAccID}
                roomOccupied={roomAvail}
                roomPrice={roomPrice}
                roomBeds={roomBeds}
                roomAircon={roomAircon}
                roomUtils={roomUtils}
                roomArchive={roomArchive}
              />
              <button
                className="mt-4 w-[15%] rounded bg-p-dviolet p-2 text-white hover:bg-p-dbviolet"
                onClick={() => setShowRooms(false)}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </>
    );
  } else {
    return null;
  }
};

export default RoomButton;
