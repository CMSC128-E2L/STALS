import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

export default function NavBar() {
  return (
    <>
      {/* Navigation bar */}
      <nav className="sticky top-0 mx-auto mb-5 flex flex-wrap items-center justify-between bg-p-dblue p-4">
        {/* Left side */}
        <div className="items-center align-middle">
          <Link href="/homepage" className="flex items-center">
            <img
              src="https://www.pngfind.com/pngs/m/439-4392840_facebook-link-icon-image-dynamic-spectrum-alliance-pink.png"
              className="mr-3 h-12 rounded-3xl"
              alt="STALS Logo"
            />
            <h1 className="self-center text-4xl font-bold text-white">STALS</h1>
          </Link>
        </div>

        {/* Right side */}
        <div className="w-full md:block md:w-auto">
          <ul className="mt-4 flex flex-col items-center p-4 font-medium md:mt-0 md:flex-row md:space-x-8 md:border-0 md:p-0 ">
            <li>
              <input
                className="rounded-2xl px-3 py-1"
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
    signOut({ redirect: false });
    window.location.href = "/login"; // Redirect to login page
  };

  const handleProfileClick = () => {
    window.location.href = "/profile"; // Redirect to profile page
  };

  const handleFavoritesClick = () => {
    window.location.href = "/favorites"; // Redirect to favorites page
  };

  const handleArchiveClick = () => {
    window.location.href = "/archive"; // Redirect to archive page
  };

  return (
    <div className="relative">
      <button
        className="flex items-center justify-center focus:outline-none"
        onClick={toggleDropdown}
      >
        <img
          src={
            sessionData?.user.image ??
            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
          }
          className="h-12 rounded-3xl"
          alt="Profile"
        />
      </button>
      {showDropdown && (
        <div className="absolute right-0 top-14 z-10 rounded-lg bg-white p-4 shadow-lg">
          <p className="mb-2 font-medium">{sessionData.user.name}</p>
          <p className="mb-4 text-gray-500">{sessionData.user.email}</p>
          <button
            className="block w-full py-2 text-left hover:bg-gray-100 focus:outline-none"
            onClick={handleProfileClick}
          >
            Profile
          </button>
          <button
            className="block w-full py-2 text-left hover:bg-gray-100 focus:outline-none"
            onClick={handleFavoritesClick}
          >
            Favorites
          </button>
          <button
            className="block w-full py-2 text-left hover:bg-gray-100 focus:outline-none"
            onClick={handleArchiveClick}
          >
            Archive
          </button>
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
