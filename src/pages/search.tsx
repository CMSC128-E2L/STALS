import NavBar from "~/components/navbar";
import { type RouterOutputs, api } from "~/utils/api";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { type z } from "zod";
import Link from "next/link";
import { accommodationGetManyExperiementSchema } from "~/utils/apitypes";
import { AccommodationType } from "@prisma/client";
import { titleCase } from "~/utils/helpers";
import Image from "next/image";
import placeholder from "public/images/logo.png";

export default function HomePage() {
  const [userInputs, setuserIntpus] = useState<
    z.infer<typeof accommodationGetManyExperiementSchema>
  >({
    name: undefined,
    address: undefined,
    location: undefined,
    landlord: undefined,
    barangay: undefined,
    num_of_rooms: undefined,
    limit: 10,
    cursor: null,
    typeArray: [],
    tagArray: [],
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(accommodationGetManyExperiementSchema),
  });

  const {
    isLoading: queryLoading,
    data: accommodationEntries,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    refetch: refetchAccoms,
  } = api.accommodation.getManyExperiment.useInfiniteQuery(userInputs, {
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });

  // fix this loads hundreds of times
  // const [loadingnext, setloadingnext] = useState(false);
  // useEffect(() => {
  //   setloadingnext(true);
  //   window.addEventListener("scroll", function () {
  //     // TODO: find a better formula
  //     if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
  //       if (!loadingnext)
  //         void fetchNextPage();
  //     }
  //   });
  //   setloadingnext(false);
  // }, [loadingnext]);

  return (
    <>
      <div className="flex h-full flex-row pt-[60px]">
        <form
          className="fixed h-[100%] w-[200px]"
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onSubmit={handleSubmit(
            (d: z.infer<typeof accommodationGetManyExperiementSchema>) => {
              setuserIntpus((prevState) => ({
                ...prevState,
                ...d,
              }));
              void refetchAccoms();
            },
          )}
        >
          <NavBar register={register} name={"name"} />

          {/* Sidebar */}
          {/* Filters */}
          <div className="flex h-[100%] flex-col overflow-y-auto bg-p-lblue p-5">
            {/* Location */}
            <div className="mb-4">
              <h2 className="mb-2 text-base font-bold">Location</h2>
              <Location />
            </div>

            {/* Types */}
            <div className="mb-4">
              <h2 className="mb-2 text-base font-bold">Types</h2>
              {Object.values(AccommodationType).map((val: string) => (
                <div key={val} className="mb-2 flex items-center">
                  <input
                    id={val}
                    type="checkbox"
                    value={val}
                    className="ml-3 h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                    {...register("typeArray")}
                  />
                  <label htmlFor={val} className="filter-text ">
                    {titleCase(val)}
                  </label>
                </div>
              ))}
            </div>
            {/* Price Range */}
            <div className="mb-4">
              <h2 className="mb-2 text-base font-bold">Price Range</h2>
              <div className="mb-2 flex items-center">
                <input
                  id="below-1000"
                  type="checkbox"
                  value=""
                  className="ml-3 h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                />
                <label htmlFor="below-1000" className="filter-text">
                  Below ₱ 1000
                </label>
              </div>

              <div className="mb-2 flex items-center">
                <input
                  id="one-to-two"
                  type="checkbox"
                  value=""
                  className="ml-3  h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                />
                <label htmlFor="one-to-two" className="filter-text">
                  ₱ 1000 – ₱ 2000{" "}
                </label>
              </div>

              <div className="mb-2 flex items-center">
                <input
                  id="two-to-three"
                  type="checkbox"
                  value=""
                  className="ml-3  h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                />
                <label htmlFor="two-to-three" className="filter-text">
                  ₱ 2001 – ₱ 3000{" "}
                </label>
              </div>

              <div className="mb-2 flex items-center">
                <input
                  id="three-to-four"
                  type="checkbox"
                  value=""
                  className="ml-3 h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                />
                <label htmlFor="three-to-four" className="filter-text">
                  ₱ 3001 – ₱ 4000{" "}
                </label>
              </div>

              <div className="flex items-center">
                <input
                  id="above-four"
                  type="checkbox"
                  value=""
                  className="ml-3 h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                />
                <label htmlFor="above-four" className="filter-text">
                  Above ₱ 4001
                </label>
              </div>
            </div>

            {/* Capacity */}
            <div className="mb-4 flex flex-col">
              <h2 className="mb-2 text-base font-bold">Capacity</h2>
              <label className="mb-1">
                <input
                  type="radio"
                  className="form-radio ml-3"
                  name="radio-group"
                  value="option1"
                  defaultChecked
                />
                <span className="filter-text">Solo</span>
              </label>

              <label className="mb-1">
                <input
                  type="radio"
                  className="form-radio ml-3"
                  name="radio-group"
                  value="option1"
                  defaultChecked
                />
                <span className="filter-text">2 Persons</span>
              </label>

              <label className="mb-1">
                <input
                  type="radio"
                  className="form-radio ml-3"
                  name="radio-group"
                  value="option1"
                  defaultChecked
                />
                <span className="filter-text">3 Persons</span>
              </label>

              <label className="mb-1">
                <input
                  type="radio"
                  className="form-radio ml-3"
                  name="radio-group"
                  value="option1"
                  defaultChecked
                />
                <span className="filter-text">4 Persons</span>
              </label>

              <label className="">
                <input
                  type="radio"
                  className="form-radio ml-3"
                  name="radio-group"
                  value="option1"
                  defaultChecked
                />
                <span className="filter-text">More than 4</span>
              </label>
            </div>

            {/* Include */}
            <div className="mb-4">
              <h2 className="mb-2 text-base font-bold">Include</h2>
              <input
                className="filter-search"
                placeholder="Type for suggestions..."
              ></input>
            </div>
            <div className="mt-16"></div>
          </div>
          <div />
        </form>

        {/* Content */}

        {/* Accommodations List */}
        <div className="absolute left-[200px] -z-10">
          {/* <input className="mt-10 ml-10 py-1 outline outline-1 outline-p-dblue" placeholder="Search"/> */}
          <div className="flex flex-row flex-wrap">
            {accommodationEntries &&
              accommodationEntries?.pages.map((page, i: number) => (
                <SearchAccoms key={i} items={page?.items} />
              ))}
          </div>
          <button
            onClick={() => {
              void fetchNextPage();
            }}
            disabled={!hasNextPage || isFetchingNextPage}
          >
            {isFetchingNextPage
              ? "Loading more..."
              : hasNextPage
              ? "Load More"
              : "Nothing more to load"}
          </button>
        </div>
      </div>
    </>
  );
}

