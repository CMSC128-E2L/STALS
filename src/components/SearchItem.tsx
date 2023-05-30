import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import placeholder from "public/images/logo d-violet.png";

export const SearchItem: React.FC<{
  id: string;
  name: string;
  price: number | null;
  location: string | null;
  tags: string;
}> = ({ id, name, price, location, tags }) => {
  const [imgSrc, setImgSrc] = useState(
    // `https://stals-worker.p0lbang.workers.dev/${id}.jpg`,
    `https://stals-worker.p0lbang.workers.dev/api/v2/${id}/${id}`,
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
      <div className="... m-5 flex max-w-sm flex-col items-center rounded-xl border-2 border-solid bg-white shadow-xl transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-p-lviolet sm:h-96 sm:w-96">
        <div className="relative m-3 flex h-64 w-64 items-center justify-center">
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
              <span className="mb-2 mr-2 inline-block rounded-full bg-p-lviolet px-3 py-1 text-sm font-semibold text-gray-700">
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
