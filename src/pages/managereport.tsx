import NavBar from "~/components/navbar";
import { api } from "~/utils/api";
import Image from "next/image";
import user from "public/images/def_user.png";

export default function ManageReport() {
  const {
    data: reports,
    isLoading: queryLoading,
    isError: queryError,
  } = api.report.getAllType.useQuery({ type: "ACCOMMODATION" });

  return (
    <>
      <div>
        <NavBar />
        <section className="flex-row-2 flex w-full">
          <div className="flex w-full flex-col rounded-3xl p-10 shadow-lg">
            <h1 className="mr-4 text-xl font-bold">Reported Accommodation</h1>
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
                        <p className="flex text-base">
                          reported {report.reported_name}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
          <div className="flex w-full flex-col rounded-3xl p-10 shadow-lg">
            <h1 className="mr-4 text-xl font-bold">Reported Reviews</h1>
            some contents here...
          </div>
        </section>
      </div>
    </>
  );
}
