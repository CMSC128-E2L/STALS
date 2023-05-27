import { type Accommodation } from "@prisma/client";
import { useSession } from "next-auth/react";
import { stringify } from "superjson";
import Image from "next/image";
import { api } from "~/utils/api";
import { stalsDBstringArray } from "~/utils/helpers";

{
  /* TODO: Tweak data types to be displayed for each variable in the component */
}
const Accomm_Segment: React.FC<{
  id: string;
  name: string;
  price: number /* SHOULD BE FLOAT */;
  num_of_rooms: number;
  barangay: string;
  typeArray: Array<string>;
  tagArray: Array<string>;
}> = ({ id, name, price, num_of_rooms, barangay, typeArray, tagArray }) => {
  const session = useSession();

  const { data, isLoading, refetch } = api.accommodation.getMany.useQuery({
    landlord: session.data?.user.id,
  });

  const archiveAccomm = api.accommodation.archive.useMutation({
    onSuccess: () => {
      void refetch();
    },
  });

  const deleteAccomm = api.accommodation.delete.useMutation({
    onSuccess: () => {
      void refetch();
    },
  });

  return (
    <div className="">
      {session.data?.user &&
        data?.map((accomm: Accommodation) => (
          <>
            <div className="mx-4 flex rounded bg-blue-200 p-2">
              <div className="flex flex-row space-x-2">
                <img
                  className="w-1/2 p-2"
                  src="https://via.placeholder.com/640x640"
                  alt="placeholder img"
                />

                <div className="w-full bg-blue-200 p-2">
                  <div className="mb-2 rounded-lg bg-blue-100 p-2">
                    <p>
                      {accomm.name} | Archived: {String(accomm.is_archived)}
                    </p>
                    {/* PRICE */}
                    {/* <p>Php. XX,XXXX.XX - XX,XXXX.XX</p> */}
                    <p>Price: {accomm.price}</p>
                  </div>

                  <div className="flex flex-row space-x-2">
                    <div className="w-full rounded-lg bg-blue-100">
                      {/* CATEGORY */}
                      <p className="p-2 text-center">Category:</p>
                      <p className="p-2 text-center">
                        {stalsDBstringArray(accomm.typeArray).join(", ")}
                      </p>
                    </div>

                    <div className="w-full rounded-lg bg-blue-100">
                      {/* LOCATION */}
                      <p className="p-2 text-center">Location:</p>
                      <p className="p-2 text-center">{accomm.location}</p>
                    </div>

                    <div className="w-full rounded-lg bg-blue-100">
                      {/* NUM OF ROOMS */}
                      <p className="p-2 text-center">Rooms:</p>
                      <p className="p-2 text-center">{accomm.num_of_rooms}</p>
                    </div>
                  </div>
                </div>

                <div className="w-full bg-blue-200 p-2">
                  <div className="mb-2 rounded-lg bg-blue-100 p-2">
                    {/* TAGS */}
                    <p>Tags:</p>
                    <p>{accomm.tags}</p>
                  </div>
                  <div className="h-20 w-full bg-blue-200"></div>

                  {/* ARCHIVE & DELETE BUTTONS */}
                  <div className="flex w-full flex-row space-x-2">
                    <div className="w-full bg-blue-200"></div>

                    {/* ARCHIVE */}
                    <button
                      className="rounded border border-gray-400 bg-white p-2"
                      onClick={() => {
                        archiveAccomm.mutate({
                          id: accomm.id,
                          is_archived: accomm.is_archived,
                        });
                      }}
                    >
                      Archive
                    </button>

                    {/* DELETE */}
                    <button
                      className="rounded border border-gray-400 bg-white p-2"
                      onClick={() => {
                        deleteAccomm.mutate({
                          id: accomm.id,
                        });
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <br />
          </>
        ))}
    </div>
  );
};

export default Accomm_Segment;
