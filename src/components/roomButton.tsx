import Link from "next/link";

const RoomButton: React.FC<{
  id: string;
  roomIndex: number;
  status: boolean;
  hidden: boolean;
}> = ({ id, roomIndex, status, hidden }) => {
  // Must accept variables: int n and get whether the room is occupied or not
  if (hidden == false) {
    return (
      <Link href={`/room/${id}`}>
        <button className="accPButton flex flex-none flex-col px-8">
          {/*  */}
          <label className="bold self-center text-lg">
            Room {String(roomIndex + 1)}
          </label>
          <p className="text-md self-center px-1 italic ">
            {status ? "Occupied" : "Unoccupied"}
          </p>
        </button>
      </Link>
    );
  } else {
    return null;
  }
};

export default RoomButton;
