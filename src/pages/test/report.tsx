import { api } from "~/utils/api";
import { stringify } from "superjson";

export default function Backend() {
  const addReport = api.report.add.useMutation();
  const { data: getAllData, isLoading: queryLoading } =
    api.report.getAll.useQuery({ page: 0, multiplier: 7 });
  const { data: getManyData } = api.report.getMany.useQuery({
    type: "REVIEW",
    page: 0,
    multiplier: 2,
  });

  if (queryLoading) {
    return <div>Loading</div>;
  }

  return (
    <div>
      <div>BACKEND STUFF</div>
      <input
        type="text"
        placeholder="Write Report"
        className="input-bordered input input-sm w-full"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            addReport.mutate({
              report: e.currentTarget.value,
              type_reported: "ACCOMMODATION",
              reported_id: "7",
            });
            e.currentTarget.value = "";
          }
        }}
      />
      <div>ALL REPORTS</div>
      {stringify(getAllData)}
      <div>MANY REPORTS</div>
      {stringify(getManyData)}
    </div>
  );
}