// Sidebar Functions

const Location: React.FC = () => {
  // this will be used in the filter button for the location
  const [value, setValue] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const suggestions = [
    "Brgy. Anos",
    "Brgy. Batong Malake",
    "Brgy. Mayondon",
    "Brgy. Putho-Tuntungin",
  ]; //! TODO: this is hardcoded

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value);
    setShowSuggestions(event.target.value !== "");
  }

  function handleSuggestionClick(suggestion: string) {
    setValue(suggestion);
    setShowSuggestions(false);
  }

  return (
    <div className="relative">
      <div>
        <input
          type="text"
          value={value}
          onChange={handleChange}
          className="filter-search"
          placeholder="Type for suggestions..."
        />
        {showSuggestions && (
          <ul className="absolute mt-1 flex w-full flex-col space-y-1 rounded-xl bg-white p-3 text-black shadow-lg dark:bg-white dark:text-black">
            {suggestions
              .filter((suggestion) =>
                suggestion.toLowerCase().includes(value.toLowerCase()),
              )
              .map((suggestion) => (
                <li
                  key={suggestion}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="dropdown-buttons"
                >
                  {highlightMatchedSubstring(suggestion)}
                </li>
              ))}
          </ul>
        )}
      </div>
    </div>
  );

  function highlightMatchedSubstring(suggestion: string) {
    const index = suggestion.toLowerCase().indexOf(value.toLowerCase());
    if (index < 0) return suggestion;
    return (
      <>
        {suggestion.substring(0, index)}
        <span style={{ fontWeight: "bold" }}>
          {suggestion.substring(index, index + value.length)}
        </span>
        {suggestion.substring(index + value.length)}
      </>
    );
  }
};

const SearchAccoms: React.FC<{
  items: RouterOutputs["accommodation"]["getMany"] | undefined;
}> = ({ items }) => {
  if (items && items.length != 0) {
    return (
      <>
        {items?.map(({ id, name }) => (
          <SearchItem key={id + name} id={id} name={name} />
        ))}
      </>
    );
  }

  // waiting for query output
  return (
    <>
      <div className="-z-30 mr-4 mt-4 h-64 w-64 animate-pulse rounded-xl border bg-p-gray"></div>
      <div className="-z-30 mr-4 mt-4 h-64 w-64 animate-pulse rounded-xl border bg-p-gray"></div>
      <div className="-z-30 mr-4 mt-4 h-64 w-64 animate-pulse rounded-xl border bg-p-gray"></div>
      <div className="-z-30 mr-4 mt-4 h-64 w-64 animate-pulse rounded-xl border bg-p-gray"></div>
    </>
  );
};

const SearchItem: React.FC<{ key: string; id: string; name: string }> = ({
  key,
  id,
  name,
}) => {
  const [imgSrc, setImgSrc] = useState(
    `https://stals-worker.p0lbang.workers.dev/${id}.jpg`,
  );

  return (
    <Link key={key} href={`/accommodation/${id}`}>
      <div className="relative -z-10 ml-3 mt-3 h-64 w-64 rounded-xl border bg-p-gray">
        <Image
          src={imgSrc}
          alt={name}
          fill
          className="-z-10 object-contain"
          unoptimized
          onError={() => {
            setImgSrc(placeholder.src);
          }}
        />
        <div className="z-20 text-center">{name}</div>
      </div>
    </Link>
  );
};
