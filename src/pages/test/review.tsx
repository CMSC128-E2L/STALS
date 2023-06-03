import { api } from "~/utils/api";
import { stringify } from "superjson";

export default function Backend() {
  const postReview = api.review.add.useMutation();
  const editReview = api.review.edit.useMutation();
  const deleteReview = api.review.delete.useMutation();
  const getReviews = api.review.getMany.useQuery({
    accommodationId: "clh5y6nqg0002uaj8mk48y7tz",
    page: 0,
    multiplier: 5,
  });

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
      <input
        type="text"
        placeholder="Edit Review"
        className="input-bordered input input-sm w-full"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            editReview.mutate({
              id: "clhakcoqn0000x9tl91p8x5ll",
              review: e.currentTarget.value,
              rating: 5,
            });
            e.currentTarget.value = "";
          }
        }}
      />
      <input
        type="text"
        placeholder="Delete Review given id"
        className="input-bordered input input-sm w-full"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            deleteReview.mutate({
              id: e.currentTarget.value, //"clheizwbx0000x9cu44qq7skk",
            });
            e.currentTarget.value = "";
          }
        }}
      />
      {stringify(getReviews)}
    </div>
  );
}
