import Link from "next/link";
import { useState } from "react";

export const RoomButton: React.FC<{ id: string; num: number }> = ({
  id,
  num,
}) => {
  // Must accept variables: int n and get whether the room is occupied or not
  return (
    <Link href={`/room/${id}`}>
      <button className="accPButton flex flex-none flex-col px-8">
        {/*  */}
        <label className="bold text-xl">Room ${num}</label>
        <p className="text-md self-center px-1 italic ">Occupied</p>
      </button>
    </Link>
  );
};

export default RoomButton;
