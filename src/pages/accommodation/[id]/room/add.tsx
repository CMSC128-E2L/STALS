import NavBar from "~/components/navbar";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type RouterInputs, api } from "~/utils/api";
import { roomAddSchema } from "~/utils/apitypes";
import { useRouter } from "next/router";
import { dynamicRouteID, notAuthenticated } from "~/utils/helpers";
import { useEffect } from "react";
import Link from "next/link";
import bgpic from "public/images/background_addedit_accom.png";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import LoadingSpinner from "~/components/loadingSpinner";
import Error401 from "~/pages/401";
import { UserType } from "@prisma/client";

export default function AddRoom() {
  const userSession = useSession({ required: true });
  const { id } = dynamicRouteID(useRouter());
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset: resetForm,
  } = useForm<RouterInputs["room"]["add"]>({
    resolver: zodResolver(roomAddSchema),
    defaultValues: {
      accommodationId: "",
    },
  });

  useEffect(() => {
    setValue("accommodationId", id);
  }, [id, setValue]);

  const addRoom = api.room.add.useMutation({
    onSuccess: () => {
      toast.success("Successfully Added Room!", {
        position: "bottom-right",
        duration: 3000,
      });
      resetForm();
    },
  });

  if (notAuthenticated(userSession.status)) {
    return <LoadingSpinner />;
  }

  if (userSession?.data?.profile.type === UserType.USER) {
    return Error401();
  }

  return (
    <div className="">
      <img className="site-background" src={bgpic.src} alt="background" />
      <NavBar />
      <div className="flex min-h-[90vh] items-center justify-center">
        <div className="shadow-md/50 w-full rounded-xl bg-white/70 px-10 py-10 shadow md:w-1/3">
          <div className="item-center flex justify-center px-2 pb-0 pt-0 drop-shadow-md">
            <h1 className="text-3xl font-bold text-p-dviolet">Add Room</h1>
          </div>

          <div className="flex justify-center pb-6 drop-shadow-md">
            <p className="text-sm italic text-gray-400"></p>
          </div>

          <form
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            onSubmit={handleSubmit(
              (d) => {
                addRoom.mutate(d);
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
                  {...register("price", {
                    valueAsNumber: true,
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                    setValueAs: (value: string) => parseFloat(value).toFixed(2),
                  })}
                  required
                ></input>
              </div>
              <div>
                <input
                  className="add-acc-input-text-field"
                  placeholder="Number of Beds"
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
                <button className="flex w-full justify-center rounded-full bg-p-dviolet px-4 py-2 font-bold text-white shadow shadow-gray-400/100">
                  Confirm
                </button>
              </div>

              <div>
                <button
                  className="flex w-full justify-center rounded-full bg-gray-500 px-4 py-2 font-bold text-white opacity-75 shadow shadow-gray-400"
                  onClick={() => {
                    router.back();
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
