import NavBar from "~/components/navbar";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AccommodationType } from "@prisma/client";
import { type RouterInputs, api } from "~/utils/api";
import { accommodationAddSchema } from "~/utils/apitypes";
import bgpic from "public/images/bg-05.png";
import toast, { Toaster } from "react-hot-toast";

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
    <div className="overflow-visible">
      <Toaster
        toastOptions={{
          success: {
            style: {
              background: "green",
              color: "white",
            },
          },
          error: {
            style: {
              background: "red",
              color: "white",
            },
          },
        }}
      />
      <img
        className="absolute bg-cover object-fill"
        src={bgpic.src}
        alt="background"
      />
      <NavBar />
      <div className="overflow-scroll py-14">
        <div className="absolute inset-x-0 flex items-center justify-center ">
          <div className="shadow-md/50 my-14 flex w-[55%] flex-col items-center justify-center  gap-1 rounded-md bg-white/70 p-3 shadow ">
            <div>
              <h1 className="form-h1"> Add Accommodation</h1>
            </div>
            <form
              // eslint-disable-next-line
              onSubmit={handleSubmit(
                (d) => {
                  console.log(d);
                  createAccommodation.mutate(
                    d as RouterInputs["accommodation"]["add"],
                  );
                  toast.success("Successfully Added Accommodation!", {
                    position: "bottom-right",
                    duration: 1000,
                  });
                },
                (error) => {
                  console.log(error);
                  toast.error("Cannot Add Accommodation!", {
                    position: "bottom-right",
                    duration: 1000,
                  });
                },
              )}
              className="w-full   justify-items-stretch"
            >
              <div>
                <h2 className="form-h3 text-center">Background</h2>

                <div className="px-3">
                  {/* Lodging name */}
                  <label className="form-h2">Accommodation Name</label>
                  <input
                    className="add-acc-input-text-field w-full"
                    placeholder="Name of Accommodation"
                    pattern="[\w\s]+"
                    {...register("name")}
                    required
                  ></input>
                </div>

                <div className="grid grid-cols-2 gap-2 object-contain p-3">
                  <div className="form-col-deets">
                    <div>
                      <label className="form-h2">Type of Accommodation</label>
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
                    </div>
                    <div className="">
                      <label className="form-h2">Contract Length</label>
                      <select
                        className="form-dropdown"
                        placeholder="Contract Length"
                      >
                        <option>1 Academic Year</option>
                        <option>1 Semester</option>
                      </select>
                    </div>
                    <div>
                      {/* FB page link*/}
                      <label className="form-h2">FB Page</label>
                      <input
                        className="add-acc-input-text-field"
                        placeholder="Facebook Page Link"
                        pattern="(?:https?:\/\/)?(?:www\.)?(mbasic.facebook|m\.facebook|facebook|fb)\.(com|me)\/(?:(?:\w\.)*#!\/)?(?:pages\/)?(?:[\w\-\.]*\/)*([\w\-\.]*)"
                        type="text"
                        {...register("fb_page")}
                      ></input>
                    </div>
                  </div>
                  <div className="form-col-deets">
                    <div className="flex flex-col">
                      <label className="form-h2">Location</label>
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
                    {/* Contact No input field */}
                    <div className="">
                      <label className="form-h2"> Contact No.</label>
                      <input
                        className="add-acc-input-text-field"
                        placeholder="Contact No."
                        pattern="(09|\+639)[0-9]{9}"
                        type="text"
                        {...register("contact_number")}
                        required
                      ></input>
                    </div>
                    {/* Accommodation price input field */}
                    <div className="">
                      <label className="form-h2"> Price of Accommodation</label>
                      <input
                        className="add-acc-input-text-field"
                        placeholder="Price"
                        pattern="[0-9]+"
                        type="text"
                        {...register("price", { valueAsNumber: true })}
                        required
                      ></input>
                    </div>
                  </div>

                  <div className="col-span-2">
                    <label className="form-h2">Address</label>
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
                  <div className="hidden">
                    <input type="checkbox" {...register("is_archived")} />
                  </div>
                </div>
                <div>
                  <h2 className="form-h3 text-center">Tags</h2>

                  <div className="margin-40 grid grid-cols-3 gap-4 px-3">
                    <div className="form-col-deets">
                      <div className="flex flex-col gap-1">
                        <label className="form-h2">Genders</label>
                        <div className="h-10 w-full items-center justify-items-stretch rounded-md bg-white">
                          <select name="gender" className="form-dropdown">
                            <option value="">Coed</option>
                            <option value="">Male</option>
                            <option value="">Female</option>
                          </select>
                        </div>
                      </div>
                      <div className="flex flex-col gap-1">
                        <div className="hidden">
                          {/* No of Available Rooms */}

                          <input
                            className="add-acc-input-text-field"
                            placeholder="No. of Available Rooms"
                            {...register("num_of_rooms", {
                              valueAsNumber: true,
                            })}
                            type="number"
                          ></input>
                        </div>
                        <div>
                          <label className="form-h2">Kitchen</label>
                          <select name="cooking" className="form-dropdown">
                            <option value="">Communal Kitchen</option>
                            <option value="">Kitchen in Room</option>
                            <option value="">Cooking Not Allowed</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="form-col-deets">
                      <div className="flex flex-row gap-2">
                        <input type="checkbox" name="bathroom"></input>
                        <label className="">Communal bathroom</label>
                      </div>
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
                    </div>
                    <div className="form-col-deets">
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
                        <input type="checkbox" name="curfew"></input>{" "}
                        <label className="">Curfew</label>
                      </div>
                      <div>
                        <input type="checkbox" name="Laundry"></input>{" "}
                        <label className="">Laundry Service</label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="px-3 py-5">
                  <h2 className="form-h2">Custom Tags</h2>
                  <div className="flex flex-col gap-1">
                    <label>
                      Separate custom tags with commas (,). I.e: laundry,
                      canteen, thing, ...
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
                <div className="col-span-2 mb-3 flex flex-col gap-3 rounded-md border border-dashed border-p-gray p-12">
                  <label className="form-h2 text-center">
                    Upload Accommodation Photos
                  </label>
                  <div>
                    {/* Upload Photos */}
                    <input
                      id="file"
                      type="file"
                      name="file"
                      className="sr-only"
                    />
                    <label
                      htmlFor="file"
                      className="justify-self-end object-contain"
                    >
                      <div className="flex flex-row">
                        <span className="w-1/2">Drag your files here</span>
                        <span className="formConfirm">Upload Files</span>
                      </div>
                    </label>
                  </div>
                </div>
                <div className="flex flex-row space-x-3">
                  <button type="reset" className="formReject">
                    Clear
                  </button>
                  <button type="submit" className="formConfirm">
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
