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
  roomPrice: number;
  roomBeds: number;
  roomAircon: boolean;
  roomUtils: boolean;
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
}) => {
  const [showRooms, setShowRooms] = useState(false);

  const { data: sessionData } = useSession();

  // Must accept variables: int n and get whether the room is occupied or not
  if (hidden == false) {
    return (
      <div>
        <button
          className="accPButton flex flex-none flex-col px-8"
          onClick={() => setShowRooms(true)}
        >
          <label className="bold self-center text-lg">
            Room {String(roomIndex + 1)}
          </label>
          <p className="text-md self-center px-1 italic ">
            {status ? "Occupied" : "Unoccupied"}
          </p>
        </button>

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
                roomArchived={status}
              />
              <button
                className="mt-4 w-[15%] rounded bg-p-dblue px-4 py-2 text-white hover:bg-blue-600"
                onClick={() => setShowRooms(false)}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    );
  } else {
    return null;
  }
};

export default RoomButton;
