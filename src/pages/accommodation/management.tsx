import { UserType, type Accommodation } from "@prisma/client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import NavBar from "~/components/navbar";
import { api } from "~/utils/api";
import { notAuthenticated, stalsDBstringArray } from "~/utils/helpers";
import Accomm_Segment from "~/components/accomm_segment";
import LoadingSpinner from "~/components/loadingSpinner";
import Link from "next/link";
import Error401 from "~/pages/401";
import bg from "public/images/background_management.png";

export default function Delete_Archive_Accomm() {
  const userSession = useSession({ required: true });

  const { data, isLoading, refetch } = api.accommodation.getMany.useQuery({
    landlord: userSession.data?.user.id,
  });

  if (notAuthenticated(userSession.status)) {
    return <LoadingSpinner />;
  }
  if (userSession?.data?.profile.type === UserType.USER) {
    return Error401();
  }

  function priceCommas(x: string) {
    const pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(x)) x = x.replace(pattern, "$1,$2");
    return x;
  }
  return (
    <div className="min-h-[80vh]">
      <img className="site-background" src={bg.src} alt="background" />
      <NavBar />

      <main className="z-30 py-5">
        <p className="mb-6 text-center text-3xl font-extrabold text-white drop-shadow-sm">
          My Accommodations
        </p>

        <div className="mb-4 flex justify-center">
          <Link
            className="rounded-md bg-p-dviolet p-4 text-xl font-bold text-white shadow hover:bg-white/20"
            href={`/accommodation/add`}
          >
            Add New Accommodation
          </Link>
        </div>

        {userSession.data?.user &&
          data?.map((accomm: Accommodation) => (
            <>
              <div className="flex">
                <div className="flex w-full flex-row justify-center space-x-2">
                  {/* TODO: Display each accommodation with the component "accomm_segment.tsx" */}
                  <Accomm_Segment
                    id={accomm.id}
                    name={accomm.name}
                    price={
                      accomm.price !== undefined && accomm.price !== null
                        ? priceCommas(accomm.price.toFixed(2))
                        : ""
                    }
                    num_of_rooms={accomm.num_of_rooms}
                    barangay={accomm.barangay}
                    typeArray={stalsDBstringArray(accomm.typeArray)}
                    tagArray={stalsDBstringArray(accomm.tagArray)}
                    is_archived={accomm.is_archived}
                    location={accomm.location}
                    refetch={refetch}
                  />
                </div>
                <br />
              </div>
            </>
          ))}
      </main>
    </div>
  );
}
