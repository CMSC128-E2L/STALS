import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import logo from "public/images/logo.png";
import user from "public/images/def_user.png";
import Image from "next/image";
import { type FieldValues, type UseFormRegister } from "react-hook-form";
import { useRouter } from "next/router";

interface NavBarProps {
  register?: UseFormRegister<FieldValues>;
  name?: string;
  showBack?: boolean;
}

export const NavBar: React.FC<NavBarProps> = ({ register, name, showBack }) => {
  const router = useRouter();
  return (
    <>
      {/* Navigation bar */}
      <nav className="sticky top-0 z-50 flex w-full flex-wrap items-center justify-between bg-p-dblue p-4 py-1">
        {/* Left side */}
        <div className="flex space-x-0">
          {/* div button hack again */}
          {showBack && (
            <div
              className="flex cursor-pointer items-center"
              onClick={() => {
                router.back();
              }}
            >
              <div className="relative h-10 w-10">
                <svg
                  aria-hidden="true"
                  fill="none"
                  stroke="white"
                  stroke-width="1.5"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.25 9l-3 3m0 0l3 3m-3-3h7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                </svg>
              </div>
            </div>
          )}
          <Link href="/homepage" className="flex items-center">
            <div className="relative h-[3.5rem] w-[3.5rem]">
              <Image
                src={logo.src}
                className="rounded-3xl object-contain py-2"
                alt="STALS Logo"
                fill
              />
            </div>
            <h1 className="mb-0.5 px-1 py-0 text-3xl font-bold text-white">
              STALS
            </h1>
          </Link>
        </div>

        {/* Right side */}
        <div className="w-full md:block md:w-auto">
          <ul className="mr-2 mt-4 flex flex-col items-center p-4 font-medium md:mt-0 md:flex-row md:space-x-5 md:border-0 md:p-0">
            <li>
              {register && name ? (
                <div className="flex items-center">
                  <input
                    {...register(name)}
                    type="text"
                    placeholder="Search accommodations..."
                    className="rounded-l-full px-4 py-2 outline outline-1 outline-white"
                  />
                  <button className="rounded-r-full bg-white py-2 pl-2 pr-3 text-white outline outline-1 outline-white">
                    <svg
                      className="h-6 w-6 pb-0.5 text-p-dgray hover:text-p-rblue"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="11" cy="11" r="8" />
                      <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                  </button>
                </div>
              ) : (
                <div></div>
              )}
            </li>
            <li>
              <ProfileButton />
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

const ProfileButton: React.FC = () => {
  const { data: sessionData } = useSession();
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown((prevState) => !prevState);
  };

  const handleLogout = () => {
    void signOut({
      callbackUrl: "/",
    });
  };

  const UserInfo: React.FC = () => {
    if (sessionData) {
      return (
        <div className="block w-full rounded-lg p-2 text-left">
          <Link href={"/profile"} className="">
            <p className="text-lg font-bold text-p-rblue">
              {`${sessionData?.profile.first_name ?? ""} ${
                sessionData?.profile.middle_name ?? ""
              } ${sessionData?.profile.last_name ?? ""}
            ${sessionData?.profile.Suffix ?? ""}`}
            </p>
            <p className="mb-5 mt-1 overflow-hidden truncate text-sm italic text-gray-400">
              {sessionData?.user.email}
            </p>
          </Link>
        </div>
      );
    } else {
      return (
        <div className="block w-full rounded-lg p-2 text-left">
          <p className="text-lg font-bold text-p-rblue">Guest</p>
          <p className="mb-1 overflow-hidden truncate text-sm italic text-gray-400">
            Unregistered user
          </p>
        </div>
      );
    }
  };

  const UserDropdown: React.FC = () => {
    if (sessionData) {
      return (
        <div className="profile-dropdown">
          <UserInfo />
          <hr className="mb-4 h-px border-0 bg-gray-200 dark:bg-gray-700"></hr>
          <div className="flex flex-col items-stretch gap-2">
            <Link
              className="dropdown-buttons"
              href={"/accommodation/management"}
            >
              My Accommodations
            </Link>
            <Link
              className="dropdown-buttons"
              href={"/accommodation/management"}
            >
              My Archive
            </Link>
            <button
              className="dropdown-buttons text-left"
              onClick={handleLogout}
            >
              Sign Out
            </button>
          </div>
        </div>
      );
    } else {
      return (
        <div className="profile-dropdown">
          <UserInfo />
          <hr className="my-2 h-px border-0 bg-gray-200  dark:bg-gray-700"></hr>
          <div className="flex flex-col items-stretch gap-2">
            <Link className="dropdown-buttons" href={"/login"}>
              Sign In
            </Link>
            <Link className="dropdown-buttons" href={"/login"}>
              Sign Up
            </Link>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="relative">
      <button
        className="relative flex h-[2.5rem] w-[2.5rem] items-center justify-center focus:outline-none"
        onClick={toggleDropdown}
      >
        <Image
          src={sessionData?.user.image ?? user.src}
          className="rounded-full object-cover"
          alt="Profile"
          fill
        />
      </button>
      {showDropdown && <UserDropdown />}
    </div>
  );
};

export default NavBar;
