import type { NextPage } from "next";
import { signOut, useSession } from "next-auth/react";
import bgpic from "public/images/signup_bg.png";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { type RouterInputs, api } from "~/utils/api";
import { userEditSchema } from "~/utils/apitypes";
import { useEffect, useState } from "react";
import LoadingSpinner from "~/components/loadingSpinner";
import TermsCondition from "~/components/termsAgreement";
import { z } from "zod";
import NavBar from "~/components/navbar";

const Signup: NextPage = () => {
  const userSession = useSession({ required: true });
  const [checkingUser, setCheckingUser] = useState(true);
  const [showTerms, setShowTerms] = useState(false);

  const [toggleValue, setToggleValue] = useState("USER");

  useEffect(() => {
    if (userSession.status === "authenticated")
      if (
        userSession.data?.profile.first_name !== undefined &&
        userSession.data?.profile.first_name !== null
      ) {
        console.log("sign up completed");
        window.location.replace("/homepage");
      } else {
        console.log("not yet sign up");
        setCheckingUser(false);
      }
  }, [userSession.data, userSession.status]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<z.infer<typeof userEditSchema>>({
    resolver: zodResolver(userEditSchema),
    defaultValues: {
      type: "USER",
    },
  });

  const editUser = api.user.edit.useMutation({
    onSuccess: () => {
      window.location.replace("/homepage");
    },
  });

  const handleToggleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.checked ? "LANDLORD" : "USER";
    setValue("type", newValue);
    setToggleValue(newValue);
  };

  if (checkingUser) {
    return <LoadingSpinner />;
  }

  return (
    <div className="">
      <img className="site-background" src={bgpic.src} alt="background" />
      <div className="top-10 flex min-h-[80vh] items-center justify-center pb-5">
        <div className="w-fit rounded-xl bg-white px-10 py-10">
          <div className="item-center flex justify-center px-2 pb-0 pt-0 drop-shadow-md">
            <h1 className="text-5xl font-extrabold text-p-dbviolet">
              Welcome!
            </h1>
          </div>

          <div className="flex justify-center pb-6 drop-shadow-md">
            <p className="text-sm italic text-gray-400">
              Create an account to get started
            </p>
          </div>

          {showTerms && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="rounded-xl bg-white p-8">
                <TermsCondition />
                <div
                  className="mt-4 rounded bg-p-dbviolet px-4 py-2 text-center font-semibold text-white hover:bg-p-pviolet/80"
                  onClick={() => setShowTerms(false)}
                >
                  Close
                </div>
              </div>
            </div>
          )}

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
                  required
                />
                <input
                  {...register("middle_name")}
                  type="text"
                  placeholder="M.I."
                  className="w-[28%] rounded-xl px-2 py-2 shadow shadow-gray-400/100"
                />
              </div>
              <div className="w-auto flex-row space-x-[2%]">
                <input
                  {...register("last_name")}
                  type="text"
                  placeholder="Last Name"
                  className="w-[70%] rounded-xl px-2 py-2 shadow shadow-gray-400/100"
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
                {...register("contact_number")}
                type="tel"
                placeholder="Contact Number"
                // minlength="8"
                // max="14"
                className="rounded-xl px-2 py-2 shadow shadow-gray-400/100"
                required
              />
              {errors.contact_number?.message && (
                <p>{errors.contact_number?.message}</p>
              )}

              <div className="flex justify-center rounded-xl px-2 py-2 text-base">
                <label className="inline-flex cursor-pointer items-center rounded-md p-0 dark:text-gray-800">
                  <input
                    type="checkbox"
                    className="peer hidden"
                    checked={toggleValue === "LANDLORD"}
                    value={toggleValue === "LANDLORD" ? "LANDLORD" : "USER"}
                    {...register("type")}
                    onChange={handleToggleChange}
                  />
                  <span
                    className={`rounded-l-md px-5 py-1 ${
                      toggleValue === "USER"
                        ? "bg-p-dbviolet font-bold text-white"
                        : "bg-gray-200 text-black"
                    }`}
                  >
                    User
                  </span>
                  <span
                    className={`rounded-r-md px-4 py-1 ${
                      toggleValue === "LANDLORD"
                        ? "bg-p-dbviolet font-bold text-white"
                        : "bg-gray-200 text-black"
                    }`}
                  >
                    Landlord
                  </span>
                </label>

                {/* <ToggleSwitch/> */}
              </div>

              <div className="flex justify-center">
                <input type="checkbox" required></input>

                <label className="pl-3 text-sm text-gray-500 ">
                  I have reviewed and agreed to the
                </label>
                <div
                  className=" cursor-pointer pl-1 text-sm text-gray-500 underline"
                  onClick={() => setShowTerms(true)}
                >
                  Terms and Conditions
                </div>
              </div>
            </div>
            <br />
            <div>
              <div className="py-2">
                <button className="group flex w-full justify-center rounded-full bg-p-dbviolet px-4 py-2 font-bold text-white shadow shadow-gray-400/100">
                  Sign up
                </button>
              </div>
              <div>
                <button
                  onClick={() => void signOut()}
                  className="group flex w-full justify-center rounded-full bg-slate-500 px-4 py-2 font-bold text-white shadow shadow-gray-400/100"
                >
                  Continue as guest
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
