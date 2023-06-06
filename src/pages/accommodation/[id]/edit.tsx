import NavBar from "~/components/navbar";
import { useRouter } from "next/router";
import { dynamicRouteID, notAuthenticated } from "~/utils/helpers";
import { accommodationEditSchema } from "~/utils/apitypes";
import { type UseFormRegister, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type RouterInputs, api } from "~/utils/api";
import bgpic from "public/images/background_addedit_accom.png";
import toast from "react-hot-toast";
import Link from "next/link";
import { useSession } from "next-auth/react";
import LoadingSpinner from "~/components/loadingSpinner";
import Error404 from "~/pages/404";
import Error from "~/pages/_error";
import { type z } from "zod";
import { stalsDBstringArray } from "~/utils/helpers";

export default function EditAccommodation() {
  const userSession = useSession({ required: true });
  const { id } = dynamicRouteID(useRouter());
  const router = useRouter();

  const { data: oldData, isLoading: oldDataLoading } =
    api.accommodation.getOne.useQuery(id);

  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm<z.infer<typeof accommodationEditSchema>>({
    resolver: zodResolver(accommodationEditSchema),
    defaultValues: {
      id: id,
    },
  });

  const editAccommodation = api.accommodation.edit.useMutation();

  if (notAuthenticated(userSession.status) || oldDataLoading) {
    return (
      <div className="min-h-[80vh]">
        <img className="site-background" src={bgpic.src} alt="background" />
        <NavBar />
        <LoadingSpinner />
      </div>
    );
  }

  if (oldData === null) {
    return Error404();
  }

  if (oldData?.landlord !== userSession.data?.user.id) {
    return <Error statusCode={401} />;
  }

  return (
    <div className="">
      <img
        className="fixed -z-50 w-screen bg-cover bg-fixed bg-center"
        src={bgpic.src}
        alt="background"
      />
      <NavBar />
      <div className="block px-2 py-2 sm:px-0">
        <div className="inset-x-0 flex items-center justify-center">
          <div className="my-14 flex flex-col items-center justify-center gap-1 rounded-md p-10 sm:w-[50%]">
            <div>
              <h1 className="form-h1">Edit Accommodation</h1>
            </div>
            <form
              // eslint-disable-next-line @typescript-eslint/no-misused-promises
              onSubmit={handleSubmit(
                (d) => {
                  void toast.promise(
                    editAccommodation.mutateAsync(
                      d as RouterInputs["accommodation"]["edit"],
                    ),
                    {
                      loading: "Editing Accommodation...",
                      success: "Successfully Edited Accommodation!",
                      error: "Editing Accommodation Failed!",
                    },
                    {
                      position: "bottom-right",
                    },
                  );
                },
                (errors) => {
                  console.log(errors);
                  toast.error("Cannot Edit Room!", {
                    position: "bottom-right",
                    duration: 1000,
                  });
                },
              )}
              className="justify-items-stretchspace-y-4 flex w-full flex-col gap-1 object-contain"
            >
              <div className="flex flex-col gap-1">
                <div className="w-full">
                  <label className="form-h2">Accommodation Name</label>
                  <input
                    className={`add-acc-input-text-field w-full ${
                      errors.name ? "input-text-field-error" : ""
                    }`}
                    defaultValue={oldData?.name ?? ""}
                    type="text"
                    maxLength={30}
                    {...register("name")}
                  />
                </div>
                {errors.name?.message && (
                  <p className="text-red-500">{errors.name.message}</p>
                )}
              </div>
              <h2 className="form-h2 px-3 pt-3">Type of Accommodation</h2>
              <div className="ml-5 flex flex-col justify-evenly gap-4 px-5 pt-2 sm:ml-0 sm:flex-row">
                {tagCheckbox(
                  ["Dormitory", "Apartment", "Hotel", "Transient", "Bedspace"],
                  stalsDBstringArray(oldData?.typeArray),
                  register,
                )}
              </div>
              {errors.typeArray?.message && (
                <p className="text-red-500">{errors.typeArray.message}</p>
              )}
              <div className="grid grid-cols-1 gap-2 object-contain sm:grid-cols-2">
                <div className="form-col-deets">
                  <div className="hidden">
                    <label className="form-h2">Type of Accommodation</label>
                    <select
                      name="Accommodation Type"
                      className="form-dropdown italic shadow shadow-p-black/50"
                      placeholder="Type"
                    >
                      <option value="">Dormitory</option>
                      <option value="">Apartment</option>
                      <option value="">Bedspacer</option>
                      <option value="">Hotel</option>
                      <option value="">Transient Space</option>
                    </select>
                  </div>
                  <div className="">
                    <label className="form-h2">Contract Length</label>
                    <select
                      className="form-dropdown"
                      {...register("contract_length")}
                      defaultValue={oldData?.contract_length ?? ""}
                    >
                      <option selected disabled hidden>
                        {oldData?.contract_length}
                      </option>
                      <option>1 ACADEMIC YEAR</option>
                      <option>1 SEMESTER</option>
                    </select>
                  </div>
                  <div>
                    <label className="form-h2">FB Page</label>
                    <input
                      className="add-acc-input-text-field"
                      type="text"
                      pattern="(?:https?:\/\/)?(?:www\.)?(mbasic.facebook|m\.facebook|facebook|fb)\.(com|me)\/(?:(?:\w\.)*#!\/)?(?:pages\/)?(?:[\w\-\.]*\/)*([\w\-\.]*)"
                      {...register("fb_page")}
                      defaultValue={oldData?.fb_page ?? ""}
                    ></input>
                  </div>
                </div>
                <div className="form-col-deets">
                  <div className="">
                    <label className="form-h2">Location</label>
                    <select
                      className="form-dropdown shadow shadow-p-black/50"
                      {...register("location")}
                      value={oldData?.location ?? ""}
                    >
                      <option selected disabled hidden>
                        {oldData?.location ?? ""}
                      </option>
                      <option>Within UPLB</option>
                      <option>Outside UPLB</option>
                    </select>
                  </div>
                  <div className="">
                    <label className="form-h2">Contact No.</label>
                    <input
                      className="add-acc-input-text-field"
                      defaultValue={oldData?.contact_number}
                      pattern="^(09|\+639)[0-9]{9}"
                      type="text"
                      {...register("contact_number")}
                    ></input>
                  </div>
                  <div className="">
                    <label className="form-h2"> Price of Accommodation</label>
                    <input
                      className="add-acc-input-text-field"
                      defaultValue={oldData?.price ?? ""}
                      pattern="^\d+(\.\d+)?$+"
                      type="text"
                      title="Must be a positive float value."
                      {...register("price", {
                        valueAsNumber: true,
                        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                        setValueAs: (value: string) => parseFloat(value),
                      })}
                    ></input>
                  </div>
                </div>
              </div>
              <div className="py-2"></div>
              <div className="flex flex-col gap-2">
                <div>
                  <button type="submit" className="formConfirm">
                    Save Changes
                  </button>
                </div>
                <div>
                  <button
                    type="reset"
                    className="formReject"
                    onClick={() => {
                      router.back();
                    }}
                  >
                    Back
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
  oldData: any,
  register: UseFormRegister<z.infer<typeof accommodationEditSchema>>,
) {
  //for backend
  const isArray = Array.isArray(oldData);

  return array.map((value: string) => (
    <div key={value} className="flex flex-row gap-2">
      <input
        id={value}
        type="checkbox"
        value={value}
        defaultChecked={isArray && oldData.includes(value)}
        {...register("typeArray")}
      />
      <label htmlFor={value}>{value}</label>
    </div>
  ));
}
