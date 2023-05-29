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
    <>
      {/* {items.map((item, index) => ( */}
      <div
        //   key={index}
        className="flex max-w-full flex-row gap-3 rounded-md p-3"
      >
        <img
          src={user.image ?? userImage.src}
          alt="User Profile"
          className="h-[8%] w-[8%] self-start rounded-full"
        />
        <div className="flex w-full flex-col">
          <div className="flex flex-row items-center justify-between">
            <h1 className="text-xl font-bold">{user.name}</h1>
            <div className="flex items-center">
              <StarRow rating={rating ?? 0} />
            </div>
          </div>
          <label className="text-sm italic">
            {date} | {time}
          </label>
          <p className="line-clamp-2 pt-2 text-sm">{review}</p>
        </div>
        {/* <div className="flex flex-col">
          <div>
            <h1 className="text-xl font-bold">{user.name}</h1>
            <p className="text-sm ">
              {date} | {time}
            </p>
          </div>
          <label className="pb-1">
            <input type="checkbox" value="" className="peer sr-only" />
            <p className="line-clamp-2 cursor-pointer pt-2 text-sm peer-checked:line-clamp-none">
              {review}
            </p>
          </label>
          <StarRow rating={rating ?? 0} />
        </div> */}
      </div>
      {/* ))} */}
    </>
  );
};

export default ReviewItem;
