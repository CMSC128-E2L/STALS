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
import { useSession } from "next-auth/react";

export default function HomePage() {
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

  const sortTypes = [
    { id: "NONE", value: "NONE", label: "None" },
    { id: "NAME", value: "NAME", label: "Name" },
    { id: "PRICE", value: "PRICE", label: "Price" },
    { id: "RATING", value: "RATING", label: "Rating" },
  ];

  const [selectedAccomType, setSelectedAccomType] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");
  const [selectedSort, setSelectedSort] = useState("");

  const [showTypeDropdown, setTypeDropdown] = useState(true);
  const [showPriceDropdown, setPriceDropdown] = useState(true);
  const [showSortDropdown, setSortDropdown] = useState(true);

  const toggleTypeDropdown = () => {
    setTypeDropdown((prevState) => !prevState);
  };
  const togglePriceDropdown = () => {
    setPriceDropdown((prevState) => !prevState);
  };
  const toggleSortDropdown = () => {
    setSortDropdown((prevState) => !prevState);
  };

  const [userInputs, setUserInputs] = useState<
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
    is_archived: false,
    sortByName: false,
    sortByRating: false,
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

  const DownloadPDFButton: React.FC = () => {
    const { data: sessionData } = useSession();
    if (sessionData) {
      return (
        <div
          className="button-style flex text-sm"
          onClick={() => {
            setpdfdownload(true);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-download ml-3 mr-1"
            width="20"
            height="18"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2"></path>
            <path d="M7 11l5 5l5 -5"></path>
            <path d="M12 4l0 12"></path>
          </svg>
          Download PDF
        </div>
      );
    } else {
      return <></>;
    }
  };

  // pdf download logic
  const calledOnce = useRef(false);
  const [pdfdownload, setpdfdownload] = useState(false);
  const pdf = new jsPDF();
  // hack needs the useRef in order to not trigger 2 times per download pdf.
  useEffect(() => {
    if (calledOnce.current) {
      calledOnce.current = false;
      return;
    }
    const info: (string | number)[][] = [];
    const filters: { [key: string]: string | any } = {
      location: userInputs.barangay ? userInputs.barangay : "All Locations",
      accomType: userInputs.typeArray?.length
        ? userInputs.typeArray.join(", ")
        : "All Types",
      priceRange:
        getPriceRangeLabel(userInputs.price_min, userInputs.price_max) ||
        "All Prices",
    };

    if (pdfdownload) {
      calledOnce.current = true;
      setpdfdownload(false);

      accommodationEntries?.pages.map((page, nyom: number) => {
        page?.items?.map((i) => {
          info.push([
            i.name,
            i.address ?? "",
            `${i.landlordUser.first_name ?? ""}  ${
              i.landlordUser.last_name ?? ""
            }`,
            i.contact_number,
            i.num_of_rooms,
          ]);
        });
      });
    }

    autoTable(pdf, {
      head: [["Filter", "Value"]],
      body: [
        ["Location", filters.location],
        ["Type", filters.accomType],
        ["Price Range", filters.priceRange],
      ],
      didDrawPage: function (data) {
        // Page Header
        pdf.setFillColor(29, 93, 154);
        pdf.rect(10, 10, pdf.internal.pageSize.width - 20, 15, "F");
        pdf.setFont("helvetica", "bold");
        pdf.setFontSize(18);
        pdf.setTextColor(255, 255, 255);
        const textX = 20;
        const textY = 20;
        pdf.text("STALS", textX, textY);
      },
      margin: { top: 30 },
      columnStyles: { 0: { cellWidth: 30 } },
    });

    autoTable(pdf, {
      head: [["Name", "Address", "Landlord", "Contact", "Rooms"]],
      body: info,

      didDrawPage: function (data) {
        const pageCount = pdf.getNumberOfPages();
        const footerStr = `Page ${data.pageNumber} of ${pageCount}`;

        pdf.setFontSize(10);
        pdf.setTextColor(0, 0, 0);
        pdf.text(
          footerStr,
          data.settings.margin.left,
          pdf.internal.pageSize.height - 10,
        );
      },
      columnStyles: {
        0: { cellWidth: 30 },
        1: { cellWidth: 60 },
        2: { cellWidth: 40 },
      },
    });
    if (calledOnce.current) pdf.save("STALS.pdf");
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

  function getPriceRangeLabel(
    min: number | undefined,
    max: number | undefined,
  ): string {
    if (min === undefined && max === undefined) {
      return "";
    } else if (min === undefined) {
      return `Up to P${max !== undefined ? max : ""}`; //P${max}
    } else if (max === undefined) {
      return `P${min} and above`;
    } else {
      return `P${min} - P${max}`;
    }
  }

  const handleSortTypeChange = (event: {
    target: { value: string; checked: boolean };
  }) => {
    const { value, checked } = event.target;
    if (checked) {
      switch (value) {
        case "NONE":
          setUserInputs((prevInputs) => ({
            ...prevInputs,
            sortByName: false,
            sortByRating: false,
            sortByPrice: false,
          }));
          break;
        case "NAME":
          setUserInputs((prevInputs) => ({
            ...prevInputs,
            sortByName: true,
            sortByRating: false,
            sortByPrice: false,
          }));
          break;
        case "RATING":
          setUserInputs((prevInputs) => ({
            ...prevInputs,
            sortByName: false,
            sortByRating: true,
            sortByPrice: false,
          }));
          break;
        case "PRICE":
          setUserInputs((prevInputs) => ({
            ...prevInputs,
            sortByName: false,
            sortByRating: false,
            sortByPrice: true,
          }));
          break;
        default:
          break;
      }
    }

    setSelectedSort(event.target.value);
  };

  const handleAccomTypeChange = (event: {
    target: { value: string; checked: boolean };
  }) => {
    const { value, checked } = event.target;
    if (checked) {
      switch (value) {
        case "ALL":
          setUserInputs((prevInputs) => ({
            ...prevInputs,
            type: undefined,
            typeArray: [],
          }));
          break;
        case "APARTMENT":
          setUserInputs((prevInputs) => ({
            ...prevInputs,
            type: "APARTMENT",
            typeArray: ["APARTMENT"],
          }));
          break;
        case "BEDSPACER":
          setUserInputs((prevInputs) => ({
            ...prevInputs,
            type: "BEDSPACER",
            typeArray: ["BEDSPACER"],
          }));
          break;
        case "DORMITORY":
          setUserInputs((prevInputs) => ({
            ...prevInputs,
            type: "DORMITORY",
            typeArray: ["DORMITORY"],
          }));
          break;
        case "HOTEL":
          setUserInputs((prevInputs) => ({
            ...prevInputs,
            type: "HOTEL",
            typeArray: ["HOTEL"],
          }));
          break;
        case "TRANSCIENT":
          setUserInputs((prevInputs) => ({
            ...prevInputs,
            type: "TRANSCIENT",
            typeArray: ["TRANSCIENT"],
          }));
          break;
        default:
          break;
      }
    }

    setSelectedAccomType(event.target.value);
  };
  const handlePriceRangeChange = (event: {
    target: { value: string; checked: boolean };
  }) => {
    const { value, checked } = event.target;

    if (checked) {
      switch (value) {
        case "all":
          setUserInputs((prevInputs) => ({
            ...prevInputs,
            price_min: undefined,
            price_max: undefined,
          }));
          break;
        case "below-1000":
          setUserInputs((prevInputs) => ({
            ...prevInputs,
            price_min: undefined,
            price_max: 1000,
          }));
          break;
        case "one-to-two":
          setUserInputs((prevInputs) => ({
            ...prevInputs,
            price_min: 1001,
            price_max: 2000,
          }));
          break;
        case "two-to-three":
          setUserInputs((prevInputs) => ({
            ...prevInputs,
            price_min: 2001,
            price_max: 3000,
          }));
          break;
        case "three-to-four":
          setUserInputs((prevInputs) => ({
            ...prevInputs,
            price_min: 3001,
            price_max: 4000,
          }));
          break;
        case "above-four":
          setUserInputs((prevInputs) => ({
            ...prevInputs,
            price_min: 4001,
            price_max: undefined,
          }));
          break;
        default:
          break;
      }
    }

    setSelectedPrice(event.target.value);
  };

  function AccommodationsList({
    control,
  }: {
    control: Control<z.infer<typeof accommodationGetManyExperiementSchema>>;
  }) {
    useWatch({ control });

    return (
      <div className="grow">
        <div className="flex flex-col sm:flex-row sm:flex-wrap">
          {accommodationEntries ? (
            accommodationEntries?.pages.map((page, i: number) => (
              <SearchAccoms key={i} items={page?.items} />
            ))
          ) : (
            <div className="flex h-screen grow items-center justify-center overflow-y-hidden">
              <LoadingSpinner />
            </div>
          )}
        </div>
        {isFetchingNextPage ? (
          <div className="">
            <LoadingSpinner />
          </div>
        ) : hasNextPage ? (
          <div className="w-full text-center">
            <button
              className="button-style m-5 w-[50%]"
              onClick={() => {
                void fetchNextPage();
                // eslint-disable-next-line
                setUserInputs((prevInputs: any) => ({
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

  const [toggleSidebar, setToggleSidebar] = useState(true);

  function handleSidebarChange() {
    setToggleSidebar(!toggleSidebar);
    // alert(toggleSidebar);
  }
  // setToggleSidebar

  return (
    <div>
      <form
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onSubmit={handleSubmit(
          (d: z.infer<typeof accommodationGetManyExperiementSchema>) => {
            setUserInputs((prevState) => ({
              ...prevState,
              ...d,
            }));
            void refetchAccoms();
          },
        )}
      >
        <NavBar register={register} name={"name"} />

        {/* Sidebar */}
        <div className="flex flex-col sm:flex-row">
          <div className="mr-20 flex sm:sticky sm:top-16 sm:h-[100vh] sm:w-[210px] sm:min-w-[210px]">
            {toggleSidebar && (
              <aside className="overflow-scroll bg-p-lviolet px-5 py-2">
                {/* Location */}
                <div className="mb-1">
                  <h2 className="filter-header">Location</h2>
                  <Location setUserInputs={setUserInputs} methods={methods} />
                </div>
                {/* Accommodation Type */}
                <button className="filter-header" onClick={toggleTypeDropdown}>
                  Type
                  <div className="mr-2"></div>
                  <svg
                    className={`h-5 w-5 ${
                      showTypeDropdown ? "" : "rotate-[-90deg]"
                    }  duration-250 transition-transform`}
                    aria-hidden="true"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 9l-7 7-7-7"
                    ></path>
                  </svg>
                </button>
                {showTypeDropdown && (
                  <div>
                    {accomTypes.map((range, index) => (
                      <div
                        className="mb-1 mt-2 flex items-center"
                        key={range.id}
                      >
                        <input
                          id={range.id}
                          type="radio"
                          name="accom_type"
                          value={range.value}
                          onChange={handleAccomTypeChange}
                          className="filter-radio inline-block"
                          checked={range.value === selectedAccomType}
                        />
                        <label htmlFor={range.id} className="filter-text">
                          {range.label}
                        </label>
                      </div>
                    ))}
                  </div>
                )}
                {/* Price Range */}
                <button className="filter-header" onClick={togglePriceDropdown}>
                  Price Range
                  <div className="mr-2"></div>
                  <svg
                    className={`h-5 w-5 ${
                      showPriceDropdown ? "" : "rotate-[-90deg]"
                    }  duration-250 transition-transform`}
                    aria-hidden="true"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 9l-7 7-7-7"
                    ></path>
                  </svg>
                </button>
                {showPriceDropdown && (
                  <div>
                    {priceRanges.map((range, index) => (
                      <div
                        className="mb-1 mt-2 flex items-center"
                        key={range.id}
                      >
                        <input
                          id={range.id}
                          type="radio"
                          name="price_range"
                          value={range.value}
                          onChange={handlePriceRangeChange}
                          className="filter-radio inline-block"
                          checked={range.value === selectedPrice}
                        />
                        <label htmlFor={range.id} className="filter-text">
                          {range.label}
                        </label>
                      </div>
                    ))}
                  </div>
                )}
                <button className="filter-header" onClick={toggleSortDropdown}>
                  Sort By
                  <div className="mr-2"></div>
                  <svg
                    className={`h-5 w-5 ${
                      showSortDropdown ? "" : "rotate-[-90deg]"
                    }  duration-250 transition-transform`}
                    aria-hidden="true"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 9l-7 7-7-7"
                    ></path>
                  </svg>
                </button>
                {showSortDropdown && (
                  <div>
                    {sortTypes.map((range, index) => (
                      <div
                        className="mb-1 mt-2 flex items-center"
                        key={range.id}
                      >
                        <input
                          id={range.id}
                          type="radio"
                          name="sort"
                          value={range.value}
                          onChange={handleSortTypeChange}
                          checked={range.value === selectedSort}
                          className="filter-radio inline-block"
                        />
                        <label htmlFor={range.id} className="filter-text">
                          {range.label}
                        </label>
                      </div>
                    ))}
                  </div>
                )}

                {/* Include */}
                {/* <div className="mb-4">
                  <h2 className="filter-header">Include</h2>
                  <input
                    className="filter-search"
                    placeholder="Type for suggestions..."
                  ></input>
                </div> */}
                {/* Button will not show up for guests */}
                <div className="mt-3">
                  <DownloadPDFButton />
                </div>
              </aside>
            )}
            <div onClick={handleSidebarChange}>Click Me</div>
          </div>
          {/* fixed top-16  w-[210px] min-w-[210px] flex-col overflow-scroll  */}
          <AccommodationsList control={control} />
        </div>
      </form>
    </div>
  );
}

// Sidebar Functions
// eslint-disable-next-line
const Location: React.FC<{
  setUserInputs: any;
  methods: UseInfiniteQueryResult<any, any>;
}> = ({ setUserInputs, methods }) => {
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
    setUserInputs((prevInputs: any) => ({
      ...prevInputs,
      barangay,
    }));
    // eslint-disable-next-line
    void methods.refetch();
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
          className="filter-search text-p-dviolet"
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
        {items?.map(({ id, name, price, barangay, tags }) => (
          <SearchItem
            key={id + name}
            id={id}
            name={name}
            price={price}
            location={barangay}
            tags={tags}
          />
        ))}
      </>
    );
  }

  // waiting for query output
  return (
    <div className="flex h-screen grow items-center justify-center overflow-y-hidden">
      <div>No search result</div>
    </div>
  );
};
