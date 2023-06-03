/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import StarRow from "./starRow";
import { UserType, type User } from "@prisma/client";
import userImage from "public/placeholder_1.png";
import toast from "react-hot-toast";
import { api } from "~/utils/api";
import { useSession } from "next-auth/react";
import ConfirmationPrompt from "./prompt";
import { useRouter } from "next/router";

const ReviewItem: React.FC<{
  id: string;
  user: User;
  date: string | null;
  time: string | null;
  review: string | null;
  rating: number;
}> = ({ id, user, date, time, review, rating }) => {
  const { data: userSession } = useSession();
  // const { accomm_id } = dynamicRouteID(useRouter());
  const [showDelPrompt, setShowDelPrompt] = useState(false);
  const reportAccomm = api.report.add.useMutation();
  const router = useRouter();
  const deleteRev = api.review.delete.useMutation({
    onSuccess: () => {
      router.reload();
    },
  });

  return (
    <div className="relative flex max-w-full flex-row border-b-2 border-b-neutral-200 py-4">
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
        <p className="text-sm">
          {date} | {time}
        </p>
        <StarRow rating={rating ?? 0} class={"justify-left !grow-0"} />

        <label className="pb-1">
          <input type="checkbox" value="" className="peer sr-only" />
          <p className="line-clamp-2 cursor-pointer pt-2 text-sm peer-checked:line-clamp-none">
            {review}
          </p>
        </label>
      </div>

      {(userSession?.profile.id === user.id ||
        userSession?.profile.type === UserType.ADMIN) && (
        <div className="absolute right-0 m-3 text-xs">
          <div className="flex">
            <div className="mx-2"></div>
            {/* <button
        className="flex flex-row space-x-2"
        onClick={() => {
          // Add your logic or function call here for editing the review
        }}
      >
        Edit
      </button>
      <div className="mx-4"></div> Add space between the buttons */}
            <button
              className="flex flex-row space-x-2"
              onClick={() => setShowDelPrompt(true)}
            >
              Delete
            </button>
            {showDelPrompt && (
              <ConfirmationPrompt
                onConfirm={() => {
                  deleteRev.mutate({
                    id: id,
                  });
                }}
                onCancel={() => setShowDelPrompt(false)}
                message="Are you sure you want to delete this review? "
                submessage="This action cannot be undone."
              />
            )}
          </div>
        </div>
      )}

      {/* Report button for review */}
      {userSession !== null && userSession?.profile.id !== user.id && (
        <div className="absolute right-0 m-3 text-xxs">
          {/*The report button will stick to the bottom left of the screen*/}
          <button
            className="flex flex-row space-x-10"
            onClick={() => {
              reportAccomm.mutate({
                reported_id: id,
                reported_name: date?.concat(" at ", time ?? "") ?? "",
                report: "",
                type_reported: "REVIEW",
              });
              toast.success(
                "Thank you for reporting this review.\nAn alert has been sent to the administrators.",
                {
                  position: "bottom-center",
                  duration: 4000,
                },
              );
            }}
          >
            Report this review
          </button>
        </div>
      )}
    </div>
  );
};

export default ReviewItem;
