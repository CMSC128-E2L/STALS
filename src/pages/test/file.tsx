import { api } from "~/utils/api";
import { stringify } from "superjson";

export default function Backend() {
  const { data: firstData, isLoading: queryLoading } =
    api.file.r2getfiles.useQuery();

  if (queryLoading) {
    return <div>Loading</div>;
  }
  return (
    <div>
      <div>BACKEND STUFF</div>
      {stringify(firstData)}
    </div>
  );
}
