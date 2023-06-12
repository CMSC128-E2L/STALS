import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import placeholder from "public/images/stals_purple_logo.png";
import StarRow from "./starRow";
import { api } from "~/utils/api";

export const SearchItem: React.FC<{
  id: string;
  name: string;
  price: string;
  location: string | null;
  type: string[];
  tags: string[];
}> = ({ id, name, price, location, type, tags }) => {
  const [imgSrc, setImgSrc] = useState(
    // `https://stals-worker.p0lbang.workers.dev/${id}.jpg`,
    `https://stals-worker.p0lbang.workers.dev/api/v2/${id}/${id}`,
  );

  const {
    data: accommData,
    isLoading: accommLoading,
    refetch: refetchaccommData,
  } = api.accommodation.getOneRelations.useQuery(id);

  return (
    <div className="m-4 flex justify-center self-stretch">
      <Link href={`/accommodation/${id}`} className="h-full grow">
        <div className="h-full min-w-full grow flex-col items-center rounded-xl border-2 border-solid bg-gray-50 shadow-xl transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-p-lviolet sm:w-72 sm:min-w-[400px]">
          <div className="relative flex aspect-video w-full items-center justify-center overflow-hidden">
            <div className="flex-grow-1 h-full w-full">
              <Image
                src={imgSrc}
                alt={name}
                fill
                className="rounded-t-xl object-cover"
                unoptimized
                onError={() => {
                  setImgSrc(placeholder.src);
                }}
              />
            </div>
          </div>

          <div className="w-full flex-col p-4">
            <div className="py-p px-6 ">
              <div className="mb-2 text-xl font-bold text-p-dviolet">
                {name}
              </div>

              {type &&
                type
                  .filter((type) => type !== "")
                  .map((type, index) => (
                    <span
                      key={index}
                      className="text-md mb-2 mr-2 inline-block font-semibold text-p-dviolet/50"
                    >
                      {type}
                    </span>
                  ))}
              <StarRow
                class="justify-left -ml-0.5 mb-2"
                rating={accommData?.average_rating ?? 0}
              />
              <div className="flex">
                <div className="flex">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-currency-peso -ml-1 mr-1.5 mt-0.5"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke="currentColor"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M8 19v-14h3.5a4.5 4.5 0 1 1 0 9h-3.5"></path>
                    <path d="M18 8h-12"></path>
                    <path d="M18 11h-12"></path>
                  </svg>
                  <p className="text-md font-semibold text-p-black">
                    {priceCommas(price)}
                  </p>
                </div>
                <div className="ml-4 flex">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-map-pin mr-1.5 mt-0.5"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke="currentColor"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M9 11a3 3 0 1 0 6 0a3 3 0 0 0 -6 0"></path>
                    <path d="M17.657 16.657l-4.243 4.243a2 2 0 0 1 -2.827 0l-4.244 -4.243a8 8 0 1 1 11.314 0z"></path>
                  </svg>
                  <p className="text-md mb-4 font-semibold text-p-black">
                    {location}
                  </p>
                </div>
              </div>
            </div>
            <div className="w-full pl-5">
              <span className="object-contain">
                {tags &&
                  tags
                    .filter((tag) => tag !== "")
                    .splice(0, 5)
                    .map((tag, index) => (
                      <span
                        key={index}
                        className="mb-2 mr-2 inline-block rounded-full bg-p-lviolet px-3 py-1 text-center text-sm font-semibold text-gray-700 shadow shadow-p-vdviolet/30"
                      >
                        {tag}
                      </span>
                    ))}
                {tags && tags.length > 5 && (
                  <span className="mb-2 mr-2 inline-block rounded-full bg-p-lviolet px-3 py-1 text-center text-sm font-semibold text-gray-700 shadow shadow-p-vdviolet/30">
                    {tags.length - 5} more..
                  </span>
                )}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

function priceCommas(x: string) {
  const pattern = /(-?\d+)(\d{3})/;
  while (pattern.test(x)) x = x.replace(pattern, "$1,$2");
  return x;
}

export default SearchItem;
