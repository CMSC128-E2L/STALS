import NavBar from "~/components/navbar";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { type RouterInputs, api } from "~/utils/api";
import Link from "next/link";

const schema = z.object({
    occupied: z.boolean(),
    accommodation: z.string(),
    price: z.number(),
    num_of_beds: z.number(),
    with_aircon: z.boolean(),
    with_utilities: z.boolean(),
    is_archived: z.boolean(),
  });

export default function AddRoom() {
    const {
        register,
        handleSubmit,

        formState: {errors},
    } = useForm({
        resolver: zodResolver(schema),
    });

    const addRoom = api.room.add.useMutation();
    
  return (
    <div className="">
      {/* header */}
      <NavBar />

      {/* body */}
      <div className="basis-6/8 flex min-h-screen items-center justify-center overflow-y-auto bg-white">
        <div className="margin-40 w-3/4 rounded-xl bg-p-lblue p-4 py-4 shadow-md">
          <div>
            <h1 className="form-h1">Add Room</h1>
          </div>
          <form
          onSubmit = {handleSubmit((d)=>
            addRoom.mutate(d as RouterInputs["room"]["add"],
            ),
            )}
          className="justify-items-stretch space-y-4">
            {/* right side */}
            <div>
              {/* Room Price and Number of Beds */}
              <div className="flex flex-row p-5">
                <input
                  className="add-acc-input-text-field mx-5"
                  placeholder="Price"
                  type="text"
                  required
                  {...register("price")}
                ></input>
                <input
                  className="add-acc-input-text-field mx-5"
                  placeholder="Number of Beds"
                  type="number"
                  required
                  {...register("num_of_beds")}
                ></input>
              </div>
              {/* div contains all three */}
              <div className="flex flex-row justify-between p-5">
                {/* Room Availability */}
                <div className="w-25% mx-5 rounded-lg bg-white p-5">
                  <h2 className="form-h2">Availability</h2>
                  <div className="margin-40 grid grid-cols-2 gap-9 border-solid object-contain px-9">
                    <div className="form-col-deets">
                      <div>
                        <div className="mb-[0.125rem] block min-h-[1.5rem] pl-[1.5rem]">
                          <input
                            className=""
                            value="true"
                            type="radio"
                            id="radioNoLabel01"
                            {...register("occupied")}
                          />
                          <label className="pl-1">Occupied</label>
                        </div>
                        <div className="mb-[0.125rem] block min-h-[1.5rem] pl-[1.5rem]">
                          <input
                          
                            className=""
                            value="false"
                            type="radio"
                            id="radioNoLabel02"
                            {...register("occupied")}
                            checked
                          />
                          <label className="pl-1">Unoccupied</label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Airconditioning */}
                <div className="w-25% mx-5 rounded-lg bg-white p-5">
                  <h2 className="form-h2">Airconditioner</h2>
                  <div className="margin-40 grid grid-cols-2 gap-9 border-solid object-contain px-9">
                    <div className="form-col-deets">
                      <div>
                        <div className="mb-[0.125rem] block min-h-[1.5rem] pl-[1.5rem]">
                          <input
                            className=""
                            type="radio"
                            value="true"
                            id="radioNoLabel01"
                            {...register("with_aircon")}
                          />
                          <label className="pl-1">Yes</label>
                        </div>
                        <div className="mb-[0.125rem] block min-h-[1.5rem] pl-[1.5rem]">
                          <input
                            className=""
                            type="radio"
                            value="false"
                            id="radioNoLabel02"
                            {...register("with_aircon")}
                            checked
                          />
                          <label className="pl-1">No</label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Utilities Inclusion*/}
                <div className="w-25% mx-5 rounded-lg border-slate-950 bg-white p-5 ">
                  <h2 className="form-h2">Utilities</h2>
                  <div className="margin-40 grid grid-cols-2 gap-9 border-solid object-contain px-9">
                    <div className="form-col-deets">
                      <div>
                        <div className="mb-[0.125rem] block min-h-[1.5rem] pl-[1.5rem]">
                          <input
                            className=""
                            type="radio"
                            value="true"
                            id="radioNoLabel01"
                            {...register("with_utilities")}
                          />
                          <label >Yes</label>
                        </div>
                        <div className="mb-[0.125rem] block min-h-[1.5rem] pl-[1.5rem]">
                          <input
                            className=""
                            type="radio"
                            value="false"
                            id="radioNoLabel02"
                            {...register("with_utilities")}
                            checked
                          />
                          <label>No</label>
                        </div>
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
              <Link href="editAcc">
                <button type="submit" className="formButton hover:bg-blue-400">
                    Save Changes
                </button>              
              </Link>

            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
