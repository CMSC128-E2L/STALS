import NavBar from "~/components/navbar";
import SideBar from "~/components/sidebar";
import AccomRow from "~/components/accomRow";
import { api } from "~/utils/api";

export default function HomePage() {
  const { data: barangayEntries, isLoading: queryLoading } =
    api.accommodation.getBarangays.useQuery();
  return (
    <div>
      <NavBar />

      {/* Content */}
      <div className="flex flex-row">
        <SideBar />
        {/* Accommodations List */}
        <div className="flex w-5/6 flex-col p-10">
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
  );
}
