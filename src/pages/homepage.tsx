import NavBar from "~/components/navbar";
import { type RouterOutputs, api } from "~/utils/api";
import { useEffect, useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { type z } from "zod";
import { accommodationGetManyExperiementSchema } from "~/utils/apitypes";
import LoadingSpinner from "~/components/loadingSpinner";
import SearchItem from "~/components/SearchItem";
import { type UseInfiniteQueryResult } from "@tanstack/react-query";
import { useForm, useWatch, type Control } from "react-hook-form";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { Accommodation } from "@prisma/client";

type HandlePriceRangeChangeType = (
  event: React.ChangeEvent<HTMLInputElement>,
) => void;

interface PriceRangeProps {
  handlePriceRangeChange: HandlePriceRangeChangeType;
}

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
    price_min: undefined,
    price_max: undefined,
  });
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(accommodationGetManyExperiementSchema),
  });

  const methods = api.accommodation.getManyExperiment.useInfiniteQuery(
    userInputs,
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    },
  );

  // pdf download logic
  const calledOnce = useRef(false);
  const [pdfdownload, setpdfdownload] = useState(false);
  const pdf = new jsPDF();
  // hack needs the useRef inorder to not trigger 2 times per download pdf.
  useEffect(() => {
    if (calledOnce.current) {
      calledOnce.current = false;
      return;
    }
    const info: (string | number)[][] = [];
    if (pdfdownload) {
      calledOnce.current = true;
      setpdfdownload(false);

      accommodationEntries?.pages.map((page, nyom: number) => {
        page?.items?.map((i: Accommodation) => {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          info.push([
            i.name,
            i.address ?? "",
            i.landlord,
            i.contact_number,
            i.num_of_rooms,
          ]);
        });
      });
    }

    autoTable(pdf, {
      head: [
        [
          "Accommodation Name",
          "Address",
          "Landlord",
          "Contact Number",
          "Rooms",
        ],
      ],
      body: info,
    });
    if (calledOnce.current) pdf.save("output.pdf");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pdfdownload]);

  const {
    isLoading: queryLoading,
    data: accommodationEntries,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    refetch: refetchAccoms,
  } = methods;

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
  const priceRanges = [
    { id: "all", value: "all", label: "All" },
    { id: "below-1000", value: "below-1000", label: "Under ₱ 1001" },
    { id: "one-to-two", value: "one-to-two", label: "₱ 1001 – ₱ 2000" },
    { id: "two-to-three", value: "two-to-three", label: "₱ 2001 – ₱ 3000" },
    { id: "three-to-four", value: "three-to-four", label: "₱ 3001 – ₱ 4000" },
    { id: "above-four", value: "above-four", label: "Above ₱ 4001" },
  ];

  const accomTypes = [
    { id: "ALL", value: "ALL", label: "All" },
    { id: "APARTMENT", value: "APARTMENT", label: "Apartment" },
    { id: "BEDSPACER", value: "BEDSPACER", label: "Bedspacer" },
    { id: "DORMITORY", value: "DORMITORY", label: "Dormitory" },
    { id: "HOTEL", value: "HOTEL", label: "Hotel" },
    { id: "TRANSCIENT", value: "TRANSCIENT", label: "Transcient" },
  ];

  const handleAccomTypeChange = (event: {
    target: { value: string; checked: boolean };
  }) => {
    const { value, checked } = event.target;
    if (checked) {
      switch (value) {
        case "ALL":
          setuserIntpus((prevInputs) => ({
            ...prevInputs,
            type: undefined,
            typeArray: [],
          }));
          break;
        case "APARTMENT":
          setuserIntpus((prevInputs) => ({
            ...prevInputs,
            type: "APARTMENT",
            typeArray: ["APARTMENT"],
          }));
          break;
        case "BEDSPACER":
          setuserIntpus((prevInputs) => ({
            ...prevInputs,
            type: "BEDSPACER",
            typeArray: ["BEDSPACER"],
          }));
          break;
        case "DORMITORY":
          setuserIntpus((prevInputs) => ({
            ...prevInputs,
            type: "DORMITORY",
            typeArray: ["DORMITORY"],
          }));
          break;
        case "HOTEL":
          setuserIntpus((prevInputs) => ({
            ...prevInputs,
            type: "HOTEL",
            typeArray: ["HOTEL"],
          }));
          break;
        case "TRANSCIENT":
          setuserIntpus((prevInputs) => ({
            ...prevInputs,
            type: "TRANSCIENT",
            typeArray: ["TRANSCIENT"],
          }));
          break;
        default:
          break;
      }
    }
  };
  const handlePriceRangeChange = (event: {
    target: { value: string; checked: boolean };
  }) => {
    const { value, checked } = event.target;

    if (checked) {
      switch (value) {
        case "all":
          setuserIntpus((prevInputs) => ({
            ...prevInputs,
            price_min: undefined,
            price_max: undefined,
          }));
          break;
        case "below-1000":
          setuserIntpus((prevInputs) => ({
            ...prevInputs,
            price_min: undefined,
            price_max: 1000,
          }));
          break;
        case "one-to-two":
          setuserIntpus((prevInputs) => ({
            ...prevInputs,
            price_min: 1001,
            price_max: 2000,
          }));
          break;
        case "two-to-three":
          setuserIntpus((prevInputs) => ({
            ...prevInputs,
            price_min: 2001,
            price_max: 3000,
          }));
          break;
        case "three-to-four":
          setuserIntpus((prevInputs) => ({
            ...prevInputs,
            price_min: 3001,
            price_max: 4000,
          }));
          break;
        case "above-four":
          setuserIntpus((prevInputs) => ({
            ...prevInputs,
            price_min: 4001,
            price_max: undefined,
          }));
          break;
        default:
          break;
      }
    }
  };

  function AccommodationsList({
    control,
  }: {
    control: Control<z.infer<typeof accommodationGetManyExperiementSchema>>;
  }) {
    useWatch({ control });

    return (
      <div className="grow">
        <div className="flex flex-row flex-wrap">
          {accommodationEntries ? (
            accommodationEntries?.pages.map((page, i: number) => (
              <SearchAccoms key={i} items={page?.items} />
            ))
          ) : (
            <LoadingSpinner />
          )}
        </div>
        {isFetchingNextPage ? (
          <LoadingSpinner />
        ) : hasNextPage ? (
          <div className="w-full text-center">
            <button
              className="m-5 w-[50%] rounded-xl bg-p-dblue p-3 text-xl text-white"
              onClick={() => {
                void fetchNextPage();
                // eslint-disable-next-line
                setuserIntpus((prevInputs: any) => ({
                  ...prevInputs,
                }));
              }}
              disabled={!hasNextPage || isFetchingNextPage}
            >
              Load More
            </button>
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }

  return (
    <div>
      <form
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
        <div className="flex">
          <div className="flex min-w-[190px] flex-col overflow-y-auto bg-p-lblue p-5">
            {/* Location */}
            <div className="mb-4">
              <h2 className="mb-2 text-base font-bold">Location</h2>
              <Location setuserIntpus={setuserIntpus} methods={methods} />
            </div>
            {/* Accommodation Type */}
            <div className="mb-4">
              <h2 className="mb-2 text-base font-bold">Type</h2>
              {accomTypes.map((range) => (
                <div
                  className="it// eslint-disable-next-lineems-center mb-2 flex"
                  key={range.id}
                >
                  <input
                    id={range.id}
                    type="radio"
                    name="accom_type"
                    value={range.value}
                    onChange={handleAccomTypeChange}
                    className="ml-3 h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                  />
                  <label htmlFor={range.id} className="filter-text">
                    {range.label}
                  </label>
                </div>
              ))}
            </div>
            {/* Price Range */}
            <div className="mb-4">
              <h2 className="mb-2 text-base font-bold">Price Range</h2>
              {priceRanges.map((range) => (
                <div className="mb-2 flex items-center" key={range.id}>
                  <input
                    id={range.id}
                    type="radio"
                    name="price_range"
                    value={range.value}
                    onChange={handlePriceRangeChange}
                    className="ml-3 h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                  />
                  <label htmlFor={range.id} className="filter-text">
                    {range.label}
                  </label>
                </div>
              ))}
            </div>

            {/* Include */}
            <div className="mb-4">
              <h2 className="mb-2 text-base font-bold">Include</h2>
              <input
                className="filter-search"
                placeholder="Type for suggestions..."
              ></input>
            </div>
            {/* should not be a button since the form will assume it is a submit button */}
            {/* hack is to use a div with onClick */}
            <div
              className="text-md cursor-pointer rounded-full bg-p-dblue p-2 text-center text-white"
              onClick={() => {
                setpdfdownload(true);
              }}
            >
              Download Pdf
            </div>
          </div>
          <AccommodationsList control={control} />
        </div>
      </form>
    </div>
  );
}

// Sidebar Functions
// eslint-disable-next-line
const Location: React.FC<{
  setuserIntpus: any;
  methods: UseInfiniteQueryResult<any, any>;
}> = ({ setuserIntpus, methods }) => {
  // this will be used in the filter button for the location
  const [value, setValue] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value);
    setShowSuggestions(event.target.value !== "");
  }

  function handleSuggestionClick(barangay: string) {
    setValue(barangay);
    setShowSuggestions(false);
    // eslint-disable-next-line
    setuserIntpus((prevInputs: any) => ({
      ...prevInputs,
      barangay,
    }));
    // eslint-disable-next-line
    void methods.refetch();
    // alert(barangay);
    // setSelectedBarangay(selectedBarangay);

    // alert(selectedBarangay);
  }

  const { data: barangayEntries } = api.accommodation.getBarangays.useQuery();

  return (
    <div className="relative">
      <div>
        <input
          type="text"
          value={value}
          onChange={handleChange}
          onKeyDown={(evt) => {
            if (evt.key == "Enter") {
              if (barangayEntries && barangayEntries?.length > 0) {
                barangayEntries.reverse().forEach((entry) => {
                  if (
                    entry.barangay &&
                    entry.barangay.toLowerCase().includes(value.toLowerCase())
                  ) {
                    handleSuggestionClick(entry.barangay);
                    console.log("proc");
                    return;
                  }
                });
              }
            }
          }}
          className="filter-search"
          placeholder="Type for suggestions..."
        />
        {showSuggestions && (
          <ul className="absolute mt-1 flex w-full flex-col space-y-1 rounded-xl bg-white p-3 text-black shadow-lg dark:bg-white dark:text-black">
            {barangayEntries
              ?.filter(
                (entry, index) =>
                  entry.barangay &&
                  entry.barangay.toLowerCase().includes(value.toLowerCase()),
              )
              .map((entry, index) => (
                <li
                  key={index}
                  onClick={() =>
                    entry.barangay && handleSuggestionClick(entry.barangay)
                  }
                  className="dropdown-buttons"
                >
                  {entry.barangay && highlightMatchedSubstring(entry.barangay)}
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
        {items?.map(({ id, name, price, location, tags }) => (
          <SearchItem
            key={id + name}
            id={id}
            name={name}
            price={price}
            location={location}
            tags={tags}
          />
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
