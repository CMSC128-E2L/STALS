import Image from "next/image";
import userImage from "public/placeholder_1.png";
import StarRow from "~/components/starRow";
import { api } from "~/utils/api";

interface LandlordProps {
  firstname: string | null | undefined;
  lastname: string | null | undefined;
}

export const Landlord: React.FC<LandlordProps> = ({ firstname, lastname }) => {
  // const { data: landLord, isLoading: landLordLoading } =
  //   api.user.getOne.useQuery(id);

  return (
    <>
      <div className="flex flex-row rounded-md p-3">
        {firstname} {lastname}
      </div>
    </>
  );
};

export default Landlord;
