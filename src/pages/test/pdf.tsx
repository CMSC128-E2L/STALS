import { api } from "~/utils/api";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function Backend() {
  const { data: accomms } = api.accommodation.getMany.useQuery({});

  const info: (string | number)[][] = [];

  accomms?.forEach((i) => {
    info.push([
      i.name,
      i.name,
      // i.address,
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

  return (
    <>
      <div>
        <div>ACCOMMODATION ROUTER TESTING</div>
        <div>BACKEND DATA</div>
        <button
          onClick={() => {
            pdf.save("try.pdf");
          }}
        >
          Save Pdf
        </button>
      </div>
    </>
  );
}
