import type { NextPage } from "next";
import { RouterInputs, api } from "~/utils/api";
import { signOut, useSession } from "next-auth/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { userEditSchema } from "~/utils/apitypes";
import bgpic from "public/images/bg-05.png";
import NavBar from "~/components/navbar";
import { useState } from "react";
import ConfirmationPrompt from "~/components/prompt";
import GlobalToaster from "~/components/globalToster";
import toast from "react-hot-toast";

const EditProfile: React.FC<{
  onCancel: () => void;
}> = ({ onCancel }) => {
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
      toast.success("Changes saved!", {
        position: "bottom-right",
        duration: 3000,
      });
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

  const [showDeacPrompt, setShowDeacPrompt] = useState(false);
  const [showConfirmDel, setShowConfirmDel] = useState(false);
  const [showDiscardPrompt, setShowDiscardPrompt] = useState(false);
  const [enteredUN, setEnteredUN] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [isChanged, seIsChanged] = useState(false);

  const handleDelete = () => {
    if (enteredUN === userSession.data?.profile.username) {
      void deleteProfile.mutate();
    } else {
      setUsernameError("Username does not match. Please try again.");
    }
  };

  return (
    <div>
      <div className="fixed top-0 z-50 h-auto max-h-screen overflow-x-hidden overflow-y-hidden backdrop-blur-sm md:inset-0 ">
        <div className="fixed inset-x-0 top-0 flex h-screen items-center justify-center drop-shadow-md  ">
          <div className="w-fit rounded-xl bg-white px-10 py-10">
            <div className="item-center flex justify-center px-2 pb-0 pt-0 drop-shadow-md">
              <h1 className="text-3xl font-bold text-blue-700">Edit profile</h1>
            </div>

            <div className="flex justify-center pb-6 drop-shadow-md">
              <p className="text-sm italic text-gray-400"></p>
            </div>

            <form
              // eslint-disable-next-line @typescript-eslint/no-misused-promises
              onSubmit={handleSubmit(
                (d) => {
                  editUser.mutate(d as RouterInputs["user"]["edit"]);
                },
                (error) => {
                  toast.error("Something went wrong. Please try again later.", {
                    position: "bottom-right",
                    duration: 1000,
                  });
                },
              )}
              onChange={() => seIsChanged(true)}
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
                  {...register("type")}
                  type="hidden"
                  defaultValue={userSession.data?.profile.type || ""}
                />
              </div>
              <br />
              <div>
                <div className="py-2">
                  <button className="group relative flex w-full justify-center rounded-full bg-p-dblue px-4 py-2 text-white shadow shadow-gray-400/100 hover:bg-blue-700">
                    Save changes
                  </button>
                </div>
                <div>
                  <button
                    className="group relative flex w-full justify-center rounded-full bg-slate-500 px-4 py-2 text-white shadow shadow-gray-400/100 hover:bg-slate-600"
                    onClick={onCancel}
                    type="button"
                  >
                    Cancel
                  </button>
                </div>
                <GlobalToaster />
              </div>
            </form>

            <div
              data-modal-target="prompt"
              className="mt-2 flex w-full justify-center rounded-3xl border-2 border-red-600 p-2 text-red-600 shadow-lg hover:bg-red-800 hover:text-white"
            >
              <button
                className="w-full "
                onClick={() => setShowDeacPrompt(true)}
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
        {showDiscardPrompt && (
          <ConfirmationPrompt
            onConfirm={() => {
              window.location.replace("/profile");
            }}
            onCancel={() => setShowDiscardPrompt(false)}
            message="Discard changes?"
            submessage="This can’t be undone and you’ll lose your changes. "
          />
        )}

        {/* Delete account confitmation */}
        {showDeacPrompt && (
          <ConfirmationPrompt
            onConfirm={() => {
              setShowConfirmDel(true);
              setShowDeacPrompt(false);
            }}
            onCancel={() => setShowDeacPrompt(false)}
            message="Are you sure you want to delete your account? "
            submessage="This action cannot be undone. Your profile information and other data, including any accommodation listings, reviews, and reports, will be permanently removed from our system and cannot be recovered."
          />
        )}

        {showConfirmDel && (
          <center>
            <div
              id="prompt"
              className="fixed z-50 h-[calc(100%-1rem)] max-h-full overflow-y-auto overflow-x-hidden p-4 backdrop-blur-sm md:inset-0"
            >
              <div className="relative max-h-full w-full max-w-md">
                <div className="relative rounded-lg bg-white shadow dark:bg-gray-700">
                  <button
                    type="button"
                    className="absolute right-2.5 top-3 ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-white"
                    data-modal-hide="popup-modal"
                    onClick={() => {
                      setShowConfirmDel(false);
                      setEnteredUN("");
                      setUsernameError("");
                    }}
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
                    <h3 className="text-white-500 mb-3 text-lg font-normal dark:text-gray-400">
                      Please enter your username to confirm.
                    </h3>
                    <input
                      type="text"
                      className="mb-3 w-full rounded-xl bg-gray-100 px-2 py-2 shadow shadow-gray-400/100"
                      placeholder="Username"
                      value={enteredUN}
                      onChange={(e) => {
                        setEnteredUN(e.target.value);
                        setUsernameError("");
                      }}
                    />
                    {usernameError && (
                      <p className="mb-2 text-red-600">{usernameError}</p>
                    )}
                    <button
                      onClick={handleDelete}
                      data-modal-hide="popup-modal"
                      type="button"
                      className="mt-2 w-full items-center rounded-lg bg-red-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 dark:focus:ring-red-800"
                    >
                      I understand the consequences. Delete my account.
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </center>
        )}
      </div>
    </div>
  );
};

export default EditProfile;
