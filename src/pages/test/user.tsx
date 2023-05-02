import { api } from "~/utils/api";
import { stringify } from "superjson";

export default function Backend() {
  const { data: firstData, isLoading: queryLoading } =
    api.user.getFirst.useQuery();

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
