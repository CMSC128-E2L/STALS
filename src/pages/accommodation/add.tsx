import NavBar from "~/components/navbar";
import { type UseFormRegister, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AccommodationType } from "@prisma/client";
import { api } from "~/utils/api";
import { accommodationAddSchema } from "~/utils/apitypes";
import bgpic from "public/images/bg-05.png";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import LoadingSpinner from "~/components/loadingSpinner";
import { notAuthenticated } from "~/utils/helpers";
import { type z } from "zod";
import { useState } from "react";

export default function AddAccommodation() {
  const userSession = useSession({ required: true });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof accommodationAddSchema>>({
    resolver: zodResolver(accommodationAddSchema),
    defaultValues: {
      tagArray: [],
      typeArray: [],
      is_archived: false,
    },
  });

  const createAccommodation = api.accommodation.add.useMutation();

  const [tagGenders, settagGenders] = useState("Coed");
  const [tagKitchen, settagKitchen] = useState("Cooking Not Allowed");
  const [tagCustom, settagCustom] = useState("");

  if (notAuthenticated(userSession.status)) {
    return <LoadingSpinner />;
  }

  return (
    <div className="overflow-visible">
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
                  const newAddAccomInputs = { ...d };
                  newAddAccomInputs.tagArray?.push(tagGenders);
                  newAddAccomInputs.tagArray?.push(tagKitchen);
                  newAddAccomInputs.tagArray?.push(
                    ...tagCustom.split(",").map(function (item) {
                      return item.trim();
                    }),
                  );
                  console.log(newAddAccomInputs);
                  createAccommodation.mutate(newAddAccomInputs);
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
                    {...register("name", { required: true })}
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
                        {...register("contact_number")}
                      ></input>
                    </div>
                    {/* Accommodation price input field */}
                    <div className="">
                      <label className="form-h2"> Price of Accommodation</label>
                      <input
                        className="add-acc-input-text-field"
                        placeholder="Price"
                        pattern="[0-9]+"
                        {...register("price", { valueAsNumber: true })}
                      ></input>
                    </div>
                  </div>

                  <div className="col-span-2">
                    <label className="form-h2">Address</label>

                    <div className="mb-2 flex flex-row gap-2">
                      <input
                        className="add-acc-input-text-field w-1/3"
                        placeholder="St."
                        {...register("street_number")}
                      ></input>
                      <input
                        className="add-acc-input-text-field w-2/3"
                        placeholder="Subdivision"
                        {...register("subdivision")}
                      ></input>
                      <input
                        className="add-acc-input-text-field"
                        placeholder="Barangay"
                        {...register("barangay")}
                      ></input>
                    </div>
                  </div>
                </div>
                <div>
                  <h2 className="form-h3 text-center">Tags</h2>

                  <div className="margin-40 grid grid-cols-3 gap-4 px-3">
                    <div className="form-col-deets">
                      <div className="flex flex-col gap-1">
                        <label className="form-h2">Genders</label>
                        <div className="h-10 w-full items-center justify-items-stretch rounded-md bg-white">
                          <select
                            className="form-dropdown"
                            onChange={(e) => {
                              settagGenders(e.target.value);
                            }}
                          >
                            <option value="Coed" defaultChecked>
                              Coed
                            </option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                          </select>
                        </div>
                      </div>
                      <div className="flex flex-col gap-1">
                        <div>
                          <label className="form-h2">Kitchen</label>
                          <select
                            className="form-dropdown"
                            onChange={(e) => {
                              settagKitchen(e.target.value);
                            }}
                          >
                            <option value="Cooking Not Allowed" defaultChecked>
                              Cooking Not Allowed
                            </option>
                            <option value="Communal Kitchen">
                              Communal Kitchen
                            </option>
                            <option value="Kitchen in Room">
                              Kitchen in Room
                            </option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="form-col-deets">
                      {tagCheckbox(
                        [
                          "Communal bathroom",
                          "Pet(s)",
                          "Aircon",
                          "Utilities",
                          "Parking",
                        ],
                        register,
                      )}
                    </div>
                    <div className="form-col-deets">
                      {tagCheckbox(
                        [
                          "CCTV",
                          "Visitor(s)",
                          "Guard(s)",
                          "Curfew",
                          "Laundry Service",
                        ],
                        register,
                      )}
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
                      onChange={(e) => settagCustom(e.target.value)}
                    ></input>
                  </div>
                </div>
                {/* Manage gallery */}
                <div className="hidden">
                  <div className="pb-3 text-center">
                    <label className="form-h3">
                      Upload Accommodation Photos
                    </label>
                    <main className="container">
                      <article
                        aria-label="file Upload Modal"
                        className="relative flex h-full flex-col rounded-md shadow-xl"
                      >
                        <section className="flex w-full flex-col gap-3 overflow-auto p-3">
                          <header className="flex flex-col items-center justify-center rounded-md border border-dashed border-p-gray p-12">
                            <p className="mb-3 flex flex-wrap justify-center font-semibold">
                              <span>Drag and drop your</span>&nbsp;
                              <span>files anywhere or</span>
                            </p>
                            <input
                              id="hidden-input"
                              type="file"
                              multiple
                              className="hidden"
                            />
                            <button
                              id="button"
                              className="focus:shadow-outline mt-2 rounded-sm bg-gray-200 px-3 py-1 hover:bg-gray-300 focus:outline-none"
                            >
                              Upload a file
                            </button>
                          </header>
                          <div>
                            <h1 className="form-h2 text-center">To Upload</h1>

                            <ul
                              id="gallery"
                              className="-m-1 flex flex-1 flex-wrap"
                            >
                              <li
                                id="empty"
                                className="flex h-full w-full flex-col items-center justify-center text-center"
                              >
                                <img
                                  className="mx-auto w-32"
                                  src="https://user-images.githubusercontent.com/507615/54591670-ac0a0180-4a65-11e9-846c-e55ffce0fe7b.png"
                                  alt="no data"
                                />
                                <span className="text-small text-gray-500">
                                  No files selected
                                </span>
                              </li>
                            </ul>
                          </div>
                        </section>
                      </article>
                    </main>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <div>
                    <button type="submit" className="formConfirm">
                      Submit
                    </button>
                  </div>
                  <button type="reset" className="formReject">
                    Reset
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

function tagCheckbox(
  array: string[],
  register: UseFormRegister<z.infer<typeof accommodationAddSchema>>,
) {
  return array.map((value: string) => (
    <div key={value} className="flex flex-row gap-2">
      <input
        id={value}
        type="checkbox"
        value={value}
        {...register("tagArray")}
      />
      <label htmlFor={value}>{value}</label>
    </div>
  ));
}
