import { zodResolver } from "@hookform/resolvers/zod";
import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import bgpic from "public/images/bgpic-01.png";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { type RouterInputs, api } from "~/utils/api";
import { redirect } from "next/navigation";

const schema = z.object({
  first_name: z.string().optional(),
  middle_name: z.string().optional(),
  last_name: z.string().optional(),
  contact_number: z.string().optional(),
  username: z.string().optional(),
});

const Signup: NextPage = () => {
  const userSession = useSession();

  useEffect(() => {
    if (userSession.data)
      if (
        userSession.data?.profile.first_name !== undefined &&
        userSession.data?.profile.first_name !== null
      ) {
        window.location.replace("/homepage");
      }
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const editUser = api.user.edit.useMutation({
    onSuccess: () => {
      redirect("/homepage");
    },
  });

  return (
    <div className="">
      <div className="h-100 bg-fix relative w-full bg-white bg-cover bg-center">
        <section>
          <img className="h-full w-full object-cover" src={bgpic.src} />

          <div className="item-center absolute inset-x-0 top-10 flex justify-center p-0 drop-shadow-md">
            <a href="#down" className="text-5xl font-bold text-white">
              Sign Up
            </a>
          </div>

          <div className="item-center absolute inset-x-0 top-20 flex justify-center p-4 drop-shadow-md">
            <a href="#down" className="text-1xl italic text-white">
              Click me to create an account!
            </a>
          </div>
        </section>

        <div className="item-center flex justify-center p-0 drop-shadow-md">
          <h1 className="text-5xl font-bold text-blue-700">Welcome!</h1>
        </div>

        <div className="flex justify-center p-0 drop-shadow-md">
          <p className="text-sm italic text-gray-400">
            Create an account to continue
          </p>
        </div>

        <div className="item center flex justify-center" id="down">
          <div className="w-fit rounded-xl bg-white p-7">
            <form
              // eslint-disable-next-line @typescript-eslint/no-misused-promises
              onSubmit={handleSubmit((d) => {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                editUser.mutate(d as RouterInputs["user"]["edit"]);
              })}
            >
              <div className="flex flex-col space-y-2.5">
                <div className="w-auto flex-row space-x-[2%]">
                  <input
                    type="text"
                    placeholder="First Name"
                    className="w-[60%] rounded-xl px-3 py-3 shadow shadow-gray-400/100"
                    {...register("first_name")}
                    required
                  />
                  <input
                    {...register("middle_name")}
                    type="text"
                    placeholder="Middle Initial"
                    className="w-[38%] rounded-xl px-3 py-3 shadow shadow-gray-400/100"
                  />
                </div>
                <div className="w-auto flex-row space-x-[2%]">
                  <input
                    {...register("last_name")}
                    type="text"
                    placeholder="Last Name"
                    className="w-[60%] rounded-xl px-3 py-3 shadow shadow-gray-400/100"
                    required
                  />
                  <input
                    name="Suffix"
                    type="text"
                    placeholder="Suffix"
                    className="w-[38%] rounded-xl px-3 py-3 shadow shadow-gray-400/100"
                  />
                </div>
                <input
                  {...register("username")}
                  type="text"
                  placeholder="Username"
                  className="rounded-xl px-3 py-3 shadow shadow-gray-400/100"
                  required
                />
                <input
                  {...register("contact_number")}
                  placeholder="Contact Number"
                  className="rounded-xl px-3 py-3 shadow shadow-gray-400/100"
                  required
                />
              </div>
              <br />
              <div>
                <button className="group relative flex w-full justify-center rounded-md bg-p-dblue px-4 py-2 text-white">
                  Sign up
                </button>
                <br />
                <p className="text-center text-sm text-gray-400">
                  Already have an account?{" "}
                  <a href="login" className="text-cyan-500 underline">
                    Login
                  </a>
                  .
                </p>
                <p className="text-center text-sm text-gray-400">
                  {" "}
                  <a href="homepage" className="text-cyan-500">
                    Continue as Guest
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
