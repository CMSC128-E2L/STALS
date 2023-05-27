import toast from "react-hot-toast";

export default function Upload() {
  return (
    <input
      type="file"
      accept="image/png, image/jpeg"
      onChange={(e) => void uploadPhoto(e)}
    />
  );
}

const uploadPhoto = async (e: React.ChangeEvent<HTMLInputElement>) => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion, @typescript-eslint/no-non-null-asserted-optional-chain
  const file = e.target.files?.[0]!;
  const filename = file.name;
  const fileType = file.type;

  const res = await fetch(`/api/upload?file=${filename}&fileType=${fileType}`);
  const { url } = (await res.json()) as { url: string };

  const uploading = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": fileType,
    },
    body: file,
  });

  console.log(uploading.status);
  if (uploading.status === 200) {
    toast.success("Image uploaded!", {
      position: "bottom-right",
      duration: 1000,
    });
  }
};
