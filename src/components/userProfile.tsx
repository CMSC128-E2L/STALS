import Image from "next/image";
import userImage from "public/placeholder_1.png";

interface UserPorfileProps {
  userImageSrc?: string;
  first_name?: string | null;
  last_name?: string | null;
  date?: string | null;
  time?: string | null;
  review?: string | null;
  rating?: number | null;
}

export const UserProfile: React.FC<UserPorfileProps> = ({
  userImageSrc,
  first_name,
  last_name,
  date,
  time,
  review,
  rating,
}) => {
  return (
    <>
      <div className="flex flex-row rounded-md bg-white p-3">
        {/* Insert Landlord Image here */}
        <div className="relative mr-3 h-12 w-12 place-self-center rounded-full">
          <Image
            src={userImageSrc ?? userImage.src}
            className="object-contain"
            alt="placeholder"
            fill
          />
        </div>
        <div className="pl-2">
          {/* <h1 className="font-bold"> {session.data?.user.name}</h1>  */}
          {/* placeholder only */}
          <h1 className="font-bold">
            {first_name} {last_name}
          </h1>
          <label>
            {date} | {time}
          </label>
          <p>{review}</p>
          <p>Rating: {rating}</p>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
