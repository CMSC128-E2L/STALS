import NavBar from "~/components/navbar";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type RouterInputs, api } from "~/utils/api";
import { roomAddSchema } from "~/utils/apitypes";
import { useRouter } from "next/router";
import { dynamicRouteID } from "~/utils/helpers";

export default function AddRoom() {
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm({
    resolver: zodResolver(roomAddSchema),
  });

  const addRoom = api.room.add.useMutation();

  const { shouldReturn, id } = dynamicRouteID(useRouter());
  if (shouldReturn) return;

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
            onSubmit={handleSubmit((d) => {
              const obj = { id };
              d.accommodationId = obj.id;
              d.is_archived = false;
              console.log(d);
              addRoom.mutate(d as RouterInputs["room"]["add"]);
            })}
            className="justify-items-stretch space-y-4"
          >
            {/* right side */}
            <div>
              {/* Room Price and Number of Beds */}
              <div className="flex flex-row p-5">
                <input
                  className="add-acc-input-text-field mx-5"
                  placeholder="Price"
                  type="number"
                  {...register("price")}
                  required
                ></input>
                <input
                  className="add-acc-input-text-field mx-5"
                  placeholder="Number of Beds"
                  type="number"
                  {...register("num_of_beds")}
                  required
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
                          {...register("occupied")}
                        >
                          <option value="true">Yes</option>
                          <option value="false">No</option>
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
                          {...register("with_aircon")}
                        >
                          <option value="true">Yes</option>
                          <option value="false">No</option>
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
                          {...register("with_utilities")}
                        >
                          <option value="true">Yes</option>
                          <option value="false">No</option>
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
              <button type="submit" className="formButton hover:bg-blue-400">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
