import NavBar from "~/components/navbar";

export default function Error401() {
  return (
    <div className="">
      <NavBar />

      <div className="flex h-screen items-center justify-center dark:bg-gray-800">
        <div className="text-2xl font-bold text-blue-500 drop-shadow-md dark:text-white">
          Error 401 | User is not authorized.
        </div>
      </div>
    </div>
  );
}
