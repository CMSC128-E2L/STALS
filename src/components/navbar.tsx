import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import logo from "public/images/logo.png";
import user from "public/images/def_user.png";
import Image from "next/image";
import { type FieldValues, type UseFormRegister } from "react-hook-form";

interface NavBarProps {
  register?: UseFormRegister<FieldValues>;
  name?: string;
}

export const NavBar: React.FC<NavBarProps> = ({ register, name }) => {
  return (
    <>
      {/* Navigation bar */}
      <nav className="fixed top-0 z-50 flex w-full flex-wrap items-center justify-between bg-p-dblue p-4 py-1">
        {/* Left side */}
        <div className="flex space-x-0">
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
                  <button className="rounded-r-full bg-p-dblue py-2 pl-2 pr-3 text-white outline outline-1 outline-white hover:bg-p-rblue">
                    <svg
                      className="h-6 w-6 pb-0.5"
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
    const { data: sessionData } = useSession();

    if (sessionData) {
      return (
        <Link href={"/profile"} className="dropdown-buttons">
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
    const { data: sessionData } = useSession();

    if (sessionData) {
      return (
        <div className="profile-dropdown">
          <UserInfo />
          <hr className="my-2 h-px border-0 bg-gray-200 dark:bg-gray-700"></hr>
          <Link className="dropdown-buttons" href={"/accommodation/management"}>
            My Accommodations
          </Link>
          <Link className="dropdown-buttons" href={"/accommodation/management"}>
            My Archive
          </Link>
          <button className="dropdown-buttons" onClick={handleLogout}>
            Sign Out
          </button>
        </div>
      );
    } else {
      return (
        <div className="profile-dropdown">
          <UserInfo />
          <hr className="my-2 h-px border-0 bg-gray-200 dark:bg-gray-700"></hr>
          <Link className="dropdown-buttons" href={"/login"}>
            Sign In
          </Link>
          <Link className="dropdown-buttons" href={"/login"}>
            Sign Up
          </Link>
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
