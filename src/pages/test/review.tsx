import { api } from "~/utils/api";

export default function Backend() {
  const postReview = api.review.add.useMutation();

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
    </div>
  );
}
