import Image from "next/image";
import Link from "next/link";
import logo from "public/images/logo.png";
import React from "react";

export default function FooterComponent() {
  return (
    <footer className="bg-p-vdviolet">
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <Link href="../homepage" className="flex items-center">
              <Image src={logo} className="mr-2 h-10 w-10" alt="Stals Logo" />
              <span className="self-center whitespace-nowrap text-2xl font-semibold text-white">
                STALS
              </span>
            </Link>
          </div>
        </div>
        <hr className="my-6 border-gray-200 dark:border-gray-700 sm:mx-auto lg:my-8" />
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-gray-500 dark:text-gray-400 sm:text-center">
            © 2023{" "}
            <Link href="../homepage" className="hover:underline">
              STALS
            </Link>
            . All Rights Reserved.
          </span>
          <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
            <a
              href="#top"
              className="mx-2 font-bold text-white no-underline hover:text-gray-300 hover:underline"
            >
              Back to Top
            </a>
            <Link
              href="../homepage"
              className="mx-2 font-bold text-white no-underline hover:text-gray-300 hover:underline"
            >
              Home
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
