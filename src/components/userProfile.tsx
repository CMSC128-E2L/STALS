export default function UserProfile() {
  return (
    <>
      <div className="grid grid-cols-2 rounded-md bg-white shadow-md">
        {/* Insert Landlord Image here */}
        <img
          src="public/placeholder_1.png"
          className="mr-3 h-12 place-self-center rounded-full"
        ></img>
        <div>
          <h1 className="font-bold"> Random User</h1>
          <label>Date | time</label>
        </div>
      </div>
    </>
  );
}
