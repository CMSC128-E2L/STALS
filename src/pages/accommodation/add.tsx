import NavBar from "~/components/navbar";
import { type UseFormRegister, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AccommodationType, UserType } from "@prisma/client";
import { api } from "~/utils/api";
import { accommodationAddSchema } from "~/utils/apitypes";
import bgpic from "public/images/background_addedit_accom.png";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import LoadingSpinner from "~/components/loadingSpinner";
import { notAuthenticated } from "~/utils/helpers";
import { type z } from "zod";
import { useState } from "react";
import Error401 from "~/pages/401";
import { useRouter } from "next/router";
import FormError from "~/components/formError";

export default function AddAccommodation() {
  const userSession = useSession({ required: true });
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset: resetFrom,
  } = useForm<z.infer<typeof accommodationAddSchema>>({
    resolver: zodResolver(accommodationAddSchema),
    defaultValues: {
      tagArray: [],
      typeArray: [],
      barangay: "Anos",
      street_number: "",
      subdivision: "",
    },
  });

  const barangays = [
    "Anos",
    "Bagong Silang",
    "Bambang",
    "Batong Malake",
    "Baybayin",
    "Bayog",
    "Lalakay",
    "Maahas",
    "Malinta",
    "Mayondon",
    "Putho-Tuntungin",
    "San Antonio",
    "Tadlac",
    "Timugan",
  ];

  const createAccommodation = api.accommodation.add.useMutation({
    onSuccess: () => {
      toast.success("Successfully Added Accommodation!", {
        position: "bottom-right",
        duration: 3000,
      });
      resetFrom();
    },
  });

  const [tagGenders, settagGenders] = useState("Coed");
  const [tagKitchen, settagKitchen] = useState("Cooking Not Allowed");
  const [tagCustom, settagCustom] = useState("");

  if (notAuthenticated(userSession.status)) {
    return (
      <div className="min-h-[80vh]">
        <img
          className="fixed -z-50 w-screen bg-cover bg-fixed bg-center"
          src={bgpic.src}
          alt="background"
        />
        <LoadingSpinner />
      </div>
    );
  }

  if (userSession?.data?.profile.type === UserType.USER) {
    return Error401();
  }
  return (
    <div className="">
      <img className="site-background" src={bgpic.src} alt="background" />
      <NavBar />
      <div className="px-2 py-2 sm:px-0">
        <div className="inset-x-0 flex items-center justify-center">
          <div className="my-14 flex w-full flex-col items-center justify-center gap-1 rounded-md sm:p-10 md:w-1/2">
            <div>
              <h1 className="form-h1 pb-2"> Add Accommodation</h1>
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
                },
                (error) => {
                  console.log(error);
                  toast.error("Cannot Add Accommodation!", {
                    position: "bottom-right",
                    duration: 2000,
                  });
                },
              )}
              className="w-full justify-items-stretch"
            >
              <div>
                <h2 className="form-h3 pb-2">Background</h2>

                <div className="px-3">
                  {/* Lodging name */}
                  <label className="form-h2 form-field-required ">
                    Accommodation Name
                  </label>
                  <input
                    className={`add-acc-input-text-field w-full ${
                      errors.name ? "input-text-field-error" : ""
                    }`}
                    placeholder="Name of Accommodation"
                    maxLength={30}
                    type="text"
                    id="name"
                    {...register("name")}
                  />
                  <FormError error={errors.name?.message} />
                </div>
                <h2 className="form-h2 form-field-required px-3 pt-3 ">
                  Type of Accommodation
                </h2>
                <div className="ml-5 flex flex-col justify-evenly gap-4 px-5 pt-2 sm:ml-0 sm:flex-row">
                  {typeCheckbox(
                    [
                      "Dormitory",
                      "Apartment",
                      "Hotel",
                      "Transient",
                      "Bedspace",
                    ],
                    register,
                  )}
                </div>
                <FormError error={errors.typeArray?.message} />
                <div className="px-3">
                  <label className="form-h2 form-field-required ">
                    Address
                  </label>

                  <div className="flex flex-col gap-2 sm:flex-row">
                    <div className="flex flex-col sm:w-1/3">
                      <input
                        className={`add-acc-input-text-field grow ${
                          errors.street_number ? "input-text-field-error" : ""
                        }  `}
                        placeholder="St."
                        maxLength={4}
                        {...register("street_number")}
                      />
                      <FormError error={errors.street_number?.message} />
                    </div>
                    <div className="flex flex-col sm:w-2/3">
                      <input
                        className={`add-acc-input-text-field ${
                          errors.subdivision ? "input-text-field-error" : ""
                        } `}
                        placeholder="Subdivision"
                        {...register("subdivision")}
                        maxLength={20}
                      />
                      <FormError error={errors.subdivision?.message} />
                    </div>

                    <div>
                      <select
                        className="form-dropdown"
                        {...register("barangay")}
                        required
                      >
                        <option value="" disabled selected>
                          Select Barangay
                        </option>
                        {barangayDropdown(barangays)}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-2 object-contain p-3 sm:grid-cols-2">
                  <div className="form-col-deets">
                    <div className="hidden">
                      <label className="form-h2 ">Type of Accommodation</label>
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
                          <option value={AccommodationType.BEDSPACE}>
                            Bedspace
                          </option>
                          <option value={AccommodationType.HOTEL}>Hotel</option>
                          <option value={AccommodationType.TRANSIENT}>
                            Transient Space
                          </option>
                        </select>
                      </div>
                    </div>

                    <div className="">
                      <label className="form-h2 ">Contract Length</label>
                      <select
                        className="form-dropdown"
                        placeholder="Contract Length"
                        {...register("contract_length")}
                      >
                        <option value="1 ACADEMIC YEAR">1 Academic Year</option>
                        <option value="1 SEMESTER">1 Semester</option>
                      </select>
                    </div>

                    {/* Accommodation price input field */}
                    <div className="">
                      <label className="form-h2 form-field-required ">
                        Price of Accommodation
                      </label>
                      <input
                        className={`add-acc-input-text-field ${
                          errors.price ? "input-text-field-error" : ""
                        } `}
                        placeholder="Price"
                        type="number"
                        {...register("price", {
                          valueAsNumber: true,
                          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                          setValueAs: (value: string) =>
                            parseFloat(value).toFixed(2),
                        })}
                        title="Must be a positive float value."
                      />
                      <FormError error={errors.subdivision?.message} />
                    </div>

                    {/* FB page link*/}
                    <div>
                      <label className="form-h2 ">FB Page</label>
                      <input
                        className={`add-acc-input-text-field  ${
                          errors.fb_page ? "input-text-field-error" : ""
                        }`}
                        placeholder="Facebook Page Link"
                        type="text"
                        {...register("fb_page")}
                        title="Please enter a valid Facebook Page Link."
                      ></input>
                    </div>
                  </div>
                  <div className="form-col-deets">
                    <div className="flex flex-col">
                      <label className="form-h2 ">Location</label>
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
                      <label className="form-h2 form-field-required ">
                        {" "}
                        Contact No.
                      </label>
                      <input
                        className={`add-acc-input-text-field ${
                          errors.contact_number ? "input-text-field-error" : ""
                        } `}
                        maxLength={13}
                        placeholder="Contact No."
                        {...register("contact_number")}
                      ></input>
                      <FormError error={errors.contact_number?.message} />
                    </div>
                  </div>
                </div>
                <div>
                  <h2 className="form-h3 py-2 ">Tags</h2>

                  <div className="margin-40 grid grid-cols-1 gap-4 px-3 sm:grid-cols-3">
                    <div className="form-col-deets">
                      <div className="flex flex-col gap-1">
                        <label className="form-h2">Dorm Type</label>
                        <div className="h-10 w-full items-center justify-items-stretch rounded-md bg-white">
                          <select
                            className="form-dropdown"
                            onChange={(e) => {
                              settagGenders(e.target.value);
                            }}
                          >
                            <option value="Coed" defaultChecked>
                              Co-ed
                            </option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                          </select>
                        </div>
                      </div>
                      <div className="flex flex-col gap-1">
                        <div>
                          <label className="form-h2 ">Kitchen</label>
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
                    <div className="form-col-deets ml-5 sm:ml-0">
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
                    <div className="form-col-deets ml-5 sm:ml-0">
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
                  <h2 className="form-h2 ">Custom Tags</h2>
                  <div className="flex flex-col gap-1">
                    <label>
                      Separate custom tags with commas (,). I.e: laundry,
                      canteen, thing, ...
                    </label>
                    <input
                      type="text"
                      placeholder="Custom tags"
                      // {...register("tags")}
                      pattern="(^([\w ]{1,30})$|^(([\w ]{1,30}, ?){0,4}[\w ]{0,30}?)$)?"
                      className="add-acc-input-text-field"
                      onChange={(e) => settagCustom(e.target.value)}
                    ></input>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <div>
                    <button type="submit" className="formConfirm">
                      Submit
                    </button>
                  </div>
                  <input
                    className="formReject"
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

function typeCheckbox(
  array: string[],
  register: UseFormRegister<z.infer<typeof accommodationAddSchema>>,
) {
  return array.map((value: string) => (
    <div key={value} className="flex flex-row gap-2">
      <input
        id={value}
        type="checkbox"
        value={value}
        {...register("typeArray", { required: true })}
      />
      <label htmlFor={value}>{value}</label>
    </div>
  ));
}

function barangayDropdown(barangays: string[]) {
  return barangays.map((value: string, index) => (
    <option value={value} key={index}>
      {value}
    </option>
  ));
}
