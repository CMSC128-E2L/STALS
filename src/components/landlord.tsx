import Image from "next/image";
import userImage from "public/placeholder_1.png";
import StarRow from "~/components/starRow";
import { api } from "~/utils/api";

interface LandlordProps {
  firstname: string | null | undefined;
  middle: string | null | undefined;
  lastname: string | null | undefined;
  suffix: string | null | undefined;
}

export const Landlord: React.FC<LandlordProps> = ({
  firstname,
  middle,
  lastname,
  suffix,
}) => {
  // const { data: landLord, isLoading: landLordLoading } =
  //   api.user.getOne.useQuery(id);

  return (
    <>
      <div className="flex flex-row rounded-md">
        {firstname} {middle} {lastname} {suffix}
      </div>
    </>
  );
};

export default Landlord;
