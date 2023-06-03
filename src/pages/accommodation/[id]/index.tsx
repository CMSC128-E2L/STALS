import NavBar from "~/components/navbar";
import UserProfile from "~/components/userProfile";
import StarRow from "~/components/starRow";
import RoomButton from "~/components/roomButton";
import Link from "next/link";
import Image from "next/image";
import { api } from "~/utils/api";
import { useRouter } from "next/router";
import { dynamicRouteID, stalsDBstringArray } from "~/utils/helpers";
import Error404 from "~/pages/404";
import { useSession } from "next-auth/react";
import Review from "~/components/review";
import { useEffect, useRef, useState } from "react";
import Landlord from "~/components/landlord";
import { UserType } from "@prisma/client";
import toast from "react-hot-toast";
import Carousel from "~/components/carousel";
import LoadingSpinner from "~/components/loadingSpinner";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import placeholder from "public/images/logo d-violet2.png";

export default function Accommodation() {
  const { id } = dynamicRouteID(useRouter());
  const { data: userSession } = useSession();

  const isUserViewing = userSession?.profile.type === UserType.USER;
  const isGuest = userSession === null;

  const [isFavorite, setIsFavorite] = useState(false);

  const { data: accommData, isLoading: accommLoading } =
    api.accommodation.getOneRelations.useQuery(id);

  const { data: accomm } = api.accommodation.getOne.useQuery(id);

  const { data: ImageList, isLoading: imageLoading } =
    api.file.getAccommImages.useQuery({ id });

  const reportAccomm = api.report.add.useMutation();

  const { data: favorites, isLoading: favoritesLoading } =
    api.user.getFavorites.useQuery();

  const addFavorite = api.user.addFavorite.useMutation({
    onSuccess: () => {
      toast.success("Added to favorites!", {
        position: "bottom-right",
        duration: 3000,
      });
    },
    onError: () => {
      toast.error("Failed to add to favorites!", {
        position: "bottom-right",
        duration: 3000,
      });
    },
  });

  const removeFavorite = api.user.removeFavorite.useMutation({
    onSuccess: () => {
      toast.success("Removed from favorites!", {
        position: "bottom-right",
        duration: 3000,
      });
    },
    onError: () => {
      toast.error("Failed to remove from favorites!", {
        position: "bottom-right",
        duration: 3000,
      });
    },
  });

  const handleFavorite = (event: { target: { checked: boolean } }) => {
    const isChecked = event.target.checked;
    if (isChecked) {
      addFavorite.mutate(id);
    } else {
      removeFavorite.mutate(id);
    }
    setIsFavorite(!isFavorite);
  };

  const tagArr = stalsDBstringArray(accommData?.tagArray);
  const typeArr = stalsDBstringArray(accommData?.typeArray);

  useEffect(() => {
    // Check if accommodationId exists in favorites
    if (favorites && !isGuest) {
      const isFavorite = favorites.some(
        (favorite) => favorite.accommodation.id === accommData?.id,
      );
      setIsFavorite(isFavorite);
    }
  }, [favorites, accommData?.id, isGuest]);

  // const { data: RoomList, isLoading: roomLoading } = api.room.getMany.useQuery({
  //   id: id,
  //   status: undefined,
  // });

  const isLandlordViewing =
    userSession?.profile.type === UserType.LANDLORD &&
    accommData?.landlord === userSession?.user?.id;

  const calledOnce = useRef(false);
  const [pdfdownload, setpdfdownload] = useState(false);
  const pdf = new jsPDF();

  useEffect(() => {
    if (calledOnce.current) {
      calledOnce.current = false;
      return;
    }

    if (pdfdownload) {
      calledOnce.current = true;
      setpdfdownload(false);

      const roominfo: (string | number)[][] = [];

      accommData?.Room.map((i, n) => {
        if (i.is_archived == false) {
          roominfo.push([
            n + 1,
            i.price,
            i.occupied ? "Yes" : "No",
            i.num_of_beds,
            i.with_aircon ? "with" : "without",
            i.with_utilities ? "with" : "without",
          ]);
        }
      });

      autoTable(pdf, {
        head: [["Accommodation", "Details"]],
        body: [
          ["Name", accommData?.name ?? ""],
          [
            "Address",
            `${accommData?.street_number ?? ""}${
              accommData?.subdivision ?? ""
            }${accommData?.barangay ? `Brgy. ${accommData?.barangay}` : ""}`,
          ],
          // `${accommData?.street_number ? `${accommData?.street_number} St. `:""}${accommData?.subdivision ? `${accommData?.subdivision} Subd. `:""}${accommData?.subdivision ?? ""}${accommData?.barangay ? `Brgy. ${accommData?.barangay}`:""}`],
          [
            "Type",
            (accommData?.type ||
              stalsDBstringArray(accommData?.typeArray).toString()) ??
              "",
          ],
          ["Price", accommData?.price ?? ""],
          ["Contract Length", accommData?.contract_length ?? "None specified"],
          ["Tags", stalsDBstringArray(accommData?.tagArray).toString()],
        ],

        didDrawPage: function (data) {
          // Page Header
          pdf.setFillColor(29, 93, 154);
          pdf.rect(10, 10, pdf.internal.pageSize.width - 20, 15, "F");
          pdf.setFont("helvetica", "bold");
          pdf.setFontSize(18);
          pdf.setTextColor(255, 255, 255);
          const textX = 20;
          const textY = 20;
          pdf.text("STALS", textX, textY);
        },
        margin: { top: 30 },
        columnStyles: { 0: { cellWidth: 40 } },
      });

      autoTable(pdf, {
        head: [
          ["Room", "Price", "Occupied", "Beds", "Airconditioner", "Utilities"],
        ],
        body: roominfo,
        margin: { top: 30 },
        columnStyles: { 0: { cellWidth: 30 } },
      });

      autoTable(pdf, {
        head: [["Landlord", "Details"]],
        body: [
          [
            "Name",
            `${accommData?.landlordUser.first_name ?? ""}  ${
              accommData?.landlordUser.last_name ?? ""
            }`,
          ],
          ["Contact Number", accommData?.landlordUser.contact_number ?? ""],
          ["Email", accommData?.landlordUser.email_address ?? ""],
        ],
        margin: { top: 30 },
        columnStyles: { 0: { cellWidth: 30 } },
      });
    }

    if (calledOnce.current) pdf.save("STALS.pdf");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pdfdownload]);

  if (accommData === null) {
    return Error404();
  }

  const Gallery = () => {
    return (
      <div className="grid w-full grid-cols-2 gap-4">
        {/* main image */}
        <div className="max-w relative col-span-2">
          {!imageLoading && ImageList ? (
            ImageList.length > 0 ? (
              <div className="max-w relative col-span-2">
                <Carousel imageList={ImageList} />
              </div>
            ) : (
              <div className="max-w relative col-span-2 rounded-md text-center">
                <Carousel imageList={[placeholder.src]} />
              </div>
            )
          ) : (
            <div>
              <LoadingSpinner />
            </div>
          )}
        </div>
      </div>
    );
  };

  const OverAllRating = () => {
    return (
      <div className="flex flex-row divide-x-2 divide-transparent pt-4">
        <div className="w-[100%] rounded-[15px] border border-gray-200 bg-gray-200 p-3">
          <div className="text-center">
            <h1 className="text-2xl font-bold">Overall Rating</h1>
            <p className="text-5xl font-bold">
              {Number(accommData?.average_rating ?? 0).toFixed(1)}
            </p>
            <p className="italic">
              based on {accommData?.total_reviews ?? 0} reviews
            </p>
            <StarRow rating={accommData?.average_rating ?? 0} />
          </div>
        </div>
      </div>
    );
  };

  const Description = () => {
    return (
      <div className="p-4">
        {/* ACCOMMODATION NAME + edit + delete thngy idk*/}
        <div className="flex flex-row items-stretch justify-between">
          {/* Left column (accommodation name) */}
          <div className="flex grow items-center px-3">
            {!accommLoading ? (
              <h1 className="text-3xl font-bold">{accommData?.name}</h1>
            ) : (
              <h1 className="grow animate-pulse rounded-full bg-gray-400 text-3xl font-bold">
                &nbsp;&nbsp;
              </h1>
            )}
          </div>

          {/* Right column: functional buttons (favorite, download, edit, etc) */}
          <div className="">
            {/* TODO: So if a registered user is viewing it (remove hidden to show teehee)
        WONDERING KUNG UNG IMPLEMENTATION NA LANG NITO VIA COMPONENT OR NAH*/}
            <div className="flex flex-row items-center gap-2">
              {isUserViewing && (
                <form>
                  <label className="cursor-pointer">
                    <input
                      type="checkbox"
                      value="favorite"
                      className="peer sr-only"
                      checked={isFavorite}
                      onChange={handleFavorite}
                    />
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className={`h-8 w-8 transition ${
                        isFavorite ? "fill-p-red stroke-p-red" : ""
                      }`}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                      />
                    </svg>
                  </label>
                </form>
              )}
              {/* If a landlord is viewing the page */}
              {isLandlordViewing && (
                <div className="float-right flex gap-2">
                  {/* Edit button */}
                  <Link className="" href={`${id}/edit`}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="h-8 w-8"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                      />
                    </svg>
                  </Link>
                </div>
              )}
              <label className="cursor-pointer">
                <button
                  className="accPButton sr-only mx-3 mb-2 self-end px-3 text-lg"
                  onClick={() => {
                    setpdfdownload(true);
                  }}
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-8 w-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
                  />
                </svg>
              </label>
            </div>
          </div>
        </div>

        {/* ACCOMMODATION DESCRIPTION */}
        {typeArr.map((tags, index) => (
          <span key={index} className="px-4 text-xl italic">
            {tags}
          </span>
        ))}

        {/* LANDLORD */}

        <div className="ml-3 mt-2 text-xl">
          <p className="text-sm italic">Posted by:</p>
          {!accommLoading ? (
            <Landlord
              firstname={accommData?.landlordUser.first_name}
              lastname={accommData?.landlordUser.last_name}
              middle={accommData?.landlordUser.middle_name}
              suffix={accommData?.landlordUser.Suffix}
            />
          ) : (
            <div className="flex max-w-[200px] grow animate-pulse flex-row rounded-full bg-gray-400">
              &nbsp;
            </div>
          )}
        </div>

        {/* DESCRIPTION */}
        <div className="flex basis-1/2 flex-col">
          <div className="group overflow-hidden px-4 py-2">
            {/* TODO: since the tags of an accommodation is just a string, just print that string here.*/}

            {/* {accommData?.tags} */}
            {tagArr
              .filter((tag) => tag !== "")
              .map((tag, index, array) => (
                <span
                  key={tag}
                  className="mb-2 mr-2 inline-block rounded-full bg-p-lviolet px-3 py-1 text-sm font-semibold text-gray-700"
                >
                  {tag}
                  {index !== array.length - 1}
                </span>
              ))}
          </div>

          {/* Other deets */}

          <div className="flex flex-col gap-2">
            {/* Price */}
            <div className="flex flex-row gap-10 px-3">
              <svg
                fill="#000000"
                width="16"
                height="16"
                viewBox="0 0 36 36"
                version="1.1"
                preserveAspectRatio="xMidYMid meet"
                xmlns="http://www.w3.org/2000/svg"
                className="aspect-square h-full place-self-center"
              >
                <path d="M31,13.2H27.89A6.81,6.81,0,0,0,28,12a7.85,7.85,0,0,0-.1-1.19h2.93a.8.8,0,0,0,0-1.6H27.46A8.44,8.44,0,0,0,19.57,4H11a1,1,0,0,0-1,1V9.2H7a.8.8,0,0,0,0,1.6h3v2.4H7a.8.8,0,0,0,0,1.6h3V31a1,1,0,0,0,2,0V20h7.57a8.45,8.45,0,0,0,7.89-5.2H31a.8.8,0,0,0,0-1.6ZM12,6h7.57a6.51,6.51,0,0,1,5.68,3.2H12Zm0,4.8H25.87a5.6,5.6,0,0,1,0,2.4H12ZM19.57,18H12V14.8H25.25A6.51,6.51,0,0,1,19.57,18Z"></path>
              </svg>
              {!accommLoading ? (
                <div className="">{accommData?.price}</div>
              ) : (
                <div className="w-[100px] animate-pulse overflow-hidden rounded-full bg-gray-400">
                  &nbsp;&nbsp;
                </div>
              )}
            </div>

            {/* Location */}
            <div className="flex flex-row gap-10 px-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                />
              </svg>
              {!accommLoading ? (
                <div className="">
                  {accommData?.street_number} {accommData?.subdivision}{" "}
                  {accommData?.barangay} {" - "}
                  {accommData?.location}
                </div>
              ) : (
                <div className="w-[100px] animate-pulse overflow-hidden rounded-full bg-gray-400">
                  &nbsp;&nbsp;
                </div>
              )}
            </div>

            {/* Address */}
            <div className="flex flex-row gap-10 px-2">
              {accommData?.contact_number ? (
                <>
                  <svg
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-5 w-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                    />
                  </svg>
                  <p>{accommData?.contact_number}</p>
                </>
              ) : (
                <></>
              )}
            </div>

            {accommData?.fb_page ? (
              <div className="flex flex-row gap-10 px-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="p-dblue"
                  className="h-5 w-5"
                  viewBox="0 0 16 16"
                >
                  <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
                </svg>
                <Link
                  href={`https://${accommData.fb_page}`}
                  target="_blank"
                  className="cursor-pointer underline"
                >
                  <p>{accommData.fb_page}</p>
                </Link>
              </div>
            ) : (
              <></>
            )}
          </div>

          {/* Rooms 
      TODO: This is gonna get the list of rooms in prisma/schema.prisma and load the component <RoomButton /> (components/RoomButton.tsx) with the room id.*/}
          <div className="flex flex-shrink-0 justify-center">
            <div className="scrollbar z-10 flex flex-row items-stretch space-x-3 overflow-x-scroll p-3">
              {accommData?.Room && accommData?.Room.length > 0 ? (
                accommData?.Room.map((room, i: number) => (
                  <RoomButton
                    key={room.id}
                    id={room.id}
                    roomIndex={i}
                    status={room.occupied}
                    hidden={
                      userSession?.profile.type === "LANDLORD" &&
                      accommData?.landlord === userSession?.user?.id &&
                      accommData?.id === room.accommodationId
                        ? false
                        : room.is_archived
                    }
                    roomAccID={room.accommodationId}
                    roomAvail={room.occupied}
                    roomPrice={room.price}
                    roomBeds={room.num_of_beds}
                    roomAircon={room.with_aircon}
                    roomUtils={room.with_utilities}
                    roomArchive={room.is_archived}
                  />
                ))
              ) : (
                <p className="items-center justify-center">
                  No rooms are available yet.
                </p>
              )}

              {/* TODO: ADD ROOM BUTTON SHOULD ONLY APPEAR IF LANDLORD IS LOOKING AT PAGE */}
              {userSession?.profile.type === "LANDLORD" &&
                accommData?.landlord === userSession?.user?.id && (
                  <Link
                    href={`/accommodation/${id}/room/add`}
                    className="flex items-stretch"
                  >
                    <button className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-p-black/50 px-8">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="h-6 w-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 4.5v15m7.5-7.5h-15"
                        />
                      </svg>
                      <label className="text-xs">Add Room</label>
                    </button>
                  </Link>
                )}
            </div>
          </div>
        </div>
        <br />
        <div className="border-t border-black"></div>
      </div>
    );
  };

  return (
    <div className="flex h-full flex-col justify-center bg-p-ngray">
      {/* HEADER */}
      <NavBar />

      {/* BODY */}
      <div className="mt-10 flex px-0 md:px-24 2xl:px-52">
        <div className="grid w-full min-w-full grid-cols-1 gap-x-4 sm:grid-cols-3">
          <div className="w-full">
            <Gallery />
          </div>
          <div className="w-full sm:col-span-2">
            <Description />
          </div>
          <div className="w-full px-4">
            <OverAllRating />
          </div>
          <div className="w-full px-4 sm:col-span-2">
            <Review />
          </div>
        </div>
        {/*Report button*/}
        {userSession !== null && (
          <div className="fixed bottom-2 left-0 m-3">
            {" "}
            {/*The report button will stick to the bottom left of the screen*/}
            <button
              className="flex flex-row space-x-10"
              onClick={() => {
                reportAccomm.mutate({
                  reported_id: id,
                  reported_name: accomm!.name,
                  report: "",
                  type_reported: "ACCOMMODATION",
                });
                toast.success(
                  "Thank you for reporting this accommodation.\nAn alert has been sent to the administrators.",
                  {
                    position: "bottom-center",
                    duration: 4000,
                  },
                );
              }}
            >
              Report Accommodation
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
