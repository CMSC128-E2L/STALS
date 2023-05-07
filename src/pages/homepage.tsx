/* eslint-disable @next/next/no-img-element */
// import Image from "next/image";
import NavBar from "~/components/navbar";
import SideBar from "~/components/sidebar";
import { api } from "~/utils/api";
import { useState } from "react";
import AccomRow from "~/components/accomRow";

export default function HomePage() {
  return (
    <div>
      <NavBar />

      {/* Content */}
      <div className="mb-5 flex flex-row">
        <SideBar />
        {/* Accommodations List */}
        <div className="flex w-5/6 flex-col p-10">
          {/* List of Accommodations */}
          <AccomRow />
          <div className="mb-10"></div>
          <AccomRow />
          <div className="mb-10"></div>
          <AccomRow />
        </div>
      </div>
    </div>
  );
}
