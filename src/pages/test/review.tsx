import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

import { api } from "~/utils/api";
import { stringify } from "superjson";

export default function Backend() {
  // const { data: firstData, isLoading: queryLoading } =
  //   api.review.getMany.useQuery({
  //     accommodationId: "1",
  //     page: 0,
  //     multiplier: 0
  //   });
  const postReview = api.review.add.useMutation();

  // if (queryLoading) {
  //   return <div>Loading</div>;
  // }
  return (
    <div>
      <div>BACKEND STUFF</div>
      <input
        type="text"
        placeholder="Write Review"
        className="input-bordered input input-sm w-full"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            postReview.mutate({
              review: e.currentTarget.value,
              accommodationId: "1",
              rating: 5,
            });
            e.currentTarget.value = "";
          }
        }}
      />

      {/* {stringify(firstData)} */}
    </div>
  );
}
