import NavBar from "~/components/navbar";

export default function AddAccommodation() {
  return (
    <div className="thing">
      {/* Header */}
      <NavBar />

      {/* Body */}
      <div className="basis-1/8">
        {/* I HAVE DEEMED THAT WE DON'T NEED A BACK BUTTON BUT JUST UNCOMMENT THIS IF YOU WANT ONE SO BAD IG */}
        {/* <button></button>
        <label>Back</label> */}
      </div>
      {/* Middle Column Contains Form */}
      <div className="basis-6/8 flex min-h-screen items-center justify-center overflow-y-auto bg-white">
        {/* BOX THAT CONTAINS THE FORM */}
        <div className="margin-40 w-3/4 rounded-xl bg-p-lblue p-4 py-4 shadow-md">
          <div>
            <h1 className="form-h1">New Accommodation</h1>
          </div>

          <form className="justify-items-stretch space-y-4">
            <div>
              <h2 className="form-h2">Background</h2>
              {/* Accommodation background deets */}
              <div className="margin-40 grid grid-cols-2 gap-9 object-contain px-9">
                <div className="form-col-deets">
                  {/* Left Column */}
                  <div>
                    {/* Lodging name */}

                    <input
                      className="add-acc-input-text-field"
                      placeholder="Name of Accommodation"
                      type="text"
                      required
                    ></input>
                  </div>

                  <div>
                    {/* Subtype input field */}
                    <div className="h-10 w-full items-center justify-items-stretch rounded-md bg-white p-1">
                      <select
                        name="availability"
                        className="form-dropdown"
                        placeholder="Type"
                      >
                        <option value="">Dormitory</option>
                        <option value="">Apartment</option>
                        <option value="">Bedspacer</option>
                        <option value="">Hotel</option>
                        <option value="">Transient Space</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    {/* Address input field */}
                    <input
                      className="add-acc-input-text-field"
                      placeholder="Address"
                      type="text"
                      required
                    ></input>
                  </div>

                  <div>
                    <div className="h-10 w-full items-center justify-items-stretch rounded-md bg-white p-1">
                      <select
                        name="availability"
                        className="form-dropdown"
                        placeholder="Location"
                      >
                        <option value="">Location</option>
                        <option value="">Within UPLB</option>
                        <option value="">Outside UPLB</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    {/* Contact No input field */}

                    <input
                      className="add-acc-input-text-field"
                      placeholder="Contact No."
                      type="text"
                      required
                    ></input>
                  </div>

                  <div>
                    {/* Accom Price Range Field */}

                    <input
                      className="add-acc-input-text-field"
                      placeholder="Price Range"
                      type="text"
                      required
                    ></input>
                  </div>
                </div>

                {/* Right Column */}
                <div className="form-col-deets">
                  <div>
                    {/* FB page link*/}

                    <input
                      className="add-acc-input-text-field"
                      placeholder="Facebook Page Link"
                      type="text"
                    ></input>
                  </div>

                  <div>
                    {/* No of Available Rooms */}

                    <input
                      className="add-acc-input-text-field"
                      placeholder="No. of Available Rooms"
                      type="text"
                    ></input>
                  </div>

                  <div>
                    <div className="grid h-10 w-full grid-cols-2 items-center justify-items-stretch rounded-md bg-white p-1">
                      {/* Upload Photos */}
                      <label className="input-text-box-label px-4">
                        Upload Files
                      </label>
                      <div className="justify-self-end object-contain">
                        <input className="" id="file_input" type="file"></input>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="h-10 w-full items-center justify-items-stretch rounded-md bg-white p-1">
                      <select name="availability" className="form-dropdown">
                        <option value="">Availability</option>
                        <option value="">Occupied</option>
                        <option value="">Not Occupied</option>
                        <option value="">Bedspace available</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="form-h2">Tags</h2>
              {/* TAGS */}
              <div className="margin-40 grid grid-cols-2 gap-4 px-9">
                {/* LEFT COLUMN */}
                <div className="form-col-deets">
                  <div>
                    <div className="h-10 w-full items-center justify-items-stretch rounded-md bg-white p-1">
                      <select name="gender" className="form-dropdown">
                        <option value="">Coed</option>
                        <option value="">Male</option>
                        <option value="">Female</option>
                      </select>
                    </div>
                  </div>
                  <div className="text-lg">
                    <div>
                      <input
                        type="checkbox"
                        name="curfew"
                        className="peer"
                      ></input>{" "}
                      Curfew
                      <div className="hidden pb-3 peer-checked:block">
                        <input
                          type="time"
                          className="add-acc-input-text-field"
                          placeholder="Curfew"
                        ></input>
                      </div>
                    </div>
                    <div>
                      <select name="cooking" className="form-dropdown">
                        <option value="">Communal Kitchen</option>
                        <option value="">Kitchen in Room</option>
                        <option value="">Cooking Not Allowed</option>
                      </select>
                    </div>
                    <div>
                      <input type="checkbox" name="visitors"></input> Visitors
                    </div>
                    <div>
                      <input type="checkbox" name="pets"></input> Pets
                    </div>
                  </div>
                  <div>
                    <div className="h-10 w-full items-center justify-items-stretch rounded-md bg-white p-1">
                      <select name="gender" className="form-dropdown">
                        <option value="">Communal Bathroom</option>
                        <option value="">Private Bathroom</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Right COLUMN */}
                <div className="form-col-deets">
                  <div className="text-lg">
                    <div>
                      <input type="checkbox" name="pets"></input> Aircon
                    </div>
                    <div>
                      <input type="checkbox" name="pets"></input> Utilities
                    </div>
                    <div>
                      <input type="checkbox" name="pets"></input> Parking
                    </div>
                    <div>
                      <input type="checkbox" name="pets"></input> CCTV
                    </div>
                    <div>
                      <input type="checkbox" name="pets"></input> Guards
                    </div>
                    <div>
                      <input
                        type="checkbox"
                        name="Laundry"
                        className="peer"
                      ></input>{" "}
                      Laundry Service
                      {/* MAX AND MIN FEES FOR LAUNDRY SERVICE */}
                      <div className="invisible flex grid w-1/2 grid-cols-2 gap-4 peer-checked:visible">
                        <div className="justify-items-end">
                          <input
                            type="text"
                            className="add-acc-input-text-field"
                            placeholder="Min Fee"
                          ></input>
                        </div>
                        <div className=" justify-items-end">
                          <input
                            type="text"
                            className="add-acc-input-text-field"
                            placeholder="Max Service Fee"
                          ></input>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* CUSTOM TAGS TEXT BOX */}
              <div className="py-5">
                <h2 className="form-h2">Custom Tags</h2>
                <div className="px-9">
                  <label>
                    Separate custom tags with commas (,). I.e: laundry, canteen,
                    thing, ...
                  </label>
                  <input
                    type="text"
                    placeholder="Custom tags"
                    className="add-acc-input-text-field"
                  ></input>
                </div>
              </div>

              <div className="float-right space-x-3 px-9">
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
      <div className="basis-1/8"></div>
    </div>
  );
}
