import { api } from "~/utils/api";
import { stringify } from "superjson";

export default function Backend() {
  const { data: firstData, isLoading: queryLoading } =
    api.room.archives.useQuery({
      accommodationId: "clhd4giyd0002w2btf12dzr3d",
      page: 0,
      multiplier: 2,
    });

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
