import NavBar from "~/components/navbar";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type RouterInputs, api } from "~/utils/api";
import { roomAddSchema } from "~/utils/apitypes";
import { useRouter } from "next/router";
import { dynamicRouteID, notAuthenticated } from "~/utils/helpers";
import { useEffect } from "react";
import Link from "next/link";
import bgpic from "public/images/bg-05.png";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import LoadingSpinner from "~/components/loadingSpinner";

export default function AddRoom() {
  const userSession = useSession({ required: true });
  const { id } = dynamicRouteID(useRouter());

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<RouterInputs["room"]["add"]>({
    resolver: zodResolver(roomAddSchema),
    defaultValues: {
      accommodationId: "",
    },
  });

  useEffect(() => {
    setValue("accommodationId", id);
  }, [id, setValue]);

  const addRoom = api.room.add.useMutation();

  if (notAuthenticated(userSession.status)) {
    return <LoadingSpinner />;
  }

  return (
    <div className="">
      <img
        className="absolute bg-cover bg-fixed bg-center"
        src={bgpic.src}
        alt="background"
      />
      <NavBar />
      <div className="absolute inset-x-0 flex h-screen items-center justify-center">
        <div className="shadow-md/50 w-1/3 rounded-xl bg-white/70 px-10 py-10 shadow">
          <div className="item-center flex justify-center px-2 pb-0 pt-0 drop-shadow-md">
            <h1 className="form-h1">Add Room</h1>
          </div>

          <div className="flex justify-center pb-6 drop-shadow-md">
            <p className="text-sm italic text-gray-400"></p>
          </div>

          <form
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            onSubmit={handleSubmit(
              (d) => {
                addRoom.mutate(d);
                window.location.replace(`/accommodation/${id}`);
                toast.success("Successfully Added Room!", {
                  position: "bottom-right",
                  duration: 1000,
                });
              },
              (error) => {
                console.log(error);
                toast.error("Cannot Add Room!", {
                  position: "bottom-right",
                  duration: 1000,
                });
              },
            )}
          >
            <div className="flex flex-col space-y-2.5">
              <div>
                <input
                  className="add-acc-input-text-field"
                  placeholder="Price"
                  pattern="[0-9]+"
                  type="number"
                  {...register("price", { valueAsNumber: true })}
                  required
                ></input>
              </div>
              <div>
                <input
                  className="add-acc-input-text-field"
                  placeholder="Number of Beds"
                  pattern="[0-9]+"
                  type="number"
                  {...register("num_of_beds", { valueAsNumber: true })}
                  required
                ></input>
              </div>
              {/* yung tatlong dropdown */}
              <div>
                <h2 className="form-h2">Availability</h2>
                <select
                  className="form-dropdown peer"
                  placeholder="Type"
                  {...register("occupied", {
                    setValueAs: (value) => {
                      return value == "yes";
                    },
                  })}
                >
                  <option value="no">Unoccupied</option>
                  <option value="yes">Occupied</option>
                </select>
              </div>
              <div>
                <h2 className="form-h2">Airconditioning</h2>
                <select
                  className="form-dropdown peer"
                  placeholder="Type"
                  {...register("with_aircon", {
                    setValueAs: (value) => {
                      return value == "yes";
                    },
                  })}
                >
                  <option value="yes">With</option>
                  <option value="no">Without</option>
                </select>
              </div>
              <div>
                <h2 className="form-h2">Utilities</h2>
                <select
                  className="form-dropdown peer"
                  placeholder="Type"
                  {...register("with_utilities", {
                    setValueAs: (value) => {
                      return value == "yes";
                    },
                  })}
                >
                  <option value="yes">With</option>
                  <option value="no">Without</option>
                </select>
              </div>
            </div>
            <br />
            <div>
              <div className="py-2">
                <button className="formConfirm">Confirm</button>
              </div>

              <div>
                <Link href={`/accommodation/${id}`}>
                  <button className="formReject">Cancel</button>
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
