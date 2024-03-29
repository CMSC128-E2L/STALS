import NavBar from "~/components/navbar";
import { useRouter } from "next/router";
import { dynamicRouteID, notAuthenticated } from "~/utils/helpers";
import { api } from "~/utils/api";
import bgpic from "public/images/background_addaccom.png";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import LoadingSpinner from "~/components/loadingSpinner";
import Error404 from "~/pages/404";
import Error from "~/pages/_error";
import UploadImageHeader, {
  UploadImageMultiple,
} from "~/components/uploadInput";
import { useEffect, useState } from "react";

export default function EditAccommodation() {
  const userSession = useSession({ required: true });
  const { id } = dynamicRouteID(useRouter());
  const router = useRouter();

  const [reloadInt, setReloadInt] = useState<number[]>([]);

  const addNumber = (num: number) => {
    setReloadInt((prev) => [...prev, num]);
  };

  const { data: accommData, isLoading: accommLoading } =
    api.accommodation.getOneRelations.useQuery(id);

  const {
    data: ImageList,
    isLoading: imageLoading,
    refetch: ImagesRefetch,
  } = api.file.getAccommImages.useQuery({ id });

  const deleteImage = api.file.deleteOne.useMutation({
    onSuccess: () => {
      setReloadInt((prev) => [...prev, 1]);
    },
  });

  const [filteredImages, setFilteredImages] = useState<string[]>([]);
  let imageList: string[] = [];

  useEffect(() => {
    void ImagesRefetch();
    imageList = ImageList ? ImageList : [];
  }, [reloadInt, setReloadInt]);

  useEffect(
    () => {
      imageList = ImageList ? ImageList : [];
      const loadImages = async () => {
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
      };
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      loadImages();
    },
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    [ImageList, imageList],
  );

  if (notAuthenticated(userSession.status) || accommLoading) {
    return (
      <div className="min-h-[80vh]">
        <img className="site-background" src={bgpic.src} alt="background" />
        <NavBar />
        <LoadingSpinner />
      </div>
    );
  }

  if (accommData === null) {
    return Error404();
  }

  if (accommData?.landlord !== userSession.data?.user.id) {
    return <Error statusCode={401} />;
  }

  return (
    <div className="">
      <img
        className="fixed -z-50 w-screen bg-cover bg-fixed bg-center"
        src={bgpic.src}
        alt="background"
      />
      <NavBar showBack />
      <div className="block min-h-[80vh] px-2 py-2 sm:px-0">
        <div className="inset-x-0 flex items-center justify-center">
          <div className="my-14 flex grow flex-col items-center justify-center gap-1 rounded-md p-10 sm:w-[75%]">
            {/* Manage gallery */}
            <div className="grow pb-3 text-center">
              <label className="form-h3">Manage Gallery</label>
              <main className="w-full">
                <article
                  aria-label="file Upload Modal"
                  className="relative flex h-full flex-col rounded-md shadow-xl"
                >
                  <section className="flex w-full flex-col gap-3 overflow-auto p-3">
                    <header className="flex flex-col items-center justify-center rounded-md border border-dashed border-p-gray p-12">
                      <p className="mb-3 flex flex-wrap justify-center font-semibold">
                        <span>Accommodation Header</span>
                      </p>
                      <UploadImageHeader
                        accomId={id}
                        postUploadFunction={addNumber}
                      />
                      <p className="mb-3 mt-3 flex flex-wrap justify-center font-semibold">
                        <span>Accommodation Images</span>
                      </p>
                      <UploadImageMultiple
                        accomId={id}
                        postUploadFunction={addNumber}
                      />
                    </header>
                  </section>
                  <div className="flex flex-col gap-2">
                    <div>
                      <button
                        type="reset"
                        className="formReject"
                        onClick={() => {
                          router.back();
                        }}
                      >
                        Back
                      </button>
                    </div>
                  </div>
                </article>
              </main>
            </div>
            <div className="flex items-stretch justify-center space-x-2 space-y-2 rounded-xl bg-white sm:flex-wrap">
              {!imageLoading && filteredImages ? (
                filteredImages.length > 0 ? (
                  filteredImages.map((src, index) => (
                    <div key={index} className="flex items-stretch">
                      <div className="relative max-w-[350px] bg-white">
                        {src.split("/").pop() === id && (
                          <div className="absolute left-2 top-2 flex rounded-full bg-p-dviolet px-3 py-2 text-white">
                            Header
                          </div>
                        )}
                        <button
                          className="absolute right-2 top-2 flex rounded-full bg-p-red px-3 py-2 text-white"
                          onClick={() => {
                            void toast.promise(
                              new Promise((resolve, reject) => {
                                setTimeout(() => {
                                  resolve(
                                    deleteImage.mutate({
                                      key: src.split("/").splice(-2).join("/"),
                                    }),
                                  );
                                }, 1);
                              }),
                              {
                                loading: "Deleting Image...",
                                success: "Image Deleted!",
                                error:
                                  "Please check your connection and try again",
                              },
                              {
                                position: "bottom-right",
                              },
                            );
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="icon icon-tabler icon-tabler-trash-x mt-0.5"
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
                            <path d="M4 7h16"></path>
                            <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12"></path>
                            <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3"></path>
                            <path d="M10 12l4 4m0 -4l-4 4"></path>
                          </svg>
                        </button>
                        <img
                          src={src}
                          alt={src}
                          className="h-full w-full rounded-xl object-cover"
                        />
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="max-w relative col-span-2 rounded-md text-center">
                    <div className="relative w-full overflow-hidden">
                      No images.
                    </div>
                  </div>
                )
              ) : (
                <div>
                  <LoadingSpinner />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
