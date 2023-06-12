import NavBar from "~/components/navbar";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "~/utils/api";
import { roomEditSchema } from "~/utils/apitypes";
import { useRouter } from "next/router";
import { dynamicRouteID, notAuthenticated } from "~/utils/helpers";
import { useEffect } from "react";
import bgpic from "public/images/addaccom_bg.png";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import LoadingSpinner from "~/components/loadingSpinner";
import Error404 from "~/pages/404";
import Error from "~/pages/_error";
import { type z } from "zod";
import FormError from "~/components/formError";

export default function EditRoom() {
  const userSession = useSession({ required: true });
  const { id } = dynamicRouteID(useRouter());
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<z.infer<typeof roomEditSchema>>({
    resolver: zodResolver(roomEditSchema),
    defaultValues: {
      id: id,
    },
  });

  useEffect(() => {
    setValue("id", id);
  }, [id, setValue]);

  const editRoom = api.room.edit.useMutation({
    onSuccess: () => {
      toast.success("Successfully Edited Room!", {
        position: "bottom-right",
        duration: 3000,
      });
    },
  });

  const { data: firstData, isLoading: queryLoading } =
    api.room.getOne.useQuery(id);

  if (notAuthenticated(userSession.status)) {
    return <LoadingSpinner />;
  }

  if (firstData === null) {
    return Error404();
  }

  if (firstData?.accommodation.landlord !== userSession.data?.user.id) {
    return <Error statusCode={401} />;
  }

  return (
    <div className="">
      <img className="site-background" src={bgpic.src} alt="background" />
      <NavBar />
      <div className="flex min-h-[90vh] items-center justify-center">
        <div className="shadow-md/50 w-full rounded-xl bg-white/70 px-10 py-10 shadow sm:w-2/3 md:w-2/4">
          <div className="item-center flex justify-center px-2 pb-0 pt-0 drop-shadow-md">
            <h1 className="text-3xl font-bold text-p-dviolet">Edit Room</h1>
          </div>

          <div className="flex justify-center pb-6 drop-shadow-md">
            <p className="text-sm italic text-gray-400"></p>
          </div>

          <form
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            onSubmit={handleSubmit(
              (d) => {
                editRoom.mutate(d);
              },
              (error) => {
                console.log(error);
                toast.error("Cannot Edit Room!", {
                  position: "bottom-right",
                  duration: 1000,
                });
              },
            )}
          >
            <div className="flex flex-col space-y-2.5">
              <div>
                <h2 className="form-h2 form-field-required">Price</h2>
                <input
                  className="w-full rounded-xl px-2 py-2 shadow shadow-gray-400/100"
                  placeholder="Price"
                  title="Must be a positive float value."
                  defaultValue={firstData?.price}
                  {...register("price", {
                    setValueAs: (value) => String(value), // Keep the value as string
                  })}
                />
                <FormError error={errors.price?.message} />
              </div>

              <div>
                <h2 className="form-h2 form-field-required">Number of Beds</h2>
                <input
                  className="w-full rounded-xl px-2 py-2 shadow shadow-gray-400/100"
                  placeholder="Number of Beds"
                  title="Must be a positive int value."
                  defaultValue={firstData?.num_of_beds}
                  {...register("num_of_beds", {
                    setValueAs: (value) => String(value),
                  })}
                />
                <FormError error={errors.num_of_beds?.message} />
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
                  <option value="no" selected={firstData?.occupied === false}>
                    Unoccupied
                  </option>
                  <option value="yes" selected={firstData?.occupied === true}>
                    Occupied
                  </option>
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
                  <option
                    value="yes"
                    selected={firstData?.with_aircon === true}
                  >
                    With
                  </option>
                  <option
                    value="no"
                    selected={firstData?.with_aircon === false}
                  >
                    Without
                  </option>
                </select>
              </div>
              <div>
                <h2 className="form-h2">Utilities</h2>
                <select
                  className="form-dropdown peer"
                  placeholder="Type"
                  {...register("with_utilities", {
                    setValueAs: (value) => {
                      return value === "yes";
                    },
                  })}
                >
                  <option
                    value="yes"
                    selected={firstData?.with_utilities === true}
                  >
                    With
                  </option>
                  <option
                    value="no"
                    selected={firstData?.with_utilities === false}
                  >
                    Without
                  </option>
                </select>
              </div>
            </div>
            <br />
            <div>
              <div className="py-2">
                <button className="group relative flex w-full justify-center rounded-full bg-p-dviolet px-4 py-2 font-bold text-white shadow shadow-gray-400/100">
                  Save changes
                </button>
              </div>

              <div>
                <input
                  className="group relative flex w-full cursor-pointer justify-center rounded-full bg-gray-500 px-4 py-2 font-bold text-white opacity-75 shadow shadow-gray-400/100"
                  type="button"
                  value="Cancel"
                  onClick={() => {
                    router.back();
                  }}
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
