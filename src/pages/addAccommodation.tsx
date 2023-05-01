export default function AddAccomodation() {
  return (
    <div className="thing">
      {/* Header */}
      <nav className="border-gray-200 bg-white dark:bg-gray-900">
        TODO: add navbar
      </nav>
      {/* Body */}
      <div className="flex flex-row content-center items-start">
        <div className="min-h-screen w-1/4 flex-none bg-yellow-100">01</div>

        {/* Middle Column Contains Form */}
        <div className="flex min-h-screen basis-1/2 items-center justify-center bg-blue-500">
          <div className="margin-40 w-3/4 justify-center rounded-md bg-white p-4 shadow-md">
            <div className="items-center">
              <h1 className="flex content-center text-center text-lg">
                Add Accommodation
              </h1>
            </div>
            <form>
              <h2 className="">Background</h2>
              {/* Accommodation background deets */}
              <div className="gap 4 margin-40 grid grid-cols-2">
                <div>
                  {/* Left Column */}
                  <div>
                    {/* Lodging name */}
                    <label>Name of Lodging</label>
                    <input
                      className="add-acc-input-text-field"
                      placeholder="Name of Lodging"
                      type="text"
                    ></input>
                  </div>
                  <div>
                    {/* Address input field */}
                    <label>Address</label>
                    <input
                      className="add-acc-input-text-field"
                      placeholder="Address"
                      type="text"
                    ></input>
                  </div>
                  <div>
                    {/* dropdown location NOT WORKING PROPERLY*/}
                    <label>Location</label>
                    <button
                      id="locationButton"
                      data-dropdown-toggle="dropdown"
                      className="inline-flex items-center rounded-lg bg-blue-700 px-4 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      type="button"
                    >
                      Location
                      <svg
                        className="ml-2 h-4 w-4"
                        aria-hidden="true"
                        viewBox="0 0 24 24"
                      ></svg>
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M19 9l-7 7-7-7"
                      ></path>
                    </button>

                    <div
                      id="dropdown"
                      className="z-10 hidden w-44 divide-y divide-gray-100 rounded-lg bg-white shadow dark:bg-gray-700"
                    >
                      <ul
                        className="py-2 text-sm text-gray-700 dark:text-gray-200"
                        aria-labelledby="locationButton"
                      >
                        <li>
                          <a
                            href="#"
                            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                          >
                            Dashboard
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                          >
                            Settings
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                          >
                            Earnings
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                          >
                            Sign out
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div>
                    {/* Landlord ID input field */}
                    <label>Landlord ID</label>
                    <input
                      className="add-acc-input-text-field"
                      placeholder="Landlord ID"
                      type="text"
                    ></input>
                  </div>
                  <div>
                    {/* Contact No input field */}
                    <label>Contact Number</label>
                    <input
                      className="add-acc-input-text-field"
                      placeholder="Contact No."
                      type="text"
                    ></input>
                  </div>
                </div>

                {/* Right Column */}
                <div>
                  <div>
                    {/* FB page link*/}
                    <label>Soc Med</label>
                    <input
                      className="add-acc-input-text-field"
                      placeholder="Facebook Page Link"
                      type="text"
                    ></input>
                  </div>

                  <div>
                    {/* No of Available Rooms */}
                    <label>No. of Available Rooms</label>
                    <input
                      className="add-acc-input-text-field"
                      placeholder="No. of Available Rooms"
                      type="text"
                    ></input>
                  </div>

                  <div>
                    {/* Upload Photos */}
                    <label>Upload File</label>
                    <input className="" id="file_input" type="file"></input>
                  </div>

                  <div>
                    {/* another damn dropdown NOT WORKING PROPERLY*/}
                    <label>Availability</label>
                    <button
                      id="locationButton"
                      data-dropdown-toggle="dropdown"
                      className="inline-flex items-center rounded-lg bg-blue-700 px-4 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      type="button"
                    >
                      Location
                      <svg
                        className="ml-2 h-4 w-4"
                        aria-hidden="true"
                        viewBox="0 0 24 24"
                      ></svg>
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M19 9l-7 7-7-7"
                      ></path>
                    </button>

                    <div
                      id="dropdown"
                      className="z-10 hidden w-44 divide-y divide-gray-100 rounded-lg bg-white shadow dark:bg-gray-700"
                    >
                      <ul
                        className="py-2 text-sm text-gray-700 dark:text-gray-200"
                        aria-labelledby="locationButton"
                      >
                        <li>
                          <a
                            href="#"
                            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                          >
                            Dashboard
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                          >
                            Settings
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                          >
                            Earnings
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                          >
                            Sign out
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <h2 className="">Tags</h2>
              {/* TAGS */}
              <div className="gap 4 margin-40 grid grid-cols-2">
                {/* LEFT COLUMN */}
                <div>
                  <div>
                    <select name="gender" id="gender">
                      <option value="">Coed</option>
                      <option value="">Male</option>
                      <option value="">Female</option>
                    </select>
                  </div>

                  <div>
                    <input type="checkbox" name="curfew"></input> Curfew
                  </div>
                  <div>
                    <input type="checkbox" name="cooking"></input> Cooking
                  </div>
                  <div>
                    <input type="checkbox" name="visitors"></input> Visitors
                  </div>
                  <div>
                    <input type="checkbox" name="pets"></input> Pets
                  </div>
                  <div>
                    <select name="bathroom" id="bathroom">
                      <option value="">Common</option>
                      <option value="">Private</option>
                    </select>
                  </div>
                </div>

                {/* Right COLUMN */}
                <div>
                  <div>
                    <input type="checkbox" name="pets"></input> Aircon
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
                    <input type="checkbox" name="pets"></input> Laundry Space
                  </div>
                  <div>
                    <input type="checkbox" name="pets"></input> Laundry Service
                  </div>
                </div>
              </div>

              <div>
                <label>Custom Tags</label>
                <input
                  type="text"
                  placeholder="custom tags"
                  className="add-acc-input-text-field"
                ></input>
              </div>

              <div className="items-right flex-1">
                <button type="reset" className="formButton">
                  Clear
                </button>
                <button type="submit" className="formButton">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="min-h-screen w-1/4 flex-none bg-yellow-100">03</div>
      </div>
    </div>
  );
}
