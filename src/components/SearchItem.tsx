import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import placeholder from "public/images/logo.png";

export const SearchItem: React.FC<{
  id: string;
  name: string;
  price: number | null;
  location: string;
  tags: string;
}> = ({ id, name, price, location, tags }) => {
  const [imgSrc, setImgSrc] = useState(
    `https://stals-worker.p0lbang.workers.dev/${id}.jpg`,
  );

  return (
    // <Link href={`/accommodation/${id}`}>
    //   <div className="relative -z-10 ml-3 mt-3 h-64 w-64 rounded-xl border bg-p-gray">
    //     <Image
    //       src={imgSrc}
    //       alt={name}
    //       fill
    //       className="-z-10 object-contain"
    //       unoptimized
    //       onError={() => {
    //         setImgSrc(placeholder.src);
    //       }}
    //     />
    //     <div className="z-20 text-center">{name}</div>
    //   </div>
    // </Link>

    <Link href={`/accommodation/${id}`}>
      <div className="... m-5 flex h-96 w-96 max-w-sm flex-col items-center rounded-xl shadow-xl transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-p-lblue">
        <div className="relative mb-3 ml-3 mt-3 flex h-64 w-64 items-center justify-center">
          <Image
            src={imgSrc}
            alt={name}
            fill
            className="rounded-xl object-contain"
            unoptimized
            onError={() => {
              setImgSrc(placeholder.src);
            }}
          />
        </div>

        <div className="flex w-full flex-col bg-gray-50 p-4">
          <div className="py-p px-6">
            <div className="mb-2 text-xl font-bold">{name}</div>
            <p className="text-xl">Php {price}</p>
            <p className="mb-4 text-xl">{location}</p>

            {tags !== "" ? (
              <span className="mb-2 mr-2 inline-block rounded-full bg-gray-200 px-3 py-1 text-sm font-semibold text-gray-700">
                {tags}
              </span>
            ) : (
              <span className="bg-gray inline-block"></span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SearchItem;
