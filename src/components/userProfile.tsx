import { type User } from "@prisma/client";
import Image from "next/image";
import userImage from "public/placeholder_1.png";
import StarRow from "~/components/starRow";

interface UserPorfileProps {
  user: User;
  // first_name?: string | null;
  // last_name?: string | null;
  date?: string | null;
  time?: string | null;
  review?: string | null;
  rating?: number | null;
}

export const UserProfile: React.FC<UserPorfileProps> = ({
  user,
  // first_name,
  // last_name,
  date,
  time,
  review,
  rating,
}) => {
  return (
    <>
      <div className="flex flex-row rounded-md p-3">
        {/* Insert Landlord Image here */}
        <div className="relative mr-3 aspect-square h-[70%] place-self-center rounded-full ">
          <Image
            src={user.image ?? userImage.src}
            className="w-full rounded-full"
            alt="placeholder"
            fill
          />
        </div>
        <div className="flex w-full flex-col">
          {/* <h1 className="font-bold"> {session.data?.user.name}</h1>  */}
          {/* placeholder only */}
          <div className="flex flex-row justify-between">
            <h1 className="text-xl font-bold">
              {user.name}
              {/* {first_name} {last_name} */}
            </h1>
            <StarRow rating={rating ?? 0} />
          </div>
          <label className="text-sm italic">
            {date} | {time}
          </label>
          <p className="line-clamp-2 pt-2 text-sm">{review}</p>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
