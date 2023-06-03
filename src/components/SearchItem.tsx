import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import placeholder from "public/images/logo d-violet.png";

export const SearchItem: React.FC<{
  id: string;
  name: string;
  price: string;
  location: string | null;
  tags: Array<string>;
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

    <div className="m-4 flex justify-center self-stretch">
      <Link href={`/accommodation/${id}`} className="h-full grow">
        <div className="h-full grow flex-col items-center rounded-xl border-2 border-solid bg-gray-50 shadow-xl transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-p-lviolet sm:w-72">
          <div className="relative flex aspect-video w-full items-center justify-center">
            <Image
              src={imgSrc}
              alt={name}
              fill
              className="rounded-t-xl object-contain pt-3"
              unoptimized
              onError={() => {
                setImgSrc(placeholder.src);
              }}
            />
          </div>

          <div className="w-full flex-col p-4">
            <div className="py-p px-6 ">
              <div className="mb-2 text-xl font-bold">{name}</div>
              <p className="text-xl">Php {price}</p>
              <p className="mb-4 text-xl">{location}</p>
              {/* {tags !== "" ? (
                
              ) : (
                <span className="bg-gray inline-block"></span>
              )} */}
            </div>
            <div className="w-full">
              <span className="object-contain">
                {tags
                  .filter((tag) => tag !== "")
                  .map((tag, index, array) => (
                    <span
                      key={tag}
                      className="mb-2 mr-2 inline-block rounded-full bg-p-lviolet px-3 py-1 text-center text-sm font-semibold text-gray-700 shadow shadow-p-vdviolet/30"
                    >
                      {tag}
                    </span>
                  ))}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default SearchItem;
