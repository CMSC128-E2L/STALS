import { type Accommodation } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { stringify } from "superjson";
import Image from "next/image";
import { api } from "~/utils/api";
import { stalsDBstringArray } from "~/utils/helpers";
import Link from "next/link";
import placeholder from "public/images/logo.png";

{
  /* TODO: Tweak data types to be displayed for each variable in the component */
}
const Accomm_Segment: React.FC<{
  id: string;
  name: string;
  price: number | null /* SHOULD BE FLOAT */;
  num_of_rooms: number;
  barangay: string | null;
  typeArray: Array<string>;
  tagArray: Array<string>;
  is_archived: boolean;
  location: string;
  tags: string;
}> = ({
  id,
  name,
  price,
  num_of_rooms,
  barangay,
  typeArray,
  tagArray,
  is_archived,
  location,
  tags,
}) => {
  const [imgSrc, setImgSrc] = useState(
    `https://stals-worker.p0lbang.workers.dev/${id}.jpg`,
  );

  const session = useSession();

  const { data, isLoading, refetch } = api.accommodation.getMany.useQuery({
    landlord: session.data?.user.id,
  });

  {
    /* TODO: Add functionality for "add" and "edit" accommodation buttons */
  }

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
      <>
        <div className="mx-4 flex rounded bg-blue-200 p-2">
          <div className="flex flex-row space-x-2">
            <img
              className="w-1/2 p-2"
              src={imgSrc}
              alt="placeholder img"
              onError={() => {
                setImgSrc("https://via.placeholder.com/640x640");
              }}
            />

            <div className="w-full bg-blue-200 p-2">
              <div className="mb-2 rounded-lg bg-blue-100 p-2">
                {/* ARCHIVED */}
                {is_archived && <p>{name} (Archived) </p>}

                {/* NOT ARCHIVED */}
                {!is_archived && <p>{name}</p>}

                {/* PRICE */}
                <p>Price: {price}</p>
              </div>

              <div className="flex flex-row space-x-2">
                <div className="w-full rounded-lg bg-blue-100">
                  {/* CATEGORY */}
                  <p className="p-2 text-center">Category:</p>
                  <p className="p-2 text-center">{typeArray.join(", ")}</p>
                </div>

                <div className="w-full rounded-lg bg-blue-100">
                  {/* LOCATION */}
                  <p className="p-2 text-center">Location:</p>
                  <p className="p-2 text-center">{location}</p>
                </div>

                <div className="w-full rounded-lg bg-blue-100">
                  {/* NUM OF ROOMS */}
                  <p className="p-2 text-center">Rooms:</p>
                  <p className="p-2 text-center">{num_of_rooms}</p>
                </div>
              </div>
            </div>

            <div className="w-full bg-blue-200 p-2">
              <div className="mb-2 rounded-lg bg-blue-100 p-2">
                {/* TAGS */}
                <p>Tags:</p>
                <p>{tags}</p>
              </div>
              <div className="h-20 w-full bg-blue-200"></div>

              {/* ARCHIVE, EDIT, & DELETE  BUTTONS */}
              <div className="flex w-full flex-row space-x-2">
                <div className="w-full bg-blue-200"></div>

                {/* EDIT */}
                <Link
                  className="rounded border border-gray-400 bg-white p-2"
                  href={`${id}/edit`}
                >
                  Edit
                </Link>

                {/* RESTORE */}
                {is_archived && (
                  <button
                    className="rounded border border-gray-400 bg-white p-2"
                    onClick={() => {
                      archiveAccomm.mutate({
                        id: id,
                        is_archived: is_archived,
                      });
                    }}
                  >
                    Restore
                  </button>
                )}

                {/* ARCHIVE */}
                {!is_archived && (
                  <button
                    className="rounded border border-gray-400 bg-white p-2"
                    onClick={() => {
                      archiveAccomm.mutate({
                        id: id,
                        is_archived: is_archived,
                      });
                    }}
                  >
                    Archive
                  </button>
                )}

                {/* DELETE */}
                <button
                  className="rounded border border-gray-400 bg-white p-2"
                  onClick={() => {
                    deleteAccomm.mutate({
                      id: id,
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
    </div>
  );
};

export default Accomm_Segment;
