import NavBar from "~/components/navbar";
import { api } from "~/utils/api";
import Image from "next/image";
import user from "public/images/def_user.png";
import Error401 from "~/pages/401";
import { useSession } from "next-auth/react";
import { UserType } from "@prisma/client";

export default function ManageReport() {
  const userSession = useSession({ required: true });
  const {
    data: accomm_reports,
    isLoading: queryLoading,
    isError: queryError,
  } = api.report.getAllType.useQuery({ type: "ACCOMMODATION" });

  const {
    data: review_reports,
    isLoading: queryLoading1,
    isError: queryError1,
  } = api.report.getAllType.useQuery({ type: "REVIEW" });

  if (userSession?.data?.profile.type === UserType.USER) {
    return Error401();
  }
  if (userSession?.data?.profile.type === UserType.LANDLORD) {
    return Error401();
  }
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
                {accomm_reports.map((report) => {
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
            {queryLoading1 ? (
              <div>Loading...</div>
            ) : queryError1 ? (
              <div>Error occurred while fetching reports.</div>
            ) : (
              <div>
                {review_reports.map((report) => {
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
                          reported a review posted on {report.reported_name}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  );
}
