import NavBar from "~/components/navbar";

export default function Error404() {
  return (
    <div className="">
      <NavBar />

      <div className="flex h-screen items-center justify-center dark:bg-gray-800">
        <div className="text-2xl font-bold text-blue-500 drop-shadow-md dark:text-white">
          Error 404 | This page could not be found.
        </div>
      </div>
    </div>
  );
}
