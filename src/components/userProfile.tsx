import Image from "next/image";
import userImage from "public/placeholder_1.png";

export default function UserProfile() {
  return (
    <>
      <div className="grid grid-cols-2 rounded-md bg-white shadow-md">
        {/* Insert Landlord Image here */}
        <div className="relative mr-3 h-12 w-12 place-self-center rounded-full">
          <Image
            src={userImage.src}
            className="object-contain"
            alt="placeholder"
            fill
          />
        </div>
        <div>
          <h1 className="font-bold"> Random User</h1>
          <label>Date | time</label>
        </div>
      </div>
    </>
  );
}
