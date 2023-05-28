import NavBar from "~/components/navbar";
import MyAccom from "~/components/myAccom";
import Image from "next/image";
import user from "public/images/def_user.png";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { api } from "~/utils/api";
import { UserType } from "@prisma/client";

export default function HomePage() {
  const { data: sessionData } = useSession();
  const router = useRouter();

  const fullName = `${sessionData?.profile.first_name ?? ""} ${
    sessionData?.profile?.middle_name ?? ""
  } ${sessionData?.profile.last_name ?? ""}
  ${sessionData?.profile.Suffix ?? ""}`;

  const handleEditProfile = () => {
    void router.push("/profile/edit");
  };

  const {
    data: reports,
    isLoading: queryLoading,
    isError: queryError,
  } = api.report.getAll.useQuery({ page: 0, multiplier: 4 });

  if (sessionData?.profile.type == UserType.LANDLORD) {
    return (
      <div>
        <NavBar />
        {/* Content */}
        <div className="flex-row-2 m-10 flex h-auto w-auto ">
          <section className="mr-5 flex flex-col items-center space-y-2 whitespace-nowrap rounded-3xl bg-white p-14 font-medium shadow-xl">
            <div className="relative ml-32 mr-32 mt-10 flex h-[10.5rem] w-[10.5rem]">
              <Image
                src={sessionData?.user.image ?? user.src}
                className="flex rounded-full object-contain"
                alt="User Photo"
                fill
              />
            </div>
            <div className="m-10 flex ">
              <span className="mb-10 text-2xl text-p-hdblue">
                @{sessionData?.profile.username}
              </span>
            </div>
            <div className="m-10  flex ">
              <span className="text-3xl text-black">{fullName ?? "Guest"}</span>
            </div>
            <div className="m-10  flex ">
              <span className="text-xl text-black">
                {sessionData?.profile.type}
              </span>
            </div>

            <div className="flex grid h-48 grid-cols-2 place-content-center gap-3">
              <span className="text-xl text-black">Contact no:</span>
              <span className="text-xl text-black">
                {sessionData?.profile.contact_number}
              </span>
              <span className="text-xl text-black">Email Address:</span>
              <span className="text-xl text-black">
                {sessionData?.user.email}
              </span>
            </div>
            <div className="flex w-full justify-center rounded-3xl border-2 border-black p-2 shadow-lg">
              <button className="w-full" onClick={handleEditProfile}>
                Edit Account
              </button>
            </div>
          </section>

          <section className="w-full">
            <div className="w-full rounded-3xl p-10 shadow-lg">
              <MyAccom showArchived={false} />
            </div>
            <div className="w-full rounded-3xl p-10 shadow-lg">
              <MyAccom showArchived={true} />
            </div>
          </section>
        </div>
      </div>
    );
  } else if (sessionData?.profile.type == UserType.USER) {
    return (
      <div>
        <NavBar />
        {/* Content */}
        <div className="flex-row-2 m-10 flex h-auto w-auto ">
          <section className="mr-5 flex flex-col items-center space-y-2 whitespace-nowrap rounded-3xl bg-white p-14 font-medium shadow-xl">
            <div className="relative ml-32 mr-32 mt-10 flex h-[10.5rem] w-[10.5rem]">
              <Image
                src={sessionData?.user.image ?? user.src}
                className="flex rounded-full object-contain"
                alt="User Photo"
                fill
              />
            </div>
            <div className="m-10 flex ">
              <span className="mb-10 text-2xl text-p-hdblue">
                @{sessionData?.profile.username}
              </span>
            </div>
            <div className="m-10  flex ">
              <span className="text-3xl text-black">{fullName ?? "Guest"}</span>
            </div>
            <div className="m-10  flex ">
              <span className="text-xl text-black">
                {sessionData?.profile.type}
              </span>
            </div>

            <div className="flex grid h-48 grid-cols-2 place-content-center gap-3">
              <span className="text-xl text-black">Contact no:</span>
              <span className="text-xl text-black">
                {sessionData?.profile.contact_number}
              </span>
              <span className="text-xl text-black">Email Address:</span>
              <span className="text-xl text-black">
                {sessionData?.user.email}
              </span>
            </div>
            <div className="flex w-full justify-center rounded-3xl border-2 border-black p-2 shadow-lg">
              <button className="w-full" onClick={handleEditProfile}>
                Edit Account
              </button>
            </div>
          </section>

          <section className="flex w-full flex-row">
            <div className="w-full rounded-3xl p-10 shadow-lg">
              <div className="flex flex-col">
                <div className="mb-4 flex flex-row items-center">
                  <h1 className="mr-4 text-xl font-bold">My Favorites</h1>
                </div>
                <div className="flex justify-center pb-6 drop-shadow-md">
                  <p className="text-sm italic text-gray-400">
                    No favorites added.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  } else if (sessionData?.profile.type == UserType.ADMIN) {
    return (
      <div>
        <NavBar />
        {/* profile */}
        <div className="flex-row-2 m-10 flex h-auto w-auto ">
          <section className="mr-5 flex flex-col items-center space-y-2 whitespace-nowrap rounded-3xl bg-white p-14 font-medium shadow-xl">
            <div className="relative ml-32 mr-32 mt-10 flex h-[10.5rem] w-[10.5rem]">
              <Image
                src={sessionData?.user.image ?? user.src}
                className="flex rounded-full object-contain"
                alt="User Photo"
                fill
              />
            </div>
            <div className="m-10 flex">
              <span className="mb-10 text-center text-2xl text-p-hdblue ">
                @{sessionData?.profile.username}
              </span>
            </div>
            <div className="m-10  flex ">
              <span className="text-3xl text-black">{fullName ?? "Guest"}</span>
            </div>
            <div className="m-10  flex ">
              <span className="text-xl text-black">
                {sessionData?.profile.type}
              </span>
            </div>

            <div className="flex grid h-48 grid-cols-2 place-content-center gap-3">
              <span className="text-xl text-black">Contact no:</span>
              <span className="text-xl text-black">
                {sessionData?.profile.contact_number}
              </span>
              <span className="text-xl text-black">Email Address:</span>
              <span className="text-xl text-black">
                {sessionData?.user.email}
              </span>
            </div>
            <div className="flex w-full justify-center rounded-3xl border-2 border-black p-2 shadow-lg">
              <button className="w-full" onClick={handleEditProfile}>
                Edit Account
              </button>
            </div>
          </section>

          {/* admin settings and notification */}
          <section className="w-full">
            <div className="rounded-3xl p-10 shadow-lg">
              <h1 className="text-center text-xl font-bold">Admin Settings</h1>
              <p className="b mb-2 mt-2 w-1/2 text-sm text-gray-400">
                <Link href="">Manage Reviews</Link>
              </p>
              <p className="mb-2 mt-2 text-sm text-gray-400">
                <Link href="">Manage Accommodations</Link>
              </p>
              <p className="mb-2 mt-2 text-sm text-gray-400">
                <Link href="">Manage Landlord Applications</Link>
              </p>
            </div>
            <div className="rounded-3xl p-10 shadow-lg ">
              <h1 className="mb-10 text-center text-xl font-bold">
                Notifications
              </h1>
              {queryLoading ? (
                <div>Loading...</div>
              ) : queryError ? (
                <div>Error occurred while fetching reports.</div>
              ) : (
                <div>
                  {reports.map((report) => {
                    return (
                      <div key={report.id} className="mb-6">
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
                              {report.user.username}
                            </p>
                            <p className="flex text-xs text-gray-400">
                              {report.type_reported}
                            </p>
                          </div>
                        </div>
                        <div className="mb-4 ml-14 flex">
                          <p className="flex text-base">{report.report}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              <div className="flex w-full justify-center rounded-3xl border-2 border-black p-2 shadow-lg">
                <button className="w-full">Manage Report</button>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }
}
