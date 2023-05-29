import { useState } from "react";
import { api } from "~/utils/api";
import Link from "next/link";

{
  /* TODO: Tweak data types to be displayed for each variable in the component */
}
// eslint-disable-next-line
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
  refetch?: any;
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
  refetch,
}) => {
  const [imgSrc, setImgSrc] = useState(
    // `https://stals-worker.p0lbang.workers.dev/${id}.jpg`,
    `https://stals-worker.p0lbang.workers.dev/api/v2/${id}/${id}`,
  );

  const archiveAccomm = api.accommodation.archive.useMutation({
    onSuccess: () => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      void refetch();
    },
  });

  const deleteAccomm = api.accommodation.delete.useMutation({
    onSuccess: () => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      void refetch();
    },
  });

  return (
    <div className="">
      <>
        <div className="mx-20 flex rounded border-2 bg-white p-2 shadow-md">
          <div className="flex flex-row space-x-2">
            <img
              className="w-1/2 p-2"
              src={imgSrc}
              alt="placeholder img"
              onError={() => {
                setImgSrc("https://via.placeholder.com/640x640");
              }}
            />

            <div className="w-full bg-white p-2">
              <div className="mb-2 rounded-lg bg-p-dviolet p-2 shadow-md">
                {/* ARCHIVED */}
                {is_archived && (
                  <p className="mb-0.5 text-xl font-bold text-white">
                    {name} (Archived){" "}
                  </p>
                )}

                {/* NOT ARCHIVED */}
                {!is_archived && (
                  <p className="mb-0.5 text-xl font-bold text-white">{name}</p>
                )}

                {/* PRICE */}
                <p className="text-white">Price: {price}</p>
              </div>

              <div className="flex flex-row space-x-2">
                <div className="w-full rounded-lg bg-p-dviolet shadow-md">
                  {/* CATEGORY */}
                  <p className="mb-0.5 p-2 text-center text-xl font-bold text-white">
                    Category:
                  </p>
                  <p className="p-2 text-center text-white">
                    {typeArray.join(", ")}
                  </p>
                </div>

                <div className="w-full rounded-lg bg-p-dviolet shadow-md">
                  {/* LOCATION */}
                  <p className="mb-0.5 p-2 text-center text-xl font-bold text-white">
                    Location:
                  </p>
                  <p className="p-2 text-center text-white">{location}</p>
                </div>

                <div className="w-full rounded-lg bg-p-dviolet shadow-md">
                  {/* NUM OF ROOMS */}
                  <p className="mb-0.5 p-2 text-center text-xl font-bold text-white">
                    Rooms:
                  </p>
                  <p className="p-2 text-center text-white">{num_of_rooms}</p>
                </div>
              </div>
            </div>

            <div className="w-full bg-white p-2">
              <div className="mb-2 rounded-lg bg-p-dviolet p-2">
                {/* TAGS */}
                <p className="mb-0.5 text-xl font-bold text-white">Tags:</p>
                <p className="italic text-white">{tags}</p>
              </div>
              <div className="h-20 w-full bg-white"></div>

              {/* ARCHIVE, EDIT, & DELETE  BUTTONS */}
              <div className="flex w-full flex-row space-x-2">
                <div className="w-full bg-white"></div>

                {/* EDIT */}
                <Link
                  className="rounded-md bg-p-dbviolet p-2 text-xl font-bold text-white shadow"
                  href={`${id}/edit`}
                >
                  Edit
                </Link>

                {/* RESTORE */}
                {is_archived && (
                  <button
                    className="rounded-md bg-p-dbviolet p-2 text-xl font-bold text-white shadow"
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
                    className="rounded-md bg-p-dbviolet p-2 text-xl font-bold text-white shadow"
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
                  className="rounded-md bg-p-dbviolet p-2 text-xl font-bold text-white shadow"
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
