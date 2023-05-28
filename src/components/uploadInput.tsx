import toast from "react-hot-toast";

const UploadImageHeader: React.FC<{ accomId: string }> = ({ accomId }) => {
  return (
    <input
      type="file"
      accept="image/png, image/jpeg"
      onChange={(e) => void uploadImageHeader(e, accomId)}
    />
  );
};

export default UploadImageHeader;

export const UploadImageMultiple: React.FC<{ accomId: string }> = ({
  accomId,
}) => {
  return (
    <input
      type="file"
      accept="image/png, image/jpeg"
      onChange={(e) => void uploadMultiplePhotos(e, accomId)}
      multiple
    />
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
) => {
  if (e.target.files === null) {
    return;
  }

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const file = e.target.files[0]!;
  const fileType = file.type;
  const filename = accomId + "/" + accomId;
  await uploadSinglePhoto(file, filename, fileType);

  toast.success("Images uploaded!", {
    position: "bottom-right",
    duration: 1000,
  });
};

const uploadMultiplePhotos = async (
  e: React.ChangeEvent<HTMLInputElement>,
  accomId: string,
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

  toast.success("Images uploaded!", {
    position: "bottom-right",
    duration: 1000,
  });
};
