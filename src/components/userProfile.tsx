import Image from "next/image";
import userImage from "public/placeholder_1.png";
import { useSession } from "next-auth/react";
import { stringify } from "superjson";
import { api } from "~/utils/api";

export default function UserProfile() {
  const session = useSession();

  const { data: userReview, isLoading: reviewLoading } =
    api.review.getOneTopReview.useQuery();

  const { data: userDetails, isLoading: userDetailsLoading } =
    api.user.getOne.useQuery(userReview?.userId!);

  return (
    <>
      <div className="flex flex-row rounded-md bg-white p-3">
        {/* Insert Landlord Image here */}
        <div className="relative mr-3 h-12 w-12 place-self-center rounded-full">
          <Image
            src={userImage.src}
            className="object-contain"
            alt="placeholder"
            fill
          />
        </div>
        <div className="pl-2">
          {/* <h1 className="font-bold"> {session.data?.user.name}</h1>  */}
          {/* placeholder only */}
          <h1 className="font-bold">
            {userDetails?.first_name} {userDetails?.last_name}
          </h1>
          <h2>Rating: {userReview?.rating}</h2>
          <label>
            {userReview?.date} | {userReview?.time}
          </label>
        </div>
      </div>
    </>
  );
}
