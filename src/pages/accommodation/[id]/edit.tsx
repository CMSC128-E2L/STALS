import NavBar from "~/components/navbar";
import { useRouter } from "next/router";
import { dynamicRouteID, notAuthenticated } from "~/utils/helpers";
import { accommodationEditSchema } from "~/utils/apitypes";
import { UseFormRegister, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type RouterInputs, api } from "~/utils/api";
import bgpic from "public/images/background_addaccom.png";
import toast from "react-hot-toast";
import Link from "next/link";
import { useSession } from "next-auth/react";
import LoadingSpinner from "~/components/loadingSpinner";
import Error404 from "~/pages/404";
import Error from "~/pages/_error";
import UploadImageHeader, {
  UploadImageMultiple,
} from "~/components/uploadInput";
import { z } from "zod";

export default function EditAccommodation() {
  const userSession = useSession({ required: true });
  const { id } = dynamicRouteID(useRouter());
  const router = useRouter();

  const { data: accommData, isLoading: accommLoading } =
    api.accommodation.getOneRelations.useQuery(id);

  const { data: oldData, isLoading: oldDataLoading } =
    api.accommodation.getOne.useQuery(id);

  //console.log(oldData)
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm({
    resolver: zodResolver(accommodationEditSchema),
    // defaultValues:{
    //   id: id,
    //   //price: undefined
    // }
  });

  const editAccommodation = api.accommodation.edit.useMutation();

  if (notAuthenticated(userSession.status) || accommLoading) {
    return <LoadingSpinner />;
  }

  if (accommData === null) {
    return Error404();
  }

  if (accommData?.landlord !== userSession.data?.user.id) {
    return <Error statusCode={401} />;
  }

  return (
    <div className="overflow-visible">
      <img
        className="absolute bg-cover object-fill"
        src={bgpic.src}
        alt="background"
      />
      <NavBar />
      <div className="overflow-scroll py-10">
        <div className="absolute inset-x-0 flex items-center justify-center ">
          <div className="shadow-md/50 my-10 flex w-[55%] flex-col items-center justify-center  gap-1 rounded-md bg-white/70 p-3 shadow ">
            <div>
              <h1 className="form-h1">Edit Accommodation</h1>
            </div>
            <form
              // eslint-disable-next-line @typescript-eslint/no-misused-promises
              onSubmit={handleSubmit(
                (d) => {
                  // console.log(d);
                  const obj = { id };
                  d.id = obj.id;
                  for (const key in d) {
                    if (d[key] === "") {
                      delete d[key];
                    }
                  }
                  // console.log(d`
                  editAccommodation.mutate(
                    d as RouterInputs["accommodation"]["edit"],
                  );
                  toast.success("Successfully Edited Accommodation!", {
                    position: "bottom-right",
                    duration: 1000,
                  });
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
                    className="add-acc-input-text-field text-xl"
                    placeholder={oldData?.name}
                    type="text"
                    {...register("name")}
                  ></input>
                </div>
              </div>
              <h2 className="form-h2 px-3 pt-3">Type of Accommodation</h2>
              <div className="flex flex-row justify-evenly gap-4 px-5 pt-2">
                {tagCheckbox([
                  "Dormitory",
                  "Apartment",
                  "Hotel",
                  "Transient",
                  "Bedspace",
                ])}
              </div>
              <div className="grid grid-cols-2 gap-2 object-contain">
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
                      // placeholder={oldData?.contract_length!}
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
                      // placeholder={oldData?.fb_page!}
                    ></input>
                  </div>
                </div>
                <div className="form-col-deets">
                  <div className="">
                    <label className="form-h2">Location</label>
                    <select
                      className="form-dropdown shadow shadow-p-black/50"
                      {...register("location")}
                      placeholder={oldData?.location}
                    >
                      <option selected disabled hidden>
                        {oldData?.location}
                      </option>
                      <option>Within UPLB</option>
                      <option>Outside UPLB</option>
                    </select>
                  </div>
                  <div className="">
                    <label className="form-h2">Contact No.</label>
                    <input
                      className="add-acc-input-text-field"
                      placeholder={oldData?.contact_number}
                      pattern="^(09|\+639)[0-9]{9}"
                      type="text"
                      {...register("contact_number")}
                    ></input>
                  </div>
                  <div className="">
                    <label className="form-h2"> Price of Accommodation</label>
                    <input
                      className="add-acc-input-text-field"
                      // placeholder={oldData?.price!}
                      pattern="[0-9]+"
                      type="number"
                      //{...register("price", { valueAsNumber: true })}
                    ></input>
                  </div>
                </div>
              </div>
              <div className="py-2">
                <label className="form-h2 ">Edit Tags</label>
                <input
                  className="add-acc-input-text-field"
                  placeholder="Current tags"
                  type="text"
                ></input>
              </div>
              {/* Manage gallery */}
              <div>
                <div className="pb-3 text-center">
                  <label className="form-h3">Manage Gallery</label>
                  <main className="container">
                    <article
                      aria-label="file Upload Modal"
                      className="relative flex h-full flex-col rounded-md shadow-xl"
                    >
                      <section className="flex w-full flex-col gap-3 overflow-auto p-3">
                        <header className="flex flex-col items-center justify-center rounded-md border border-dashed border-p-gray p-12">
                          {/* <p className="mb-3 flex flex-wrap justify-center font-semibold">
                            <span>Drag and drop your</span>&nbsp;
                            <span>files anywhere or</span>
                          </p> */}
                          {/* <input
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
                          </button> */}
                          <p className="mb-3 flex flex-wrap justify-center font-semibold">
                            <span>Accommodation Header</span>
                          </p>
                          <UploadImageHeader
                            // className="focus:shadow-outline mt-2 rounded-sm bg-gray-200 px-3 py-1 hover:bg-gray-300 focus:outline-none"
                            accomId={id}
                          />
                          <p className="mb-3 mt-3 flex flex-wrap justify-center font-semibold">
                            <span>Accommodation Images</span>
                          </p>
                          <UploadImageMultiple accomId={id} />
                        </header>
                        {/* <div>
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
                              <span className="text-small hidden text-gray-500">
                                No files selected
                              </span>
                            </li>
                          </ul>
                        </div> */}
                      </section>
                    </article>
                  </main>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <div>
                  <button
                    type="submit"
                    className="formConfirm"
                    onClick={() => {
                      router.back();
                      setTimeout(() => router.reload(), 50);
                    }}
                  >
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
                    Cancel
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

function tagCheckbox(array: string[]) {
  //for backend
  return array.map((value: string) => (
    <div key={value} className="flex flex-row gap-2">
      <input id={value} type="checkbox" value={value} />
      <label htmlFor={value}>{value}</label>
    </div>
  ));
}
