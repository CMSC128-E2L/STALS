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
import bgpic from "public/images/background_home.png";
import { stalsDBstringArray, titleCase } from "~/utils/helpers";
import { AccommodationType } from "@prisma/client";

export default function HomePage() {
  const [selectedSort, setSelectedSort] = useState("NONE");
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
    price_min: 0,
    price_max: undefined,
    sortByName: null,
    sortByRating: null,
    sortByPrice: null,
  });
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    getValues,
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
            className="icon icon-tabler icon-tabler-download ml-4 mr-1"
            width="20"
            height="18"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
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
          let roomnum = 0;

          i?.Room.map((room, n) => {
            if (i.is_archived == false) {
              roomnum++;
            }
          });

          info.push([
            i.name,
            `${i?.street_number ?? ""} ${i?.subdivision ?? ""} ${
              i?.barangay ? ` Brgy. ${i?.barangay}` : ""
            }`,
            // i.address ?? "",
            `${i.landlordUser.first_name ?? ""}  ${
              i.landlordUser.last_name ?? ""
            }`,
            i.contact_number,
            roomnum,
          ]);
        });
      });
    }

    const headcolor = {
      fillColor: "#292076",
    };

    autoTable(pdf, {
      head: [["Filter", "Value"]],
      body: [
        ["Location", filters.location],
        ["Type", filters.accomType],
        ["Price Range", filters.priceRange],
      ],
      headStyles: headcolor,
      didDrawPage: function (data) {
        // Page Header
        pdf.setFillColor(32, 4, 68);
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
      headStyles: headcolor,
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
            sortByName: null,
            sortByRating: null,
            sortByPrice: null,
          }));
          break;
        case "NAME-ASC":
          setUserInputs((prevInputs) => ({
            ...prevInputs,
            sortByName: true,
            sortByRating: null,
            sortByPrice: null,
          }));
          break;
        case "NAME-DESC":
          setUserInputs((prevInputs) => ({
            ...prevInputs,
            sortByName: false,
            sortByRating: null,
            sortByPrice: null,
          }));
          break;
        case "RATING-ASC":
          setUserInputs((prevInputs) => ({
            ...prevInputs,
            sortByName: null,
            sortByRating: true,
            sortByPrice: null,
          }));
          break;
        case "RATING-DESC":
          setUserInputs((prevInputs) => ({
            ...prevInputs,
            sortByName: null,
            sortByRating: false,
            sortByPrice: null,
          }));
          break;
        case "PRICE-ASC":
          setUserInputs((prevInputs) => ({
            ...prevInputs,
            sortByName: null,
            sortByRating: null,
            sortByPrice: true,
          }));
          break;
        case "PRICE-DESC":
          setUserInputs((prevInputs) => ({
            ...prevInputs,
            sortByName: null,
            sortByRating: null,
            sortByPrice: false,
          }));
          break;
        default:
          break;
      }
    }

    setSelectedSort(event.target.value);
  };

  function AccommodationsList({
    control,
  }: {
    control: Control<z.infer<typeof accommodationGetManyExperiementSchema>>;
  }) {
    useWatch({ control });

    return (
      <div className="min-h-[80vh] grow">
        <div className="flex flex-col items-stretch justify-center sm:flex-row sm:flex-wrap">
          {accommodationEntries ? (
            accommodationEntries?.pages.map((page, i: number) => (
              <SearchAccoms key={i} items={page?.items} />
            ))
          ) : (
            // <div className="flex h-screen grow items-center justify-center overflow-y-hidden">
            <div className="flex h-screen w-full grow justify-center self-stretch">
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

  const handleSidebarChange = () => {
    setToggleSidebar(!toggleSidebar);
  };

  return (
    <div>
      <img
        className="site-background opacity-30"
        src={bgpic.src}
        alt="background"
      />
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

        <div className={`flex flex-col sm:flex-row`}>
          {/* Sidebar */}
          <div
            className={`flex flex-col transition-all duration-300 sm:sticky sm:top-16 sm:h-[100vh] sm:flex-row ${
              toggleSidebar
                ? "max-h-[10000px] max-w-[10000px]"
                : "max-h-8 sm:max-w-0"
            }`}
          >
            <aside
              className={`overflow-hidden bg-p-lviolet shadow-2xl transition-all duration-300 sm:h-full sm:min-h-full sm:w-[200px] ${
                toggleSidebar
                  ? "max-h-[1000px] max-w-[1000px] px-5 py-3"
                  : "max-h-0 sm:max-w-0"
              }`}
            >
              {/* Location */}
              <div className="mb-1">
                <h2 className="filter-header mb-1">Barangay</h2>
                <Location setUserInputs={setUserInputs} methods={methods} />
              </div>
              <hr className="filter-border"></hr>
              {/* Accommodation Type */}
              <button
                className="filter-header mb-2"
                onClick={toggleTypeDropdown}
              >
                Types
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
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </button>
              {showTypeDropdown && (
                <div>
                  {Object.values(AccommodationType).map((value: string) => (
                    <div key={value} className="flex flex-row">
                      <input
                        id={value}
                        type="checkbox"
                        value={titleCase(value)}
                        {...register("typeArray", {
                          onChange: () => {
                            setUserInputs(
                              (
                                prevInputs: z.infer<
                                  typeof accommodationGetManyExperiementSchema
                                >,
                              ) => ({
                                ...prevInputs,
                                typeArray: getValues("typeArray") as string[],
                              }),
                            );
                          },
                        })}
                      />
                      <label htmlFor={value} className="filter-text my-1">
                        {value[0]}
                        {value.substring(1).toLowerCase()}
                      </label>
                    </div>
                  ))}
                </div>
              )}
              <hr className="filter-border"></hr>
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
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </button>
              {showPriceDropdown && (
                <div>
                  <input
                    id="min-price-slider"
                    type="range"
                    min={0}
                    max={15000}
                    step={1000}
                    value={userInputs.price_min}
                    className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200"
                    onChange={(event) => {
                      const minValue = parseInt(event.target.value);
                      if (minValue <= userInputs.price_max!) {
                        setUserInputs((prevInputs) => ({
                          ...prevInputs,
                          price_min: minValue,
                        }));
                      }
                    }}
                  />
                  <div className="flex items-center justify-center">
                    <label className="text-center text-xs">
                      Minimum: {userInputs.price_min}
                    </label>
                  </div>
                  <input
                    id="max-price-slider"
                    type="range"
                    min={0}
                    max={15000}
                    step={1000}
                    value={userInputs.price_max}
                    className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200"
                    onChange={(event) => {
                      const maxValue = parseInt(event.target.value);
                      if (maxValue >= userInputs.price_min!) {
                        setUserInputs((prevInputs) => ({
                          ...prevInputs,
                          price_max: maxValue,
                        }));
                      }
                    }}
                  />
                  <div className="flex items-center justify-center">
                    <label className="text-center text-xs">
                      Maximum: {userInputs.price_max}
                    </label>
                  </div>
                </div>
              )}
              <hr className="filter-border"></hr>

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
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </button>
              {showSortDropdown && (
                <div>
                  {/* Sort by name */}
                  <div className="flex text-xs">
                    <div
                      className="-mx-1 -ml-2 flex items-center"
                      key="NAME-ASC"
                    >
                      <input
                        id="NAME-ASC"
                        type="radio"
                        name="sort"
                        value="NAME-ASC"
                        onChange={handleSortTypeChange}
                        checked={"NAME-ASC" === selectedSort}
                        className="filter-radio hidden"
                      />
                      <label htmlFor="NAME-ASC" className="filter-text">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          // className="icon icon-tabler icon-tabler-arrow-narrow-up cursor-pointer"
                          className={`icon icon-tabler icon-tabler-arrow-narrow-up cursor-pointer ${
                            "NAME-ASC" === selectedSort
                              ? "text-p-bviolet"
                              : "text-black"
                          }`}
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          strokeWidth="2"
                          stroke="currentColor"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path
                            stroke="none"
                            d="M0 0h24v24H0z"
                            fill="none"
                          ></path>
                          <path d="M12 5l0 14"></path>
                          <path d="M16 9l-4 -4"></path>
                          <path d="M8 9l4 -4"></path>
                        </svg>
                      </label>
                    </div>
                    <div className="-mx-1 flex items-center" key="NAME-DESC">
                      <input
                        id="NAME-DESC"
                        type="radio"
                        name="sort"
                        value="NAME-DESC"
                        onChange={handleSortTypeChange}
                        checked={"NAME-DESC" === selectedSort}
                        className="filter-radio hidden"
                      />
                      <label htmlFor="NAME-DESC" className="filter-text">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className={`icon icon-tabler icon-tabler-arrow-narrow-down cursor-pointer ${
                            "NAME-DESC" === selectedSort
                              ? "text-p-bviolet"
                              : "text-black"
                          }`}
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          strokeWidth="2"
                          stroke="currentColor"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path
                            stroke="none"
                            d="M0 0h24v24H0z"
                            fill="none"
                          ></path>
                          <path d="M12 5l0 14"></path>
                          <path d="M16 15l-4 4"></path>
                          <path d="M8 15l4 4"></path>
                        </svg>
                      </label>
                    </div>
                    <label className="mx-2 mt-1">Name</label>
                  </div>
                  {/* Sort by price */}
                  <div className="flex text-xs">
                    <div
                      className="-mx-1 -ml-2 flex items-center"
                      key="PRICE-ASC"
                    >
                      <input
                        id="PRICE-ASC"
                        type="radio"
                        name="sort"
                        value="PRICE-ASC"
                        onChange={handleSortTypeChange}
                        checked={"PRICE-ASC" === selectedSort}
                        className="filter-radio hidden"
                      />
                      <label htmlFor="PRICE-ASC" className="filter-text">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className={`icon icon-tabler icon-tabler-arrow-narrow-up cursor-pointer ${
                            "PRICE-ASC" === selectedSort
                              ? "text-p-bviolet"
                              : "text-black"
                          }`}
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          strokeWidth="2"
                          stroke="currentColor"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path
                            stroke="none"
                            d="M0 0h24v24H0z"
                            fill="none"
                          ></path>
                          <path d="M12 5l0 14"></path>
                          <path d="M16 9l-4 -4"></path>
                          <path d="M8 9l4 -4"></path>
                        </svg>
                      </label>
                    </div>
                    <div className="-mx-1 flex items-center" key="PRICE-DESC">
                      <input
                        id="PRICE-DESC"
                        type="radio"
                        name="sort"
                        value="PRICE-DESC"
                        onChange={handleSortTypeChange}
                        checked={"PRICE-DESC" === selectedSort}
                        className="filter-radio hidden"
                      />
                      <label htmlFor="PRICE-DESC" className="filter-text">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className={`icon icon-tabler icon-tabler-arrow-narrow-down cursor-pointer ${
                            "PRICE-DESC" === selectedSort
                              ? "text-p-bviolet"
                              : "text-black"
                          }`}
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          strokeWidth="2"
                          stroke="currentColor"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path
                            stroke="none"
                            d="M0 0h24v24H0z"
                            fill="none"
                          ></path>
                          <path d="M12 5l0 14"></path>
                          <path d="M16 15l-4 4"></path>
                          <path d="M8 15l4 4"></path>
                        </svg>
                      </label>
                    </div>
                    <label className="mx-2 mt-1">Price</label>
                  </div>
                  {/* Sort by rating */}
                  <div className="flex text-xs">
                    <div
                      className="-mx-1 -ml-2 flex items-center"
                      key="RATING-ASC"
                    >
                      <input
                        id="RATING-ASC"
                        type="radio"
                        name="sort"
                        value="RATING-ASC"
                        onChange={handleSortTypeChange}
                        checked={"RATING-ASC" === selectedSort}
                        className="filter-radio hidden"
                      />
                      <label htmlFor="RATING-ASC" className="filter-text">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className={`icon icon-tabler icon-tabler-arrow-narrow-up cursor-pointer ${
                            "RATING-ASC" === selectedSort
                              ? "text-p-bviolet"
                              : "text-black"
                          }`}
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          strokeWidth="2"
                          stroke="currentColor"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path
                            stroke="none"
                            d="M0 0h24v24H0z"
                            fill="none"
                          ></path>
                          <path d="M12 5l0 14"></path>
                          <path d="M16 9l-4 -4"></path>
                          <path d="M8 9l4 -4"></path>
                        </svg>
                      </label>
                    </div>
                    <div className="-mx-1 flex items-center" key="RATING-DESC">
                      <input
                        id="RATING-DESC"
                        type="radio"
                        name="sort"
                        value="RATING-DESC"
                        onChange={handleSortTypeChange}
                        checked={"RATING-DESC" === selectedSort}
                        className="filter-radio hidden"
                      />
                      <label htmlFor="RATING-DESC" className="filter-text">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className={`icon icon-tabler icon-tabler-arrow-narrow-down cursor-pointer ${
                            "RATING-DESC" === selectedSort
                              ? "text-p-bviolet"
                              : "text-black"
                          }`}
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          strokeWidth="2"
                          stroke="currentColor"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path
                            stroke="none"
                            d="M0 0h24v24H0z"
                            fill="none"
                          ></path>
                          <path d="M12 5l0 14"></path>
                          <path d="M16 15l-4 4"></path>
                          <path d="M8 15l4 4"></path>
                        </svg>
                      </label>
                    </div>
                    <label className="mx-2 mt-1">Rating</label>
                  </div>
                </div>
              )}
              <hr className="filter-border"></hr>
              {/* Include */}
              <div className="mb-4">
                <h2 className="filter-header mb-1">Tags</h2>
                <Tags setUserInputs={setUserInputs} methods={methods} />
              </div>
              {/* Button will not show up for guests */}
              <div className="mt-3">
                <DownloadPDFButton />
              </div>
            </aside>
            <div
              className={`h-fit w-full rounded-b-2xl bg-p-lviolet sm:mt-16 sm:w-fit sm:rounded-bl-none sm:rounded-br-2xl sm:rounded-tr-2xl sm:px-2.5 sm:py-3`}
              onClick={handleSidebarChange}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`icon hidden text-p-dviolet hover:text-p-dbviolet sm:block ${
                  toggleSidebar ? "rotate-[-180deg]" : ""
                } transition-transform duration-700`}
                width="32"
                height="32"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path
                  d="M12 2l.324 .005a10 10 0 1 1 -.648 0l.324 -.005zm.613 5.21a1 1 0 0 0 -1.32 1.497l2.291 2.293h-5.584l-.117 .007a1 1 0 0 0 .117 1.993h5.584l-2.291 2.293l-.083 .094a1 1 0 0 0 1.497 1.32l4 -4l.073 -.082l.064 -.089l.062 -.113l.044 -.11l.03 -.112l.017 -.126l.003 -.075l-.007 -.118l-.029 -.148l-.035 -.105l-.054 -.113l-.071 -.111a1.008 1.008 0 0 0 -.097 -.112l-4 -4z"
                  strokeWidth="0"
                  fill="currentColor"
                ></path>
              </svg>
              <div className="flex items-center justify-center sm:hidden">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`text-p-dviolet hover:text-p-dbviolet ${
                    toggleSidebar ? "rotate-[-180deg]" : ""
                  } transition-transform duration-700`}
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path
                    d="M17 3.34a10 10 0 1 1 -14.995 8.984l-.005 -.324l.005 -.324a10 10 0 0 1 14.995 -8.336zm-5 3.66a1 1 0 0 0 -1 1v5.585l-2.293 -2.292l-.094 -.083a1 1 0 0 0 -1.32 1.497l4 4c.028 .028 .057 .054 .094 .083l.092 .064l.098 .052l.081 .034l.113 .034l.112 .02l.117 .006l.115 -.007l.114 -.02l.142 -.044l.113 -.054l.111 -.071a.939 .939 0 0 0 .112 -.097l4 -4l.083 -.094a1 1 0 0 0 -1.497 -1.32l-2.293 2.291v-5.584l-.007 -.117a1 1 0 0 0 -.993 -.883z"
                    strokeWidth="0"
                    fill="currentColor"
                  ></path>
                </svg>
              </div>
            </div>
          </div>
          <div className="flex grow flex-col items-center">
            <AccommodationsList control={control} />
          </div>
        </div>
      </form>
    </div>
  );
}

// Sidebar Functions
// eslint-disable-next-line

const Tags: React.FC<{
  setUserInputs: any;
  methods: UseInfiniteQueryResult<any, any>;
}> = ({ setUserInputs, methods }) => {
  const [value, setValue] = useState("");

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value);
  }

  return (
    <div className="relative">
      <div>
        <input
          type="text"
          value={value}
          onChange={handleChange}
          onKeyDown={(evt) => {
            if (evt.key == "Enter") {
              const searchArray = [] as string[];
              const inputtagarray = value.split(",");
              inputtagarray
                .filter((tag) => tag !== "")
                .forEach((tag) => {
                  searchArray.push(titleCase(tag.trim()));
                });
              // eslint-disable-next-line
              setUserInputs((prevInputs: any) => ({
                ...prevInputs,
                tagArray: searchArray,
              }));
            }
          }}
          className="filter-search text-p-dviolet"
          placeholder="e.g. aircon"
        />
      </div>
    </div>
  );
};

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
              let selected = false;
              if (evt.currentTarget.value == "") {
                handleSuggestionClick("");
              } else if (barangayEntries && barangayEntries?.length > 0) {
                barangayEntries.reverse().forEach((entry) => {
                  if (
                    entry.barangay &&
                    entry.barangay.toLowerCase().includes(value.toLowerCase())
                  ) {
                    handleSuggestionClick(entry.barangay);
                    selected = true;
                    return;
                  }
                });
                if (!selected) {
                  handleSuggestionClick(evt.currentTarget.value);
                }
              }
            }
          }}
          className="filter-search text-p-dviolet"
          placeholder="e.g. Batong Malake"
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
        {items?.map(
          ({
            id,
            name,
            price,
            barangay,
            average_rating,
            typeArray,
            tagArray,
          }) => (
            <SearchItem
              key={id + name}
              id={id}
              name={name}
              price={
                price !== undefined && price !== null ? price.toFixed(2) : ""
              }
              location={barangay}
              average_rating={average_rating ?? 0}
              type={stalsDBstringArray(typeArray)}
              tags={stalsDBstringArray(tagArray)}
            />
          ),
        )}
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
