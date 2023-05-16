import { api } from "~/utils/api";
import { stringify } from "superjson";

/*
TESTING:
(1) Create Accom [x]
(2) Get All [x]
(3) Get Many
(4) Get one
(5) Get Archives [x]
(6) Delete
(7) Edit
*/
export default function Backend() {
  // const { data: firstData } = api.accommodation.getArchives.useQuery();
  // const getOne = api.accommodation.getOne.useQuery("clhaovx8u000cua9oc93vzie1");

  const getMany = api.accommodation.getMany.useQuery({
    barangay: "Batong Malake",
  });

  const getBarangays = api.accommodation.getBarangays.useQuery();

  // mutate
  // const createAccommodation = api.accommodation.add.useMutation();
  // const deleteAccommodation = api.accommodation.delete.useMutation();
  // const archiveAccommodation = api.accommodation.archive.useMutation();
  //const editAccommodation = api.accommodation.edit.useMutation();

  return (
    <>
      <div>
        <div>ACCOMMODATION ROUTER TESTING</div>
        <input
          type="text"
          placeholder="Name"
          className="input-bordered input input-sm w-full"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              // createAccommodation.mutate({
              //   type: "HOTEL",
              //   name: e.currentTarget.value,
              //   contact_number: "8700",
              //   address: "Jollibee Lopez Avenue UPLB",
              //   location: "100 N, 001 E",
              //   tags: "this is a tag",
              //   num_of_rooms: 1,
              //   is_archived: false,
              // });

              // editAccommodation.mutate({
              //   id: "clhaqjdzx0002ua34zhrmj7cq",
              //   address: e.currentTarget.value,
              // });

              // archiveAccommodation.mutate({
              //   id: e.currentTarget.value,
              //   is_archived: false,
              // });

              // deleteAccommodation.mutate(
              //   e.currentTarget.value,
              // );

              // editAccommodation.mutate({
              //   id: "clhaovx8u000cua9oc93vzie1",
              //   name: e.currentTarget.value,
              // });

              e.currentTarget.value = "";
            }
          }}
        />
      </div>
      <div>
        <div>BACKEND DATA</div>
        {stringify(getBarangays)}
      </div>
    </>
  );

  // if (queryLoading) {
  //   return <div>Loading</div>;
  // }
  // return (
  //   <div>
  //     <div>BACKEND STUFF</div>
  //     {stringify(firstData)}
  //   </div>
  // );
}
