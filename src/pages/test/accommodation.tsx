import { api } from "~/utils/api";

export default function Backend() {
  const createAccommodation = api.accommodation.add.useMutation();
  return (
    <div>
      <div>ACCOMMODATION ROUTER TESTING</div>
      <input
        type="text"
        placeholder="Name"
        className="input-bordered input input-sm w-full"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            createAccommodation.mutate({
              type: "HOTEL",
              name: e.currentTarget.value,
              contact_number: "8700",
              address: "Jollibee Lopez Avenue UPLB",
              location: "100 N, 001 E",
              tags: "this is a tag",
              num_of_rooms: 1,
              is_archived: false,
            });
            e.currentTarget.value = "";
          }
        }}
      />
    </div>
  );
}
