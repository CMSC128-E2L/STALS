import { type NextPageContext } from "next";
import NavBar from "~/components/navbar";

function Error({ statusCode }: { statusCode: number }) {
  const errorMessage = statusCode == 401 ? "User is not authorized." : "Error";
  return (
    <div className="">
      <NavBar />

      <div className="flex h-screen items-center justify-center dark:bg-gray-800">
        <div className="text-2xl font-bold text-blue-500 drop-shadow-md dark:text-white">
          Error {statusCode} | {errorMessage}
        </div>
      </div>
    </div>
  );
}

Error.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
