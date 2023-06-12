import NavBar from "~/components/navbar";
import { useRouter } from "next/router";
import { dynamicRouteID, notAuthenticated } from "~/utils/helpers";
import { accommodationEditSchema } from "~/utils/apitypes";
import { type UseFormRegister, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "~/utils/api";
import bgpic from "public/images/background_addedit_accom.png";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import LoadingSpinner from "~/components/loadingSpinner";
import Error404 from "~/pages/404";
import Error from "~/pages/_error";
import { type z } from "zod";
import { stalsDBstringArray } from "~/utils/helpers";
import FormError from "~/components/formError";
import { type Prisma } from "@prisma/client";
import { useEffect } from "react";

export default function EditAccommodation() {
  const userSession = useSession({ required: true });
  const { id } = dynamicRouteID(useRouter());
  const router = useRouter();

  const {
    data: oldData,
    isLoading: oldDataLoading,
    refetch,
    isStale,
  } = api.accommodation.getOne.useQuery(id);

  useEffect(() => {
    void refetch();
  }, [userSession, isStale, refetch]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof accommodationEditSchema>>({
    resolver: zodResolver(accommodationEditSchema),
    defaultValues: {
      id: id,
      typeArray: stalsDBstringArray(oldData?.typeArray),
    },
  });

  const editAccommodation = api.accommodation.edit.useMutation({
    onSuccess: () => {
      void refetch();
      router.back();
    },
  });

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
      <img className="site-background" src={bgpic.src} alt="background" />
      <NavBar />
      <div className="px-2 py-2 sm:px-0">
        <div className="flex items-center justify-center">
          <div className="my-14 flex w-full flex-col items-center justify-center gap-1 rounded-md sm:p-10 md:w-1/2">
            <div>
              <h1 className="form-h1">Edit Accommodation</h1>
            </div>
            <form
              // eslint-disable-next-line @typescript-eslint/no-misused-promises
              onSubmit={handleSubmit(
                (d) => {
                  void toast.promise(
                    new Promise((resolve) => {
                      setTimeout(() => {
                        resolve(
                          editAccommodation.mutate({
                            ...d,
                            id,
                          }),
                        );
                      }, 1);
                    }),
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
                <FormError error={errors.name?.message} />
              </div>
              <h2 className="form-h2 px-3 pt-3">Type of Accommodation</h2>
              <div className="ml-5 flex flex-col justify-evenly gap-4 px-5 pt-2 sm:ml-0 sm:flex-row">
                {tagCheckbox(
                  ["Dormitory", "Apartment", "Hotel", "Transient", "Bedspace"],
                  oldData?.typeArray,
                  register,
                )}
              </div>
              <FormError error={errors.typeArray?.message} />
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
                      <option value="1 ACADEMIC YEAR">1 Academic Year</option>
                      <option value="1 SEMESTER">1 Semester</option>
                    </select>
                  </div>
                  <div>
                    <label className="form-h2">FB Page</label>
                    <input
                      className="add-acc-input-text-field"
                      type="text"
                      {...register("fb_page")}
                      defaultValue={oldData?.fb_page ?? ""}
                    ></input>
                    <FormError error={errors.fb_page?.message} />
                  </div>
                </div>
                <div className="form-col-deets">
                  <div className="">
                    <label className="form-h2">Location</label>
                    <select
                      className="form-dropdown shadow shadow-p-black/50"
                      {...register("location")}
                      defaultValue={oldData?.location ?? ""}
                    >
                      <option value="WITHIN UPLB">Within UPLB</option>
                      <option value="OUTSIDE UPLB">Outside UPLB</option>
                    </select>
                  </div>
                  <div>
                    <label className="form-h2">Contact No.</label>
                    <input
                      className={`add-acc-input-text-field w-full ${
                        errors.contact_number ? "input-text-field-error" : ""
                      }`}
                      defaultValue={oldData?.contact_number}
                      type="text"
                      {...register("contact_number")}
                    />
                    <FormError error={errors.contact_number?.message} />
                  </div>
                  <div>
                    <label className="form-h2"> Price of Accommodation</label>
                    <input
                      className={`add-acc-input-text-field w-full ${
                        errors.price ? "input-text-field-error" : ""
                      }`}
                      defaultValue={oldData?.price ?? ""}
                      title="Must be a positive float value."
                      {...register("price", {
                        setValueAs: (value) => String(value),
                      })}
                    />

                    <FormError error={errors.price?.message} />
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
  oldData: Prisma.JsonValue | undefined,
  register: UseFormRegister<z.infer<typeof accommodationEditSchema>>,
) {
  const typearray = stalsDBstringArray(oldData);

  return array.map((value: string) => (
    <div key={value} className="flex flex-row gap-2">
      {typearray.includes(value) ? (
        <input
          id={value}
          type="checkbox"
          value={value}
          defaultChecked
          {...register("typeArray", { required: true })}
        />
      ) : (
        <input
          id={value}
          type="checkbox"
          value={value}
          {...register("typeArray", { required: true })}
        />
      )}

      <label htmlFor={value}>{value}</label>
    </div>
  ));
}
