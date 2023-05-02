export default function AddAccomodation() {
  return (
    <div className="thing">
      {/* Header */}
      <nav className="border-gray-200 bg-white dark:bg-gray-900">
        TODO: add navbar
      </nav>
      {/* Body */}
      {/* Middle Column Contains Form */}
      <div className="flex min-h-screen basis-6/8 items-center justify-center bg-white overflow-y-auto">
        {/* BOX THAT CONTAINS THE FORM */}
        <div className="margin-40 w-3/4 justify-center rounded-xl bg-p-lblue p-4 shadow-md py-4">

          <div>
            <h1 className="form-h1">
              Add Accommodation
            </h1>
          </div>

          <form className="space-y-4">
            <div>
              <h2 className="form-h2">Accommodation Background</h2>
                {/* Accommodation background deets */}
              <div className="gap-9 margin-40 grid grid-cols-2 object-contain px-9">
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
                      {/* Address input field */}
                      
                      <input
                        className="add-acc-input-text-field"
                        placeholder="Address"
                        type="text"
                        required
                      ></input>
                    </div>
                    
                    <div>
                      
                      <div className="bg-white rounded-md p-1 justify-items-stretch w-full h-10 items-center">
                        <select name="availability" className="form-dropdown" placeholder="Location">
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
                      
                      <div className="bg-white rounded-md p-1 grid grid-cols-2 justify-items-stretch w-full h-10 items-center">
                        {/* Upload Photos */}
                        <label className="input-text-box-label px-4">Upload File</label>
                        <div className="justify-self-end">
                          <input className="" id="file_input" type="file"></input>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      
                      <div className="bg-white rounded-md p-1 justify-items-stretch w-full h-10 items-center">
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
              <div className="gap-4 margin-40 grid grid-cols-2">
                {/* LEFT COLUMN */}
                <div className="form-col-deets">
                  <div>
                    
                    <div className="bg-white rounded-md p-1 justify-items-stretch w-full h-10 items-center">
                      <select name="gender" className="form-dropdown">
                        <option value="">Coed</option>
                        <option value="">Male</option>
                        <option value="">Female</option>
                      </select>
                    </div>
                  </div>
                  <div className="text-lg">
                    <div>
                      <input type="checkbox" name="curfew" className="peer"></input> Curfew
                      <div className="flex-shri invisible peer-checked:visible">
                        <input type="text" className="add-acc-input-text-field" placeholder="time"></input>
                      </div>
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
                  </div>
                  <div>
                    
                    <div className="bg-white rounded-md p-1 justify-items-stretch w-full h-10 items-center">
                      <select name="gender" className="form-dropdown">
                        <option value="">Communal</option>
                        <option value="">Private</option>
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
                      <input type="checkbox" name="pets"></input> Parking
                    </div>
                    <div>
                      <input type="checkbox" name="pets"></input> CCTV
                    </div>
                    <div>
                      <input type="checkbox" name="pets"></input> Guards
                    </div>
                    <div>
                      <input type="checkbox" name="Laundry" className="peer"></input> Laundry Service
                    
                    {/* MAX AND MIN FEES FOR LAUNDRY SERVICE */}
                  <div className="flex grid grid-cols-2 gap-4 w-1/2 invisible peer-checked:visible">
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
              <div>
                
                <input
                  type="text"
                  placeholder="Custom tags"
                  className="add-acc-input-text-field"
                ></input>
              </div>
            </div>

            <div className="items-right flex-1 space-x-3">
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
  </div>
  );
}
