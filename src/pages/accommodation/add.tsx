import NavBar from "~/components/navbar";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AccommodationType } from "@prisma/client";
import { type RouterInputs, api } from "~/utils/api";
import { accommodationAddSchema } from "~/utils/apitypes";

export default function AddAccommodation() {
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm({
    resolver: zodResolver(accommodationAddSchema),
  });

  const createAccommodation = api.accommodation.add.useMutation();

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <NavBar />
      {/* Body */}
      <div className="mt-10 flex flex-col items-center justify-center">
        <div className="my-14 w-3/4 rounded-xl bg-p-lblue p-4">
          <div>
            <h1 className="form-h1">New Accommodation</h1>
          </div>

          <form
            // eslint-disable-next-line
            onSubmit={handleSubmit((d) => {
              console.log(d);
              createAccommodation.mutate(
                d as RouterInputs["accommodation"]["add"],
              );
            })}
            className="justify-items-stretch space-y-4"
          >
            <div className="">
              <h2 className="form-h2 mx-9 pb-2">Background</h2>
              {/* Accommodation background deets */}
              <div className="margin-40 grid grid-cols-2 gap-9 object-contain px-9">
                <div className="form-col-deets">
                  {/* Left Column */}
                  <div>
                    {/* Lodging name */}

                    <input
                      className="add-acc-input-text-field"
                      placeholder="Name of Accommodation"
                      pattern="[\w\s]+"
                      {...register("name")}
                      required
                    ></input>
                  </div>
                  <div className="flex flex-col gap-1">
                    {/* Subtype input field */}
                    <label>Type of Accommodation</label>
                    <div className="h-10 w-full items-center justify-items-stretch rounded-md bg-white">
                      <select
                        className="form-dropdown peer"
                        placeholder="Type"
                        {...register("type")}
                      >
                        <option value={AccommodationType.DORMITORY}>
                          Dormitory
                        </option>
                        <option value={AccommodationType.APARTMENT}>
                          Apartment
                        </option>
                        <option value={AccommodationType.BEDSPACER}>
                          Bedspacer
                        </option>
                        <option value={AccommodationType.HOTEL}>Hotel</option>
                        <option value={AccommodationType.TRANSCIENT}>
                          Transient Space
                        </option>
                      </select>
                    </div>
                    <div className="">
                      <label>Contract Length</label>
                      <select
                        className="form-dropdown"
                        placeholder="Contract Length"
                      >
                        <option>1 Academic Year</option>
                        <option>1 Semester</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label>Address</label>
                    {/* Address input field */}
                    <div className="pb-2">
                      <input
                        className="add-acc-input-text-field"
                        placeholder="Address"
                      ></input>
                    </div>
                    <div className="mb-2 flex flex-row gap-2">
                      <input
                        className="add-acc-input-text-field w-1/3"
                        type="text"
                        placeholder="St."
                      ></input>
                      <input
                        className="add-acc-input-text-field w-2/3"
                        placeholder="Subdivision"
                      ></input>
                      <input
                        className="add-acc-input-text-field"
                        placeholder="Barangay"
                        type="text"
                        {...register("address")}
                      ></input>
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div className="form-col-deets">
                  <div className="flex flex-col gap-1">
                    <label>Location</label>
                    <div className="h-10 w-full items-center justify-items-stretch rounded-md bg-white">
                      <select
                        className="form-dropdown"
                        placeholder="Location"
                        {...register("location")}
                      >
                        <option value="WITHIN UPLB">Within UPLB</option>
                        <option value="OUTSIDE UPLB">Outside UPLB</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex flex-row gap-1">
                    {/* Contact No input field */}
                    <select className="rounded-md pl-2 font-bold">
                      <option value="09">09</option>
                      <option value="+639">+639</option>
                    </select>
                    <input
                      className="add-acc-input-text-field"
                      placeholder="Contact No."
                      pattern="[0-9]{9}"
                      type="text"
                      {...register("contact_number")}
                      required
                    ></input>
                  </div>

                  <div>
                    {/* FB page link*/}

                    <input
                      className="add-acc-input-text-field"
                      placeholder="Facebook Page Link"
                      pattern="(?:https?:\/\/)?(?:www\.)?(mbasic.facebook|m\.facebook|facebook|fb)\.(com|me)\/(?:(?:\w\.)*#!\/)?(?:pages\/)?(?:[\w\-\.]*\/)*([\w\-\.]*)"
                      type="text"
                      {...register("fb_page")}
                    ></input>
                  </div>

                  <div className="hidden">
                    <input type="checkbox" {...register("is_archived")} />
                  </div>
                  <div className="">
                    {/* No of Available Rooms */}

                    <input
                      className="add-acc-input-text-field"
                      placeholder="No. of Available Rooms"
                      {...register("num_of_rooms", { valueAsNumber: true })}
                      type="number"
                    ></input>
                  </div>
                  <div>
                    <div className="grid h-10 w-full grid-cols-2 items-center justify-items-stretch rounded-md bg-white p-1">
                      {/* Upload Photos */}
                      <label className="input-text-box-label px-4">
                        Upload Files
                      </label>
                      <div className="justify-self-end object-contain">
                        <input className="" id="file_input" type="file"></input>
                      </div>
                    </div>
                  </div>

                  <div>
                    <Link href="/addRoom">
                      {/* REDIRECT TO ADD ROOM */}
                      <button className="mt-3 rounded-md bg-p-gray px-3 py-1 shadow shadow-p-black/50">
                        Manage Rooms
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="form-h2 mx-9 pb-2">Tags</h2>
              {/* TAGS */}
              <div className="margin-40 grid grid-cols-2 gap-4 px-9">
                {/* LEFT COLUMN */}
                <div className="form-col-deets text-lg">
                  <div className="flex flex-col gap-1">
                    <label>Genders</label>
                    <div className="h-10 w-full items-center justify-items-stretch rounded-md bg-white">
                      <select name="gender" className="form-dropdown">
                        <option value="">Coed</option>
                        <option value="">Male</option>
                        <option value="">Female</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label>Shared Bathroom?</label>
                    <div className="h-10 w-full items-center justify-items-stretch rounded-md bg-white">
                      <select name="gender" className="form-dropdown">
                        <option value="">Communal Bathroom</option>
                        <option value="">Private Bathroom</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <div>
                      <label>Kitchen</label>
                      <select name="cooking" className="form-dropdown">
                        <option value="">Communal Kitchen</option>
                        <option value="">Kitchen in Room</option>
                        <option value="">Cooking Not Allowed</option>
                      </select>
                    </div>
                    <div>
                      <input
                        type="checkbox"
                        name="curfew"
                        className="peer"
                      ></input>{" "}
                      Curfew
                      <div className="hidden pb-3 peer-checked:block">
                        <input
                          type="time"
                          className="add-acc-input-text-field"
                          placeholder="Curfew"
                        ></input>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right COLUMN */}
                <div className="form-col-deets">
                  <div className="text-lg">
                    <div>
                      <input type="checkbox" name="pets"></input> Pets
                    </div>
                    <div>
                      <input type="checkbox" name="pets"></input> Aircon
                    </div>
                    <div>
                      <input type="checkbox" name="pets"></input> Utilities
                    </div>
                    <div>
                      <input type="checkbox" name="pets"></input> Parking
                    </div>
                    <div>
                      <input type="checkbox" name="pets"></input> CCTV
                    </div>
                    <div>
                      <input type="checkbox" name="visitors"></input> Visitors
                    </div>
                    <div>
                      <input type="checkbox" name="pets"></input> Guards
                    </div>
                    <div>
                      <input
                        type="checkbox"
                        name="Laundry"
                        className="peer"
                      ></input>{" "}
                      Laundry Service
                      {/* MAX AND MIN FEES FOR LAUNDRY SERVICE */}
                      <div className="hidden gap-2 pt-2 peer-checked:block peer-checked:flex peer-checked:flex-row ">
                        <div className="w-1/2 justify-items-end">
                          <input
                            type="text"
                            className="add-acc-input-text-field"
                            placeholder="Min Fee"
                          ></input>
                        </div>
                        <div className=" w-1/2 justify-items-end">
                          <input
                            type="text"
                            className="add-acc-input-text-field"
                            placeholder="Max Service Fee"
                          ></input>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* CUSTOM TAGS TEXT BOX */}
              <div className="py-5">
                <h2 className="form-h2 mx-9">Custom Tags</h2>
                <div className="flex flex-col gap-1 px-9">
                  <label>
                    Separate custom tags with commas (,). I.e: laundry, canteen,
                    thing, ...
                  </label>
                  <input
                    type="text"
                    placeholder="Custom tags"
                    {...register("tags")}
                    pattern="(([\w\s]+), ?){,4}([\w\s])?"
                    className="add-acc-input-text-field"
                  ></input>
                </div>
              </div>

              <div className="float-right space-x-3 px-9">
                <button type="reset" className="formButton">
                  Clear
                </button>
                <button type="submit" className="formButton">
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
