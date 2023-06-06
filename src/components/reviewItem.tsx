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
import StarRating from "./StarRating";

const ReviewItem: React.FC<{
  id: string;
  user: User;
  date: string | null;
  time: string | null;
  review: string | null;
  rating: number;
  refetch: () => void;
}> = ({ id, user, date, time, review, rating, refetch }) => {
  const { data: userSession } = useSession();
  const [showDelPrompt, setShowDelPrompt] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editedReview, setEditedReview] = useState(review || "");
  const [editedRating, setEditedRating] = useState(rating || 0);
  const isUserViewing = userSession?.profile.type === UserType.USER;

  const reportAccomm = api.report.add.useMutation();
  const deleteRev = api.review.delete.useMutation({
    onSuccess: () => {
      void refetch();
    },
  });

  const archiveRev = api.review.archive.useMutation({
    onSuccess: () => {
      void refetch();
    },
  });

  const editRev = api.review.edit.useMutation({
    onSuccess: () => {
      void refetch();
    },
  });

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleSaveClick = async () => {
    try {
      await editRev.mutateAsync({
        id: id,
        review: editedReview,
        rating: editedRating,
      });

      setEditMode(false);
    } catch (error) {
      console.log("Error updating review:", error);
      toast.error("Failed to update review. Please try again.");
    }
  };
  return (
    <div className="relative flex max-w-full flex-row border-b-2 border-b-neutral-200 py-4">
      <img
        src={user.image ?? userImage.src}
        alt="User Profile"
        className="h-14 self-start rounded-full"
      />
      <div className="flex w-full flex-col pl-2">
        <h1 className="text-xl font-bold">{`${user.first_name ?? ""} ${
          user.middle_name ?? ""
        } ${user.last_name ?? ""}
  ${user.Suffix ?? ""}`}</h1>
        <p className="text-sm">
          {date} | {time}
        </p>

        <>
          <label className="pb-1">
            {editMode ? (
              <div className="w-full px-2">
                <textarea
                  id="editor"
                  rows={3}
                  className="block w-full border-0 bg-white px-3 pt-2 text-sm text-gray-800 focus:ring-0"
                  placeholder="Share your thoughts on the accommodation"
                  value={editedReview}
                  onChange={(e) => setEditedReview(e.target.value)}
                ></textarea>
                <StarRating
                  totalStars={5}
                  initialRating={editedRating}
                  onChange={(newRating) => setEditedRating(newRating)}
                />
              </div>
            ) : (
              <>
                <StarRow rating={rating ?? 0} class="justify-left !grow-0" />
                <input type="checkbox" value="" className="peer sr-only" />
                <p className="line-clamp-2 cursor-pointer pt-2 text-sm peer-checked:line-clamp-none">
                  {review}
                </p>
              </>
            )}
          </label>
        </>
      </div>

      {userSession?.profile.type === UserType.ADMIN && (
        <div className="absolute right-0 m-3 text-xs">
          <div className="flex">
            <div className="mx-2"></div>
            <button
              className="flex flex-row space-x-2"
              onClick={() => setShowDelPrompt(true)}
            >
              Archive
            </button>
            {showDelPrompt && (
              <ConfirmationPrompt
                onConfirm={() => {
                  archiveRev.mutate({
                    id: id,
                  });
                }}
                onCancel={() => setShowDelPrompt(false)}
                message="Are you sure you want to archive this review? "
                submessage=""
                // submessage="This action cannot be undone."
              />
            )}
          </div>
        </div>
      )}

      {userSession?.profile.id === user.id &&
        userSession?.profile.type === UserType.USER && (
          <div className="absolute right-0 m-3 text-xs">
            <div className="flex">
              <div className="mx-2"></div>
              {editMode ? (
                <button
                  className="flex flex-row space-x-2"
                  onClick={void handleSaveClick}
                >
                  Save
                </button>
              ) : (
                <button
                  className="flex flex-row space-x-2"
                  onClick={handleEditClick}
                >
                  Edit
                </button>
              )}

              <div className="mx-2"></div>
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
      {isUserViewing &&
        userSession?.profile.id !== user.id &&
        userSession?.profile.type !== UserType.ADMIN && (
          <div className="absolute right-0 m-3 text-xxs">
            {/*The report button will stick to the bottom left of the screen*/}
            <button
              className="flex flex-row space-x-10"
              onClick={() => {
                reportAccomm.mutate({
                  reported_id: id,
                  reported_name:
                    review !== ""
                      ? '"'.concat(
                          "",
                          review!.concat('" on ', date!.concat(" at ", time!)),
                        )
                      : "a review on ".concat(
                          "",
                          date!.concat(" at ", time ?? ""),
                        ),
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
