import toast from "react-hot-toast";

const UploadImageHeader: React.FC<{
  accomId: string;
  className?: string;
  postUploadFunction?: (num: number) => void;
}> = ({ accomId, className, postUploadFunction }) => {
  return (
    <input
      type="file"
      accept="image/png, image/jpeg"
      className={className}
      onChange={(e) => {
        void toast.promise(
          uploadImageHeader(e, accomId, postUploadFunction),
          {
            loading: "Uploading...",
            success: "Image uploaded!",
            error: "Please check your connection and try again",
          },
          {
            position: "bottom-right",
          },
        );
      }}
    />
  );
};

export default UploadImageHeader;

export const UploadImageMultiple: React.FC<{
  accomId: string;
  postUploadFunction?: (num: number) => void;
}> = ({ accomId, postUploadFunction }) => {
  return (
    <>
      <label
        className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
        htmlFor="file_single"
      >
        Upload file
      </label>
      <input
        // className="block w-full cursor-pointer rounded-lg border border-gray-300 bg-gray-50 text-sm text-gray-900 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400"
        aria-describedby="file_single_help"
        id="file_single"
        type="file"
        accept="image/png, image/jpeg"
        onChange={(e) => {
          void toast.promise(
            uploadMultiplePhotos(e, accomId, postUploadFunction),
            {
              loading: "Uploading...",
              success: "Image uploaded!",
              error: "Please check your connection and try again",
            },
            {
              position: "bottom-right",
            },
          );
        }}
        multiple
      />
      <p
        className="mt-1 text-sm text-gray-500 dark:text-gray-300"
        id="file_single_help"
      >
        PNG, JPG.
      </p>
    </>
  );
};

const uploadSinglePhoto = async (
  file: File,
  filename: string,
  fileType: string,
) => {
  const res = await fetch(`/api/upload?file=${filename}&fileType=${fileType}`);
  const { url } = (await res.json()) as { url: string };

  const uploading = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": fileType,
    },
    body: file,
  });

  return uploading.status;
};

const uploadImageHeader = async (
  e: React.ChangeEvent<HTMLInputElement>,
  accomId: string,
  postUploadFunction?: (num: number) => void,
) => {
  if (e.target.files === null) {
    return;
  }

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const file = e.target.files[0]!;
  const fileType = file.type;
  const filename = accomId + "/" + accomId;
  await uploadSinglePhoto(file, filename, fileType);
  if (postUploadFunction) {
    postUploadFunction(1);
  }
};

const uploadMultiplePhotos = async (
  e: React.ChangeEvent<HTMLInputElement>,
  accomId: string,
  postUploadFunction?: (num: number) => void,
) => {
  if (e.target.files === null) {
    return;
  }

  const filelength = e.target.files.length;

  for (let index = 0; index < filelength; index++) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const file = e.target.files[index]!;
    const fileType = file.type;
    const filename = accomId + "/" + file.name;
    await uploadSinglePhoto(file, filename, fileType);
  }

  if (postUploadFunction) {
    postUploadFunction(1);
  }
};
