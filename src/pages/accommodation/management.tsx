import { type Accommodation } from "@prisma/client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import NavBar from "~/components/navbar";
import { api } from "~/utils/api";
import { notAuthenticated, stalsDBstringArray } from "~/utils/helpers";
import Accomm_Segment from "~/components/accomm_segment";
import LoadingSpinner from "~/components/loadingSpinner";

export default function Delete_Archive_Accomm() {
  const userSession = useSession({ required: true });

  const { data, isLoading, refetch } = api.accommodation.getMany.useQuery({
    landlord: userSession.data?.user.id,
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

  if (notAuthenticated(userSession.status)) {
    return <LoadingSpinner />;
  }

  return (
    <div className="">
      <NavBar />
      <br />
      <p className="mb-4 text-center text-xl font-bold drop-shadow-md">
        Accommodations
      </p>

      {userSession.data?.user &&
        data?.map((accomm: Accommodation) => (
          <>
            <div className="mx-4 flex rounded bg-blue-200 p-2">
              <div className="flex flex-row space-x-2">
                {/* TODO: Display each accommodation with the component "accomm_segment.tsx" */}
                <Accomm_Segment
                  id={accomm.id}
                  name={accomm.name}
                  price={accomm.price}
                  num_of_rooms={accomm.num_of_rooms}
                  barangay={accomm.barangay}
                  typeArray={stalsDBstringArray(accomm.typeArray)}
                  tagArray={stalsDBstringArray(accomm.tagArray)}
                />
              </div>
            </div>
            <br />
          </>
        ))}
    </div>
  );
}
