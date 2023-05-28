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
  const [showDiscardPrompt, setShowDiscardPrompt] = useState(false);
  const [isChanged, seIsChanged] = useState(false);

  const handleCancel = () => {
    if (isChanged) {
      setShowDiscardPrompt(true);
    } else {
      window.location.replace("/profile");
    }
  };

  return (
    <div>
      <NavBar />
      <div className="h-fullscreen">
        <img
          className="fixed h-auto w-screen bg-cover bg-fixed bg-center"
          src={bgpic.src}
          alt="background"
        />
        <div className="fixed inset-x-0 top-0 flex h-screen items-center justify-center">
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
                  <button className="group relative flex w-full justify-center rounded-full bg-p-dblue px-4 py-2 text-white shadow shadow-gray-400/100">
                    Save changes
                  </button>
                </div>
                <div>
                  <button
                    className="group relative flex w-full justify-center rounded-full bg-slate-500 px-4 py-2 text-white shadow shadow-gray-400/100"
                    onClick={handleCancel}
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
              className="mt-2 flex w-full justify-center rounded-3xl border-2 border-red-600 p-2 text-red-600 shadow-lg"
            >
              <button
                className="w-full "
                onClick={() => setShowDeacPrompt(true)}
              >
                Deactivate Account
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
          />
        )}
        {showDeacPrompt && (
          <ConfirmationPrompt
            onConfirm={() => {
              void deleteProfile.mutate();
            }}
            onCancel={() => setShowDeacPrompt(false)}
            message="Are you sure you want to delete this account?"
          />
        )}
      </div>
    </div>
  );
};

export default EditProfile;
