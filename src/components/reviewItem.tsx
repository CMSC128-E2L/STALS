/* eslint-disable @next/next/no-img-element */
import React from "react";
import StarRow from "./starRow";
import { type User } from "@prisma/client";
import userImage from "public/placeholder_1.png";

const ReviewItem: React.FC<{
  id: string;
  user: User;
  date: string | null;
  time: string | null;
  review: string | null;
  rating: number;
}> = ({ id, user, date, time, review, rating }) => {
  return (
    <div className="flex max-w-full flex-row border-b-2 border-b-neutral-200 py-4 ">
      <img
        src={user.image ?? userImage.src}
        alt="User Profile"
        className="h-14 self-start rounded-full"
      />
      <div className="flex flex-col pl-2">
        <h1 className="text-xl font-bold">{`${user.first_name ?? ""} ${
          user.middle_name ?? ""
        } ${user.last_name ?? ""}
  ${user.Suffix ?? ""}`}</h1>
        <StarRow rating={rating ?? 0} class={"justify-left !grow-0"} />
        <p className="text-sm">
          {date} | {time}
        </p>
        <label className="pb-1">
          <input type="checkbox" value="" className="peer sr-only" />
          <p className="line-clamp-2 cursor-pointer pt-2 text-sm peer-checked:line-clamp-none">
            {review}
          </p>
        </label>
      </div>
    </div>
  );
};

export default ReviewItem;
