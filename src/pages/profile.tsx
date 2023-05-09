import NavBar from "~/components/navbar";
import SideBar from "~/components/sidebar";
import AccomRow from "~/components/accomRow";
import MyAccom from "~/components/myAccom";
import MyArchive from "~/components/myArchive";
import Image from "next/image";
import user from "public/images/def_user.png";

export default function HomePage() {
  return (
    <div>
      <NavBar />
      {/* Content */}
      <div className="flex-row-2 m-10 flex">
        <section className="fixed mr-10 flex h-auto h-fullscreen w-2/6 flex-col items-center space-y-2 rounded-3xl bg-white p-10 text-center font-medium shadow-xl">
          <div className="relative mt-10 flex h-[10.5rem] w-[10.5rem]">
            <Image
              src={user.src}
              className="flex rounded-full object-contain"
              alt="STALS Logo"
              fill
            />
          </div>
          <div className="m-10 flex ">
            <span className="mb-10 text-2xl text-p-hdblue">@jararellano</span>
          </div>
          <div className="m-10  flex ">
            <span className="text-3xl text-black">
              James Alfred R. Arellano
            </span>
          </div>
          <div className="m-10  flex ">
            <span className="text-xl text-black">Landlord</span>
          </div>

          <div className="flex grid h-48 grid-cols-2 place-content-center gap-3">
            <span className="text-xl text-black">Contact no:</span>
            <span className="text-xl text-black">09567163812</span>
            <span className="text-xl text-black">Email Address:</span>
            <span className="text-xl text-black">jrarellano1@up.edu.ph</span>
          </div>
          <div className="flex w-full justify-center rounded-3xl border-2 border-black p-2 shadow-lg">
            <button className="w-full">Edit Account</button>
          </div>
          <div className="flex w-full justify-center rounded-3xl border-2 border-black p-2 shadow-lg">
            <button className="w-full ">Deactivate Account</button>
          </div>
        </section>

        <section className="mr-10 flex h-auto h-fullscreen w-1/6 flex-col items-center space-y-2 rounded-3xl bg-white p-10 text-center font-medium shadow-xl "></section>

        <section className="ml-96 flex w-full flex-col">
          <div className="w-full rounded-3xl p-10 shadow-lg">
            <MyAccom />
          </div>
          <div className="w-full rounded-3xl p-10 shadow-lg">
            <MyArchive />
          </div>
        </section>
      </div>
    </div>
  );
}
