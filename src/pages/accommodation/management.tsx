import { type Accommodation } from "@prisma/client";
import { useSession } from "next-auth/react";
import { stringify } from "superjson";
import NavBar from "~/components/navbar";
import { api } from "~/utils/api";

export default function Delete_Archive_Accomm() {
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
      <NavBar />
      <br />
      <p className="mb-4 text-center text-xl font-bold drop-shadow-md">
        Accommodations
      </p>

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
                      {accomm.name} {String(accomm.is_archived)}
                    </p>
                    <p>Php. XX,XXXX.XX - XX,XXXX.XX</p>
                  </div>

                  <div className="flex flex-row space-x-2">
                    <div className="w-full rounded-lg bg-blue-100">
                      <p className="p-2 text-center">Category:</p>
                      <p className="p-2 text-center">
                        {stringify(accomm.typeArray)}
                      </p>
                    </div>

                    <div className="w-full rounded-lg bg-blue-100">
                      <p className="p-2 text-center">Location:</p>
                      <p className="p-2 text-center">{accomm.barangay}</p>
                    </div>

                    <div className="w-full rounded-lg bg-blue-100">
                      <p className="p-2 text-center">Rooms:</p>
                      <p className="p-2 text-center">2BR</p>
                    </div>
                  </div>
                </div>

                <div className="w-full bg-blue-200 p-2">
                  <div className="mb-2 rounded-lg bg-blue-100 p-2">
                    <p>Tags:</p>
                    <p>Lorem, Ipsum, Dolor, Sit, Amet</p>
                  </div>
                  <div className="h-20 w-full bg-blue-200"></div>

                  <div className="flex w-full flex-row space-x-2">
                    <div className="w-full bg-blue-200"></div>

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
}
