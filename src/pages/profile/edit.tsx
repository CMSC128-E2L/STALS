import type { NextPage } from "next";
import { RouterInputs, api } from "~/utils/api";
import { signOut, useSession } from "next-auth/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { userEditSchema } from "~/utils/apitypes";
import bgpic from "public/images/bg-05.png";
import Link from "next/link";
import NavBar from "~/components/navbar";

const EditProfile: NextPage = () => {
  const userSession = useSession();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(userEditSchema),
  });

  const editUser = api.user.edit.useMutation({
    onSuccess: () => {
      window.location.replace("/profile");
    },
  });

  const deleteProfile = api.user.delete.useMutation({
    onSuccess: () => {
      void signOut({
        callbackUrl: "/",
      });
    },
  });

  return (
    <div>
      <NavBar />
      <div className="">
        <img
          className="absolute h-screen w-screen bg-cover bg-fixed bg-center"
          src={bgpic.src}
          alt="background"
        />
        <div className="absolute inset-x-0 flex h-screen items-center justify-center">
          <div className="w-fit rounded-xl bg-white px-10 py-10">
            <div className="item-center flex justify-center px-2 pb-0 pt-0 drop-shadow-md">
              <h1 className="text-3xl font-bold text-blue-700">Edit profile</h1>
            </div>

            <div className="flex justify-center pb-6 drop-shadow-md">
              <p className="text-sm italic text-gray-400"></p>
            </div>

            <form
              // eslint-disable-next-line @typescript-eslint/no-misused-promises
              onSubmit={handleSubmit((d) => {
                console.log(d);
                editUser.mutate(d as RouterInputs["user"]["edit"]);
              })}
            >
              <div className="flex flex-col space-y-2.5">
                <div className="w-auto flex-row space-x-[2%]">
                  <input
                    type="text"
                    placeholder="First Name"
                    className="w-[70%] rounded-xl px-2 py-2 shadow shadow-gray-400/100"
                    {...register("first_name")}
                    defaultValue={userSession.data?.profile.first_name || ""}
                    required
                  />
                  <input
                    {...register("middle_name")}
                    type="text"
                    placeholder="M.I."
                    className="w-[28%] rounded-xl px-2 py-2 shadow shadow-gray-400/100"
                    defaultValue={userSession.data?.profile.middle_name || ""}
                  />
                </div>
                <div className="w-auto flex-row space-x-[2%]">
                  <input
                    {...register("last_name")}
                    type="text"
                    placeholder="Last Name"
                    className="w-[70%] rounded-xl px-2 py-2 shadow shadow-gray-400/100"
                    defaultValue={userSession.data?.profile.last_name || ""}
                    required
                  />
                  <input
                    {...register("Suffix")}
                    type="text"
                    placeholder="Suffix"
                    className="w-[28%] rounded-xl px-2 py-2 shadow shadow-gray-400/100"
                  />
                </div>
                <input
                  {...register("username")}
                  type="text"
                  placeholder="Username"
                  className="rounded-xl px-2 py-2 shadow shadow-gray-400/100"
                  defaultValue={userSession.data?.profile.username || ""}
                  required
                />
                {errors.username?.message && (
                  <p>{errors.username?.message as string}</p>
                )}
                <input
                  {...register("contact_number")}
                  type="tel"
                  placeholder="Contact Number"
                  // minlength="8"
                  // max="14"
                  className="rounded-xl px-2 py-2 shadow shadow-gray-400/100"
                  defaultValue={userSession.data?.profile.contact_number || ""}
                  required
                />
                {errors.contact_number?.message && (
                  <p>{errors.contact_number?.message as string}</p>
                )}
                <input
                  {...register("Suffix")}
                  type="text"
                  placeholder="Suffix"
                  className="w-[28%] rounded-xl px-2 py-2 shadow shadow-gray-400/100"
                  defaultValue={userSession.data?.profile.Suffix || ""}
                />
              </div>
<div className="flex hidden justify-center rounded-xl px-2 py-2 shadow shadow-gray-400/100">
                <input
                  type="radio"
                  id="user"
                  value={"USER"}
                  {...register("type")}
                  defaultChecked={userSession.data?.profile.type === "USER"}
                />
                <label className="px-2"> User </label>
                <input
                  type="radio"
                  id="landlord"
                  value={"LANDLORD"}
                  {...register("type")}
                  defaultChecked={userSession.data?.profile.type === "LANDLORD"}
                />
                <label className="px-2"> Landlord </label>
                <br />
              <br />
              <div>
                <div className="py-2">
                  <button className="group relative flex w-full justify-center rounded-full bg-p-dblue px-4 py-2 font-bold text-white shadow shadow-gray-400/100">
                    Save changes
                  </button>
                </div>
                <div>
                  <Link href="/profile">
                    <button className="group relative flex w-full justify-center rounded-full bg-slate-500 px-4 py-2 font-bold text-white shadow shadow-gray-400/100">
                      Cancel
                    </button>
                  </Link>
                </div>
              </div>
            </form>

            <div
              data-modal-target="prompt"
              className="mt-2 flex w-full justify-center rounded-3xl border-2 border-red-600 p-2 text-red-600 shadow-lg"
            >
              <button className="w-full ">Deactivate Account</button>
            </div>
          </div>
        </div>
        {/* <center>
          <div
            id="prompt"
            className="absolute z-50 hidden h-[calc(100%-1rem)] max-h-full overflow-y-auto overflow-x-hidden p-4 backdrop-blur-sm md:inset-0"
          >
            <div className="relative max-h-full w-full max-w-md">
              <div className="relative rounded-lg bg-white shadow dark:bg-gray-700">
                <button
                  type="button"
                  className="absolute right-2.5 top-3 ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-white"
                  data-modal-hide="popup-modal"
                >
                  <svg
                    aria-hidden="true"
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
                <div className="p-6 text-center">
                  <svg
                    aria-hidden="true"
                    className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                  <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                    Are you sure you want to delete this account?
                  </h3>
                  <button
                    onClick={() => {
                      void deleteProfile.mutate();
                    }}
                    data-modal-hide="popup-modal"
                    type="button"
                    className="mr-2 inline-flex items-center rounded-lg bg-red-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 dark:focus:ring-red-800"
                  >
                    Yes, I'm sure
                  </button>
                  <button
                    data-modal-hide="popup-modal"
                    type="button"
                    className="rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-900 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-500 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-600"
                  >
                    No, cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </center> */}
      </div>
    </div>
  );
};

export default EditProfile;
