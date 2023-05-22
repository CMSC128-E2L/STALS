import NavBar from "~/components/navbar";
import MyAccom from "~/components/myAccom";
import Image from "next/image";
import user from "public/images/def_user.png";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { api } from "~/utils/api";

export default function HomePage() {
  const { data: sessionData } = useSession();
  const router = useRouter();

  const fullName = `${sessionData?.profile.first_name ?? ""} ${
    sessionData?.profile?.middle_name ?? ""
  } ${sessionData?.profile.last_name ?? ""}`;

  const handleEditProfile = () => {
    void router.push("/profile/edit");
  };

  const deleteProfile = api.user.delete.useMutation({
    onSuccess: () => {
      void router.replace("/");
    },
  });

  if (sessionData?.profile.type == "LANDOWNER") {
    return (
      <div>
        <NavBar />
        {/* Content */}
        <div className="flex-row-2 m-10 flex">
          <section className="fixed mr-10 flex h-auto h-fullscreen w-2/6 flex-col items-center space-y-2 rounded-3xl bg-white p-10 text-center font-medium shadow-xl">
            <div className="relative mt-10 flex h-[10.5rem] w-[10.5rem]">
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
            <div className="flex w-full justify-center rounded-3xl border-2 border-black p-2 shadow-lg">
              <button
                className="w-full "
                onClick={() => {
                  void deleteProfile.mutate();
                }}
              >
                Deactivate Account
              </button>
            </div>
          </section>

          <section className="mr-10 flex h-auto h-fullscreen w-1/6 flex-col items-center space-y-2 rounded-3xl bg-white p-10 text-center font-medium shadow-xl "></section>

          <section className="ml-96 flex w-full flex-col">
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
  } else if (sessionData?.profile.type == "USER") {
    return (
      <div>
        <NavBar />
        {/* Content */}
        <div className="flex-row-2 m-10 flex">
          <section className="fixed mr-10 flex h-auto h-fullscreen w-2/6 flex-col items-center space-y-2 rounded-3xl bg-white p-10 text-center font-medium shadow-xl">
            <div className="relative mt-10 flex h-[10.5rem] w-[10.5rem]">
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
            <div className="flex w-full justify-center rounded-3xl border-2 border-black p-2 shadow-lg">
              <button
                className="w-full "
                onClick={() => {
                  void deleteProfile.mutate();
                }}
              >
                Deactivate Account
              </button>
            </div>
          </section>

          <section className="mr-10 flex h-auto h-fullscreen w-1/6 flex-col items-center space-y-2 rounded-3xl bg-white p-10 text-center font-medium shadow-xl "></section>

          <section className="ml-96 flex w-full flex-col">
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
  } else if (sessionData?.profile.type == "ADMIN") {
    return (
      <div>
        <NavBar />
        {/* Content */}
        <div className="flex-row-2 m-10 flex">
          <section className="fixed mr-10 flex h-auto h-fullscreen w-2/6 flex-col items-center space-y-2 rounded-3xl bg-white p-10 text-center font-medium shadow-xl">
            <div className="relative mt-10 flex h-[10.5rem] w-[10.5rem]">
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
            <div className="flex w-full justify-center rounded-3xl border-2 border-black p-2 shadow-lg">
              <button
                className="w-full "
                onClick={() => {
                  void deleteProfile.mutate();
                }}
              >
                Deactivate Account
              </button>
            </div>
          </section>

          <section className="mr-10 flex h-auto h-fullscreen w-1/6 flex-col items-center space-y-2 rounded-3xl bg-white p-10 text-center font-medium shadow-xl "></section>

          <section className="ml-96 flex w-full flex-col">
            <div className="w-full rounded-3xl p-10 shadow-lg">
              <div className="flex flex-col">
                <div className="mb-4 flex flex-row items-center">
                  <h1 className="mr-4 text-xl font-bold">Notifications</h1>
                </div>
                <div className="flex justify-center pb-6 drop-shadow-md">
                  <p className="text-sm italic text-gray-400">
                    No new notifications.
                  </p>
                </div>
              </div>
            </div>
            {/* <div className="w-full rounded-3xl p-10 shadow-lg">
              <MyAccom showArchived={true} />
            </div> */}
          </section>
        </div>
      </div>
    );
  }
}
