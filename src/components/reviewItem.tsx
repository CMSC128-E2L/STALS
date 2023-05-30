/* eslint-disable @next/next/no-img-element */
import React from "react";
import StarRow from "./starRow";
import { type User } from "@prisma/client";
import userImage from "public/placeholder_1.png";
import toast from "react-hot-toast";
import { api } from "~/utils/api";
import { useSession } from "next-auth/react";

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

  const reportAccomm = api.report.add.useMutation();

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
        <StarRow rating={rating ?? 0} class={"justify-left !grow-0"} />
      </div>

      {/*Edit review button*/}
      <div className="m-3 text-xs">
        <button
          className="flex flex-row space-x-10"
          onClick={() => {
            // reportAccomm.mutate({
            //   reported_id: id,
            //   reported_name: accomm!.name,
            //   report: "",
            //   type_reported: "ACCOMMODATION",
            // });
          }}
        >
          Edit
        </button>
      </div>

      {/*Delete review button*/}
      <div className="m-3 text-xs">
        <button
          className="flex flex-row space-x-10"
          onClick={() => {
            // reportAccomm.mutate({
            //   reported_id: id,
            //   reported_name: accomm!.name,
            //   report: "",
            //   type_reported: "ACCOMMODATION",
            // });
          }}
        >
          Delete
        </button>
      </div>

      {/* Report button for review */}
      {userSession !== null && (
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
