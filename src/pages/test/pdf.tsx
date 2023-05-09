import { api, type RouterOutputs } from "~/utils/api";
import { parse, stringify } from "superjson";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function Backend() {
  const { data: accomms } = api.accommodation.getMany.useQuery({
    tags: "this is a tag",
  });

  const info: (string | number)[][] = [];

  accomms?.forEach((i) => {
    info.push([
      i.name,
      i.address,
      i.landlord,
      i.contact_number,
      i.num_of_rooms,
    ]);
  });

  const pdf = new jsPDF();

  autoTable(pdf, {
    head: [
      ["Accommodation Name", "Address", "Landlord", "Contact Number", "Rooms"],
    ],
    body: info,
  });

  pdf.save("try.pdf");

  return (
    <>
      <div>
        <div>ACCOMMODATION ROUTER TESTING</div>
        <div>BACKEND DATA</div>
        {}
      </div>
    </>
  );
}
