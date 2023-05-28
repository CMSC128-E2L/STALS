import UploadImageHeader, {
  UploadImageMultiple,
} from "~/components/uploadInput";

export default function UploadPage() {
  return (
    <>
      <UploadImageHeader accomId={"hatyezzir"} />
      <UploadImageMultiple accomId={"istalsfolder"} />
    </>
  );
}
