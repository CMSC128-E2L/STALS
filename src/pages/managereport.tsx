import NavBar from "~/components/navbar";
import { api } from "~/utils/api";
import Image from "next/image";
import user from "public/images/def_user.png";
import Error401 from "~/pages/401";
import { useSession } from "next-auth/react";
import { UserType } from "@prisma/client";
import toast from "react-hot-toast";
import { useEffect } from "react";
import Link from "next/link";

export default function ManageReport() {
  const userSession = useSession({ required: true });
  const {
    data: accomm_reports,
    isLoading: queryLoading,
    isError: queryError,
    refetch,
  } = api.report.getAllType.useQuery({ type: "ACCOMMODATION" });

  const archiveAccom = api.accommodation.archive.useMutation({
    onSuccess: () => {
      toast.success("The reported accommodation has been archived.", {
        position: "bottom-right",
        duration: 3000,
      });
      void refetch();
    },
  });

  const delReport = api.report.deleteReport.useMutation({
    onSuccess: () => {
      void refetch();
    },
  });

  useEffect(() => {
    if (!queryLoading && accomm_reports) {
      void refetch();
    }
  }, [queryLoading, accomm_reports]);

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
      <div className="min-h-[80vh]">
        <NavBar />
        <section className="flex-row-2 flex w-full">
          <div className="flex w-full flex-col rounded-3xl p-10 shadow-lg">
            <h1 className="mb-5 mr-4 text-xl font-bold">
              Reported Accommodations
            </h1>
            {queryLoading ? (
              <div>Loading...</div>
            ) : queryError ? (
              <div>Error occurred while fetching reports.</div>
            ) : (
              <div>
                {accomm_reports.map((report) => {
                  return (
                    <div key={report.id} className="mb-6">
                      <Link href="">
                        <div className="float-right">
                          <button
                            type="button"
                            className=""
                            onClick={() => {
                              archiveAccom.mutate({
                                id: report.reported_id,
                                is_archived: false,
                              });
                              delReport.mutate(report.id);
                            }}
                          >
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
                                d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
                              />
                            </svg>
                          </button>
                        </div>
                        <div className="mb-2 flex flex-row">
                          <div className="relative flex h-[2.5rem] w-[2.5rem] flex-col">
                            <Image
                              src={user.src}
                              className="flex rounded-full object-contain"
                              alt="User Photo"
                              fill
                            />
                          </div>
                          <div className="ml-4 ">
                            <p className="mb-1 flex text-sm font-semibold">
                              {report.user.first_name} {report.user.middle_name}{" "}
                              {report.user.last_name} {report.user.Suffix}
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
                      </Link>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
          <div className="flex w-full flex-col rounded-3xl p-10 shadow-lg">
            <h1 className="mb-5 mr-4 text-xl font-bold">Reported Reviews</h1>
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
                            {report.user.first_name} {report.user.middle_name}{" "}
                            {report.user.last_name} {report.user.Suffix}
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
