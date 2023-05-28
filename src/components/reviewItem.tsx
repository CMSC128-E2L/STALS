import React, { useState } from "react";
import StarRow from "./starRow";

const ReviewItem: React.FC<{
  id: string;
  user: {
    name: string;
    profilePicture: string;
  };
  datePosted: string;
  time: string;
  review: string;
  rating: number;
}> = ({ id, user, datePosted, time, review, rating }) => {
  return (
    <>
      {/* {items.map((item, index) => ( */}
      <div
        //   key={index}
        className="flex max-w-full flex-row gap-3 rounded-md p-3"
      >
        <img
          src={user.profilePicture}
          alt="User Profile"
          className="h-[8%] w-[8%] self-start rounded-full"
        />
        <div className="flex flex-col">
          <div>
            <h1 className="text-xl font-bold">{user.name}</h1>
            <p className="text-sm ">
              {datePosted} | {time}
            </p>
          </div>
          <label className="pb-1">
            <input type="checkbox" value="" className="peer sr-only" />
            <p className="line-clamp-2 cursor-pointer pt-2 text-sm peer-checked:line-clamp-none">
              {review}
            </p>
          </label>
          <StarRow rating={rating ?? 0} />
        </div>
      </div>
      {/* ))} */}
    </>
  );
};

export default ReviewItem;
