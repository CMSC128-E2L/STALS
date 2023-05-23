import Image from "next/image";
import userImage from "public/placeholder_1.png";
import { useSession } from "next-auth/react";
import { stringify } from "superjson";
import { api } from "~/utils/api";

export default function UserProfile() {
  const session = useSession();

  return (
    <>
      <div className="flex flex-row rounded-md bg-white p-2 shadow-md">
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
          <h1 className="font-bold"> {session.data?.user.name}</h1>
          <label>Date | time</label>
        </div>
      </div>
    </>
  );
}
