import { type Accommodation } from "@prisma/client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import NavBar from "~/components/navbar";
import { api } from "~/utils/api";
import { notAuthenticated, stalsDBstringArray } from "~/utils/helpers";
import Accomm_Segment from "~/components/accomm_segment";
import LoadingSpinner from "~/components/loadingSpinner";
import Link from "next/link";

export default function Delete_Archive_Accomm() {
  const userSession = useSession({ required: true });

  const { data, isLoading, refetch } = api.accommodation.getMany.useQuery({
    landlord: userSession.data?.user.id,
  });

  if (notAuthenticated(userSession.status)) {
    return <LoadingSpinner />;
  }

  return (
    <div className="">
      <NavBar />
      <br />
      <p className="mb-6 text-center text-3xl font-bold text-p-dviolet drop-shadow-sm">
        My Accommodations
      </p>

      <div className="mb-4 flex justify-center">
        <Link
          className="rounded-md bg-p-dviolet p-4 text-xl font-bold text-white shadow hover:bg-p-dbviolet"
          href={`/accommodation/add`}
        >
          Add New Accommodation
        </Link>
      </div>

      {userSession.data?.user &&
        data?.map((accomm: Accommodation) => (
          <>
            <div className="flex items-center justify-center">
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
                  is_archived={accomm.is_archived}
                  location={accomm.location}
                  tags={accomm.tags}
                  refetch={refetch}
                />
              </div>
              <br />
            </div>
          </>
        ))}
    </div>
  );
}
