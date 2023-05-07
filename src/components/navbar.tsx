import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import logo from "public/images/logo.png";
import user from "public/images/def_user.png";

export default function NavBar() {
  return (
    <>
      {/* Navigation bar */}
      <nav className="sticky top-0 mb-5 flex flex-wrap items-center justify-between bg-p-dblue p-4 py-1">
        {/* Left side */}
        <div className="flex space-x-0">
          <Link href="/homepage" className="flex items-center">
            <img
              src={logo.src}
              className="mr-3 h-[3.5rem] rounded-3xl px-0 py-2"
              alt="STALS Logo"
            />
            <h1 className="mb-0.5 px-1 py-0 text-3xl font-bold text-white">
              STALS
            </h1>
          </Link>
        </div>

        {/* Right side */}
        <div className="w-full md:block md:w-auto">
          <ul className="mt-4 flex flex-col items-center p-4 font-medium md:mt-0 md:flex-row md:space-x-5 md:border-0 md:p-0 ">
            <li>
              <input
                className="rounded-full px-3 py-1"
                placeholder="Search"
              ></input>
            </li>
            <li>
              <UserButton />
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

const UserButton: React.FC = () => {
  const { data: sessionData } = useSession();
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown((prevState) => !prevState);
  };

  const handleLogout = () => {
    void signOut();
    window.location.href = "/"; // Redirect to login page
  };

  return (
    <div className="relative">
      <button
        className="flex items-center justify-center focus:outline-none"
        onClick={toggleDropdown}
      >
        <img
          src={sessionData?.user.image ?? user.src}
          className="h-[2.5rem] rounded-full"
          alt="Profile"
        />
      </button>
      {showDropdown && (
        <div className="absolute right-0 top-14 z-10 w-[12rem] rounded-lg bg-white p-5 shadow-lg">
          <p className="mb-2 font-medium">{sessionData?.user.name}</p>
          <p className="mb-4 text-gray-500">{sessionData?.user.email}</p>
          <Link
            className="block w-full py-2 text-left hover:bg-gray-100 focus:outline-none"
            href={"/profile"}
          >
            Profile
          </Link>
          <Link
            className="block w-full py-2 text-left hover:bg-gray-100 focus:outline-none"
            href={"/favorites"}
          >
            Favorites
          </Link>
          <Link
            className="block w-full py-2 text-left hover:bg-gray-100 focus:outline-none"
            href={"/archive"}
          >
            Archive
          </Link>
          <Link
            className="block w-full py-2 text-left hover:bg-gray-100 focus:outline-none"
            href={"/myAccommodations"}
          >
            My Accommodations
          </Link>
          <button
            className="block w-full py-2 text-left hover:bg-gray-100 focus:outline-none"
            onClick={handleLogout}
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};
