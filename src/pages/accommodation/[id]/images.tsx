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
      toast.success("Image deleted!", {
        position: "bottom-right",
        duration: 3000,
      });
      void ImagesRefetch();
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
            <div className="flex items-stretch justify-center space-x-2 space-y-2 bg-white sm:flex-wrap">
              {!imageLoading && filteredImages ? (
                filteredImages.length > 0 ? (
                  filteredImages.map((src, index) => (
                    <div key={index} className="flex items-stretch">
                      <div className="relative max-w-[350px] bg-white">
                        <button
                          className="absolute right-2 top-2 bg-red-700 text-white"
                          onClick={() => {
                            void deleteImage.mutate({
                              key: src.split("/").splice(-2).join("/"),
                            });
                          }}
                        >
                          Delete
                        </button>
                        <img
                          src={src}
                          alt={src}
                          className="h-full w-full object-cover"
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
