import NavBar from "~/components/navbar";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type RouterInputs, api } from "~/utils/api";
import { roomAddSchema } from "~/utils/apitypes";
import { useRouter } from "next/router";
import { dynamicRouteID } from "~/utils/helpers";
import { useEffect } from "react";
import Link from "next/link";

export default function AddRoom() {
  const { shouldReturn, id } = dynamicRouteID(useRouter());

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

  return (
    <div className="">
      {/* header */}
      <NavBar />

      {/* body */}
      <div className="basis-6/8 flex min-h-screen items-center justify-center overflow-y-auto bg-white">
        <div className="margin-40 w-3/4 rounded-xl bg-p-lblue p-4 py-4 shadow-md">
          <div>
            <h1 className="form-h1">ADD ROOM</h1>
          </div>
          <form
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            onSubmit={handleSubmit(
              (d) => {
                addRoom.mutate(d);
              },
              (error) => {
                console.log(error);
              },
            )}
            className="justify-items-stretch space-y-4"
          >
            {/* right side */}
            <div>
              {/* Room Price and Number of Beds */}
              <div className="flex flex-row p-5">
                <input
                  className="add-acc-input-text-field mx-5"
                  placeholder="Price"
                  {...register("price", { valueAsNumber: true })}
                ></input>
                <input
                  className="add-acc-input-text-field mx-5"
                  placeholder="Number of Beds"
                  {...register("num_of_beds", { valueAsNumber: true })}
                ></input>
              </div>
              {/* div contains all three */}
              <div className="flex flex-row justify-between p-5">
                {/* Room Availability */}
                <div className="w-25% mx-5 rounded-lg bg-white p-5">
                  <h2 className="form-h2">Availability</h2>
                  <div className="h-10 w-full items-center justify-items-stretch rounded-md bg-white">
                    <div className="form-col-deets">
                      <div>
                        <select
                          className="form-dropdown peer"
                          placeholder="Type"
                          {...register("occupied", {
                            setValueAs: (value) => {
                              if (value == "yes") {
                                return value === "true";
                              } else {
                                return value === "false";
                              }
                            },
                          })}
                        >
                          <option value="yes">Yes</option>
                          <option value="no">No</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Airconditioning */}
                <div className="w-25% mx-5 rounded-lg bg-white p-5">
                  <h2 className="form-h2">Airconditioner</h2>
                  <div className="h-10 w-full items-center justify-items-stretch rounded-md bg-white">
                    <div className="form-col-deets">
                      <div>
                        <select
                          className="form-dropdown peer"
                          placeholder="Type"
                          {...register("with_aircon", {
                            setValueAs: (value) => {
                              {
                                /*TODO: when unchecked must be false*/
                              }
                              if (value == "yes") {
                                return value === "true";
                              } else {
                                return value === "false";
                              }
                            },
                          })}
                        >
                          <option value="yes">Yes</option>
                          <option value="no">No</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Utilities Inclusion*/}
                <div className="w-25% mx-5 rounded-lg border-slate-950 bg-white p-5 ">
                  <h2 className="form-h2">Utilities</h2>
                  <div className="h-10 w-full items-center justify-items-stretch rounded-md bg-white">
                    <div className="form-col-deets">
                      <div>
                        <select
                          className="form-dropdown peer"
                          placeholder="Type"
                          {...register("with_utilities", {
                            setValueAs: (value) => {
                              if (value == "yes") {
                                return value === "true";
                              } else {
                                return value === "false";
                              }
                            },
                          })}
                        >
                          <option value="yes">Yes</option>
                          <option value="no">No</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* footer buttons clear submit */}
            <div className="float-right space-x-3 px-9">
              <button type="reset" className="formButton hover:bg-blue-400">
                Clear
              </button>
              {/*<Link href={`/accommodation/${id}`}> TODO: Link back to accom page after submit*/}
              <button type="submit" className="formButton hover:bg-blue-400">
                Submit
              </button>
              {/*</Link>*/}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
