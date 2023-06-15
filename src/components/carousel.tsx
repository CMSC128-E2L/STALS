import React, { useState, useEffect } from "react";
import LoadingSpinner from "./loadingSpinner";

const Carousel: React.FC<{ imageList: string[] }> = ({ imageList }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [filteredImages, setFilteredImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [previewImages, setPreviewImage] = useState(false);

  useEffect(
    () => {
      const loadImages = async () => {
        setIsLoading(true);
        const filtered = await Promise.all(
          imageList.map((imageUrl) => {
            return new Promise<string | undefined>((resolve) => {
              const img = new Image();
              img.src = imageUrl;
              img.onload = () => resolve(imageUrl);
              img.onerror = () => resolve(undefined);
            });
          }),
        );
        setFilteredImages(
          filtered.filter((img) => img !== undefined) as string[],
        );
        setIsLoading(false);
      };
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      loadImages();
    },
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    [imageList],
  );

  const handleIndicatorClick = (index: number) => {
    setActiveIndex(index);
  };

  const handlePrevClick = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? filteredImages.length - 1 : prevIndex - 1,
    );
  };

  const handleNextClick = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === filteredImages.length - 1 ? 0 : prevIndex + 1,
    );
  };

  return (
    <>
      <div id="carouselExampleIndicators" className="relative">
        {/* Carousel indicators */}
        {isLoading && <LoadingSpinner />}
        <div className="absolute bottom-0 left-0 right-0 z-[2] mx-auto mb-4 flex list-none justify-center p-0">
          {filteredImages.map((_, index) => (
            <button
              key={index}
              type="button"
              data-te-target="#carouselExampleIndicators"
              data-te-slide-to={index}
              onClick={() => handleIndicatorClick(index)}
              className={`mx-[3px] box-content h-[3px] w-[30px] flex-initial cursor-pointer border-0 border-y-[10px] border-solid border-transparent bg-white bg-clip-padding p-0 -indent-[999px] ${
                index === activeIndex ? "opacity-100" : "opacity-50"
              } transition-opacity duration-[600ms] ease-[cubic-bezier(0.25,0.1,0.25,1.0)] motion-reduce:transition-none`}
              aria-current={index === activeIndex ? "true" : undefined}
              aria-label={`Slide ${index + 1}`}
            ></button>
          ))}
        </div>

        {/* Carousel items */}
        <div className="relative w-full overflow-hidden">
          {filteredImages.map((imageUrl, index) => (
            <button
              key={index}
              onClick={() => setPreviewImage(true)}
              className={`relative float-left ${
                index === activeIndex ? "-ml-0" : "hidden"
              } w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none`}
              data-te-carousel-item={index === activeIndex ? "" : undefined}
              type="button"
            >
              <img
                src={imageUrl}
                className="block h-[350px] w-full object-cover"
                alt={`Slide ${index + 1}`}
              />
            </button>
          ))}
        </div>
        {/* Carousel controls - prev item */}
        <button
          className="absolute bottom-0 left-0 top-0 z-[1] flex w-[15%] items-center justify-center border-0 bg-none p-0 text-center text-white opacity-50 transition-opacity duration-150 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] hover:bg-p-dgray/50 hover:text-white hover:no-underline hover:opacity-90 hover:outline-none focus:text-white focus:no-underline focus:opacity-90 focus:outline-none motion-reduce:transition-none"
          type="button"
          data-te-target="#carouselExampleIndicators"
          data-te-slide="prev"
          onClick={handlePrevClick}
        >
          <span className="inline-block h-8 w-8">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="#bfbfbf"
              className="h-7 w-7"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
          </span>
          <span className="sr-only">Previous</span>
        </button>

        {/* Carousel controls - next item */}
        <button
          className="absolute bottom-0 right-0 top-0 z-[1] flex w-[15%] items-center justify-center border-0 bg-none p-0 text-center text-white opacity-50 transition-opacity duration-150 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] hover:bg-p-dgray/50 hover:text-white hover:no-underline hover:opacity-90 hover:outline-none focus:text-white focus:no-underline focus:opacity-90 focus:outline-none motion-reduce:transition-none"
          type="button"
          data-te-target="#carouselExampleIndicators"
          data-te-slide="next"
          onClick={handleNextClick}
        >
          <span className="inline-block h-8 w-8">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="#bfbfbf"
              className="h-7 w-7"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </span>
          <span className="sr-only">Next</span>
        </button>
      </div>
      {previewImages && (
        <div className="space-evenly fixed inset-0 z-[2] mt-10 flex flex-col items-center justify-center bg-black bg-opacity-50 ">
          <div className="rounded bg-white p-3">
            <div className="absolute bottom-0 left-0 right-0 mx-auto mb-4 flex list-none justify-center p-0">
              {filteredImages.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  data-te-target="#carouselExampleIndicators"
                  data-te-slide-to={index}
                  onClick={() => handleIndicatorClick(index)}
                  className={`mx-[3px] box-content h-[3px] w-[30px] flex-initial cursor-pointer border-0 border-y-[10px] border-solid border-transparent bg-white bg-clip-padding p-0 -indent-[999px] ${
                    index === activeIndex ? "opacity-100" : "opacity-50"
                  } transition-opacity duration-[600ms] ease-[cubic-bezier(0.25,0.1,0.25,1.0)] motion-reduce:transition-none`}
                  aria-current={index === activeIndex ? "true" : undefined}
                  aria-label={`Slide ${index + 1}`}
                ></button>
              ))}
            </div>

            {/* Carousel items */}
            <div className="relative w-full overflow-hidden">
              {filteredImages.map((imageUrl, index) => (
                <div
                  key={index}
                  className={`relative float-left ${
                    index === activeIndex ? "-ml-0" : "hidden"
                  } w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none`}
                  data-te-carousel-item={index === activeIndex ? "" : undefined}
                >
                  <img
                    src={imageUrl}
                    className="block h-[350px] w-full object-cover"
                    alt={`Slide ${index + 1}`}
                  />
                </div>
              ))}
            </div>
            {/* Carousel controls - prev item */}
            <button
              className="absolute bottom-0 left-0 top-0 z-[1] flex w-[15%] items-center justify-center border-0 bg-none p-0 text-center text-white opacity-50 transition-opacity duration-150 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] hover:bg-p-dgray/50 hover:text-white hover:no-underline hover:opacity-90 hover:outline-none focus:text-white focus:no-underline focus:opacity-90 focus:outline-none motion-reduce:transition-none"
              type="button"
              data-te-target="#carouselExampleIndicators"
              data-te-slide="prev"
              onClick={handlePrevClick}
            >
              <span className="inline-block h-8 w-8">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="#bfbfbf"
                  className="h-7 w-7"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 19.5L8.25 12l7.5-7.5"
                  />
                </svg>
              </span>
              <span className="sr-only">Previous</span>
            </button>

            {/* Carousel controls - next item */}
            <button
              className="absolute bottom-0 right-0 top-0 z-[1] flex w-[15%] items-center justify-center border-0 bg-none p-0 text-center text-white opacity-50 transition-opacity duration-150 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] hover:bg-p-dgray/50 hover:text-white hover:no-underline hover:opacity-90 hover:outline-none focus:text-white focus:no-underline focus:opacity-90 focus:outline-none motion-reduce:transition-none"
              type="button"
              data-te-target="#carouselExampleIndicators"
              data-te-slide="next"
              onClick={handleNextClick}
            >
              <span className="inline-block h-8 w-8">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="#bfbfbf"
                  className="h-7 w-7"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 4.5l7.5 7.5-7.5 7.5"
                  />
                </svg>
              </span>
              <span className="sr-only">Next</span>
            </button>
          </div>
          <button
            className="mt-4 w-[15%] rounded bg-p-dviolet p-2 text-white hover:bg-p-dbviolet"
            onClick={() => setPreviewImage(false)}
          >
            Close
          </button>
        </div>
      )}
    </>
  );
};

export default Carousel;
