import NavBar from "~/components/navbar";
import SideBar from "~/components/sidebar";
import AccomRow from "~/components/accomRow";
import { api } from "~/utils/api";

export default function HomePage() {
  const { data: barangayEntries, isLoading: queryLoading } =
    api.accommodation.getBarangays.useQuery();
  return (
    <div className="flex min-h-screen flex-col">
      <NavBar />

      <div className="flex flex-grow">
        {/* Sidebar */}
        <div className="h-screen w-1/6 flex-none overflow-y-auto">
          <SideBar />
        </div>

        {/* Content */}

        {/* Accommodations List */}
        <div className="flex-grow">
          <div className="space-y-4 p-10">
            {/* List of Accommodations */}
            {/* <AccomRow />
            <div className="mb-10"></div>
            <AccomRow />
            <div className="mb-10"></div>
            <AccomRow /> */}
            {barangayEntries?.map((entry, index) => {
              return (
                <div key={index}>
                  <AccomRow barangay={entry.barangay} name={undefined} />
                  {/* <p>{entry.barangay}</p> */}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
