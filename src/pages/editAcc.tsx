import NavBar from "~/components/navbar";
import Image from "next/image";

export default function EditAccommodation() {
  return (
    <div className="flex h-screen flex-col object-contain">
      <div className="">
        <NavBar />
      </div>
      <div className="flex flex-auto items-center justify-center">
        {/* EDIT ACCOMMODATION FORM HERE */}
        <div className="h-5/6 w-3/4 rounded-xl bg-p-lblue p-4 py-4 shadow-md">
          <h1 className="form-h1">EDIT ACCOMMODATION</h1>
          <form className="flex h-full flex-row">
            {/* CHANGE UPLOADED PHOTOS IN GALLERY */}
            {/* I HAVE A VERY ROUGH IDEA ON HOW TO IMPLEMENT THIS */}
            <div className="w-1/3 flex-none p-4">
              {/* BASICALLY THE GALLERY CALLS FROM A LIST */}
              <div className="grid gap-4">
                {/* main image */}
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
            <div className="gapy-2 flex w-2/3 flex-none flex-col p-4">
              <div>
                {/* Edit accommodation name 
                                textbox SHOULD NOT BE EMPTY*/}
                <label>Edit Accommodation Name</label>
                <input
                  className="add-acc-input-text-field text-xl"
                  placeholder="Current Accommodation Name"
                  type="text"
                ></input>
              </div>

              {/* CHANGE ACCMMODATION TYPE */}
              <div className="w-1/2 py-2">
                <label>Edit Type of Accommodation</label>
                <select
                  name="Accommodation Type"
                  className="form-dropdown italic"
                  placeholder="Type"
                >
                  <option value="">Dormitory</option>
                  <option value="">Apartment</option>
                  <option value="">Bedspacer</option>
                  <option value="">Hotel</option>
                  <option value="">Transient Space</option>
                </select>
              </div>

              {/* input boxes for the phone number, email, and location*/}
              <label>Edit Phone Number, email, and location</label>
              <div className="flex flex-row gap-2 px-3">
                <div className="flex flex-row items-center gap-x-1 p-1">
                  {/* phone number icon*/}
                  <div className="rounded-full bg-p-dblue p-1 ">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="h-5 w-5 fill-white stroke-p-dblue"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                      />
                    </svg>
                  </div>
                  {/* input field */}
                  <input
                    className="add-acc-input-text-field"
                    placeholder="Current Phone number"
                    type="text"
                  ></input>
                </div>

                {/* EDIT EMAIL */}
                <div className="flex flex-row items-center gap-x-1 p-1">
                  {/* EMAIL icon*/}
                  <div className="rounded-full bg-p-dblue p-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="h-5 w-5 fill-white stroke-p-dblue"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                      />
                    </svg>
                  </div>
                  {/* input field */}
                  <input
                    className="add-acc-input-text-field"
                    placeholder="Current Email"
                    type="text"
                  ></input>
                </div>
                <div className="flex flex-row items-center gap-x-1 p-1">
                  {/* location icon*/}
                  <div className="rounded-full bg-p-dblue p-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="h-5 w-5 stroke-white"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                      />
                    </svg>
                  </div>
                  {/* input field */}
                  <input
                    className="add-acc-input-text-field"
                    placeholder="Current Location"
                    type="text"
                  ></input>
                </div>
              </div>

              {/* Rooms */}
              <div className="flex flex-col">
                <label>Contract Length</label>
                <div className="p-2">
                  {/* Edit contract lentgth */}
                  <select
                    name="Contract Length"
                    className="form-dropdown w-1/4"
                    placeholder="Type"
                  >
                    <option value="">Contract Length</option>
                    <option value="">1 Academic Year</option>
                    <option value="">1 Semester</option>
                  </select>
                </div>
                <label>Edit Rooms</label>
                <div className="m-2 flex flex-row gap-2 px-2">
                  {/* buttons redirect to the edit room page */}
                  <button className="accPButton">Room 1</button>
                  <button className="accPButton">Room 2</button>
                  <button className="accPButton">Room 3</button>
                </div>
              </div>

              {/* Edit tags */}
              <div>
                <label>Edit Tags</label>
                <input
                  className="add-acc-input-text-field"
                  placeholder="Current Accommodation Name"
                  type="text"
                ></input>
              </div>

              {/* Submit/reset buttons */}
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
  );
}
