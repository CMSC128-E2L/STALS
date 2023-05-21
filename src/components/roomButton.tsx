export default function RoomButton() {
  // Must accept variables: int n and get whether the room is occupied or not
  return (
    <>
      <button className="accPButton flex flex-none flex-col px-8">
        {/*  */}
        <label className="bold text-xl">Room 1</label>
        <p className="text-md self-center px-1 italic ">Occupied</p>
      </button>
    </>
  );
}
