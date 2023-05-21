import NavBar from "~/components/navbar";
import Image from "next/image";

export default function EditAccommodation() {
  return (
    <div className="flex min-h-screen flex-col">
      <NavBar />

      <div className="mt-10 flex flex-col items-center justify-center">
        <div className="my-14 w-3/4 rounded-xl bg-p-lblue p-4">
          <div>
            <h1 className="form-h1">EDIT ACCOMMODATION</h1>
          </div>
          <div className="">
            <form className="justify-items-stretchspace-y-4 flex flex-row object-contain ">
              {/* Images 
                Basically same implementation ito with how gallery works sa accommodation/id BUT mayroon lang na add image button sa huli */}
              <div className="w-1/3 flex-none p-4">
                <div className="grid gap-4">
                  <div className="max-w relative aspect-square h-auto">
                    <Image
                      className="rounded-lg object-cover"
                      src="https://flowbite.s3.amazonaws.com/docs/gallery/featured/image.jpg"
                      alt="image"
                      fill
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-1">
                    <div className="max-w relative aspect-square h-auto">
                      <Image
                        className="rounded-lg object-cover"
                        src="https://flowbite.s3.amazonaws.com/docs/gallery/featured/image.jpg"
                        alt="image"
                        fill
                      />
                    </div>
                    <div className="max-w relative aspect-square h-auto">
                      <Image
                        className="rounded-lg object-cover"
                        src="https://flowbite.s3.amazonaws.com/docs/gallery/featured/image.jpg"
                        alt="image"
                        fill
                      />
                    </div>
                    <div className="max-w relative aspect-square h-auto blur-sm">
                      {/* make this a button that links to a gallery */}
                      <Image
                        className="rounded-lg object-cover"
                        src="https://flowbite.s3.amazonaws.com/docs/gallery/featured/image.jpg"
                        alt="image"
                        fill
                      />
                    </div>
                  </div>
                  <div>
                    <button type="submit" className="formButton float-right">
                      Edit Gallery
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex w-3/4 flex-initial flex-col gap-2 p-4 pt-3">
                <div>
                  <label>Accommodation Name</label>
                  <input
                    className="add-acc-input-text-field text-xl"
                    placeholder="Current Accommodation Name"
                    type="text"
                  ></input>
                </div>

                <div className="flex flex-row gap-3">
                  <div className="basis-1/2">
                    <label>Accommodation Type</label>
                    <select
                      name="Accommodation Type"
                      className="form-dropdown italic shadow shadow-p-black/50"
                      placeholder="Type"
                    >
                      <option value="">Dormitory</option>
                      <option value="">Apartment</option>
                      <option value="">Bedspacer</option>
                      <option value="">Hotel</option>
                      <option value="">Transient Space</option>
                    </select>
                  </div>
                  <div className="w-1/2">
                    <label>Contract Length</label>
                    <select
                      className="form-dropdown shadow shadow-p-black/50"
                      placeholder="Contract Length"
                    >
                      <option>1 Academic Year</option>
                      <option>1 Semester</option>
                    </select>
                  </div>
                  <div className="w-1/2">
                    <label>Location</label>
                    <select
                      className="form-dropdown shadow shadow-p-black/50"
                      placeholder="Contract Length"
                    >
                      <option>Within UPLB</option>
                      <option>Outside UPLB</option>
                    </select>
                  </div>
                </div>

                <div className="flex flex-row gap-2">
                  <div className="flex flex-row items-center gap-x-1 p-1">
                    {/* input field */}
                    <div className="flex flex-row gap-1">
                      <select className="rounded-md pl-2 font-bold shadow shadow-p-black/50">
                        <option value="09">09</option>
                        <option value="+639">+639</option>
                      </select>
                      <input
                        className="add-acc-input-text-field"
                        placeholder="Contact No."
                        pattern="[0-9]{9}"
                        type="text"
                      ></input>
                    </div>
                  </div>
                  {/* EDIT EMAIL */}
                  <div className="flex flex-row items-center gap-x-1 p-1">
                    {/* input field */}
                    <input
                      className="add-acc-input-text-field"
                      placeholder="Current Email"
                      type="email"
                    ></input>
                  </div>
                  <div className="flex flex-row items-center gap-x-1 p-1">
                    {/* input field */}
                    <input
                      className="add-acc-input-text-field"
                      placeholder="FB Page"
                      type="text"
                      pattern="(?:https?:\/\/)?(?:www\.)?(mbasic.facebook|m\.facebook|facebook|fb)\.(com|me)\/(?:(?:\w\.)*#!\/)?(?:pages\/)?(?:[\w\-\.]*\/)*([\w\-\.]*)"
                    ></input>
                  </div>
                </div>
                <div>
                  <label>Address</label>
                  <div className="mb-2 flex flex-row gap-2">
                    <input
                      className="add-acc-input-text-field w-1/3"
                      type="text"
                      placeholder="St."
                    ></input>
                    <input
                      className="add-acc-input-text-field w-2/3"
                      placeholder="Subdivision"
                    ></input>
                    <input
                      className="add-acc-input-text-field"
                      placeholder="Barangay"
                      type="text"
                      required
                    ></input>
                  </div>
                  <div>
                    <input
                      className="add-acc-input-text-field"
                      placeholder="Current address"
                      type="text"
                      pattern=""
                      required
                    ></input>
                  </div>
                </div>
                <div>
                  <label>Edit Tags</label>
                  <input
                    className="add-acc-input-text-field"
                    placeholder="Current Accommodation Name"
                    type="text"
                  ></input>
                </div>
                <div className="float-right space-x-3 self-end py-4">
                  <button type="reset" className="formButton">
                    Clear
                  </button>
                  <button type="submit" className="formButton">
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
