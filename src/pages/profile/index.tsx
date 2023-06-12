import NavBar from "~/components/navbar";
import MyAccom from "~/components/myAccom";
import Image from "next/image";
import user from "public/images/def_user.png";
import Link from "next/link";
import Edit from "./edit";
import Profile1 from "~/components/profile";
import FaveAccoms from "~/components/FaveAccoms";
import bgpic from "public/images/background_user.png";
import { useSession } from "next-auth/react";
import { api } from "~/utils/api";
import { UserType } from "@prisma/client";
import { useState, useRef, useEffect } from "react";
import jsPDF from "jspdf";

export default function Profile() {
  const { data: sessionData } = useSession();

  const {
    data: reports,
    isLoading: queryLoading,
    isError: queryError,
  } = api.report.getAll.useQuery({ page: 0, multiplier: 4 });

  const [showEdit, setShowEdit] = useState(false);

  const USERBODY = () => {
    return (
      <>
        <section className="h-min w-full rounded-3xl bg-white shadow-lg">
          <div className="flex w-full flex-col p-6">
            <div className="flex flex-row justify-center text-center">
              <h1 className="w-full object-left text-2xl font-bold text-p-dbviolet">
                My Favorites
              </h1>
              <div
                className="relative flex cursor-pointer object-right text-sm"
                onClick={() => {
                  // setpdfdownload(true);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-download ml-3 mr-1"
                  width="auto"
                  height="30"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2"></path>
                  <path d="M7 11l5 5l5 -5"></path>
                  <path d="M12 4l0 12"></path>
                </svg>
              </div>
            </div>
            <div className="flex items-center drop-shadow-md">
              <div className="flex flex-wrap">
                <FaveAccoms />
              </div>
            </div>
          </div>
        </section>
      </>
    );
  };

  const LANDLORDBODY = () => {
    return (
      <>
        <section className="w-full">
          <div className="mb-4 w-full rounded-3xl bg-white p-10 shadow-lg">
            <MyAccom showArchived={false} />
          </div>
          <div className="w-full rounded-3xl bg-white p-10 shadow-lg">
            <MyAccom showArchived={true} />
          </div>
        </section>
      </>
    );
  };

  const ADMINBODY = () => {
    return (
      <>
        {/* admin settings and notification */}
        <section className="w-full">
          <div className="mb-4 rounded-3xl bg-white p-10 shadow-lg">
            <MyAccom showArchived={false} />
          </div>
          <div className="mb-4 rounded-3xl bg-white p-10 shadow-lg">
            <MyAccom showArchived={true} />
          </div>
          {/* <div className="mb-4 rounded-3xl bg-white p-10 shadow-lg">
            <h1 className="text-center text-xl font-bold text-p-dbviolet">
              Admin Settings
            </h1>
            <p className="b mb-2 mt-2 w-1/2 text-sm text-gray-400">
              <Link href="managereport">Manage Reviews</Link>
            </p>
            <p className="mb-2 mt-2 text-sm text-gray-400">
              <Link href="accommodation/management">Manage Accommodations</Link>
            </p>
          </div> */}
          <div className="rounded-3xl bg-white p-10 shadow-lg">
            <h1 className="mb-10 text-center text-xl font-bold text-p-dbviolet  ">
              Notifications
            </h1>
            {queryLoading ? (
              <div>Loading...</div>
            ) : queryError ? (
              <div>Error occurred while fetching reports.</div>
            ) : (
              <div>
                {reports.map((report, index) => {
                  return (
                    <div key={index} className="mb-6">
                      <div className="mb-2 flex flex-row">
                        <div className="relative flex h-[2.5rem] w-[2.5rem] flex-col">
                          <Image
                            src={user.src}
                            className="flex rounded-full object-contain"
                            alt="User Photo"
                            fill
                          />
                        </div>
                        <div className="ml-4">
                          <p className="mb-1 flex text-sm font-semibold">
                            {report.user.first_name} {report.user.middle_name}{" "}
                            {report.user.last_name} {report.user.Suffix}{" "}
                            reported {report.reported_name}
                          </p>
                          <p className="flex text-xs text-gray-400">
                            {report.type_reported}
                          </p>
                        </div>
                      </div>
                      <div className="mb-2 ml-14 flex">
                        {/* <p className="flex text-base">
                          reported {report.reported_name}
                        </p> */}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            <div className="w-full">
              <Link href="managereport">
                <button className="formConfirm bg-p-dviolet">
                  Manage Report
                </button>
              </Link>
            </div>
          </div>
        </section>
      </>
    );
  };

  return (
    <div>
      <NavBar />
      <img
        className="fixed -z-10 h-full w-screen bg-cover bg-center"
        src={bgpic.src}
        alt="background"
      />
      {showEdit && <Edit onCancel={() => setShowEdit(false)} />}
      <div className="flex w-full flex-col space-y-2 p-2 sm:flex-row sm:space-y-0 sm:p-12">
        <Profile1 onClick={() => setShowEdit(true)} />
        {sessionData?.profile.type == UserType.USER && <USERBODY />}
        {sessionData?.profile.type == UserType.LANDLORD && <LANDLORDBODY />}
        {sessionData?.profile.type == UserType.ADMIN && <ADMINBODY />}
      </div>
    </div>
  );
}
