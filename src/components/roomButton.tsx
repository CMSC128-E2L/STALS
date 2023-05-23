import Link from "next/link";

const RoomButton: React.FC<{
  id: string;
  roomIndex: number;
  status: boolean;
}> = ({ id, roomIndex, status }) => {
  return (
    <Link href={`/room/${id}`} className="flex items-stretch">
      <button className="rounded-md bg-p-gray px-5 py-1 text-sm shadow shadow-p-black/50">
        <label className="bold text-xl">Room {String(roomIndex)}</label>
        <p className="text-md self-center px-1 italic ">
          {status ? "Occupied" : "Unoccupied"}
        </p>
      </button>
    </Link>
  );
};

export default RoomButton;
