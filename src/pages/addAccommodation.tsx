export default function AddAccomodation() {
  return (
    <div>
      {/* Header design */}
      <header>
        <p>sample header</p>
      </header>
      {/* Container for Accommodation details */}
      <div className="absolute inset-0 mt-32 flex content-center justify-center">
        <div className="h-[28rem] w-1/3 rounded-xl bg-white p-20 shadow shadow-p-black/50">
          <form>
            <div className="flex flex-col space-y-4">
              <input
                name="lodgename"
                type="text"
                placeholder="Lodge Name"
              ></input>
              <input name="address" type="text" placeholder="Address"></input>
              <select name="location" id="location">
                <option value="">Location 1</option>
                <option value="">Location 2</option>
                <option value="">Location 3</option>
              </select>
              <input
                name="landlordid"
                type="text"
                placeholder="Landlord ID"
              ></input>
              <input
                name="contactno"
                type="text"
                placeholder="Contact Number"
              ></input>
              <input
                type="text"
                name="fbpage"
                placeholder="Facebook Page Link (optional)"
              ></input>
              <input
                type="text"
                name="rooms"
                placeholder="Number of Available Rooms"
              ></input>
              <input type="text" name="photos" placeholder="Photos"></input>
              <input
                type="text"
                name="availability"
                placeholder="Availability"
              ></input>

              <select name="gender" id="gender">
                <option value="">Coed</option>
                <option value="">Male</option>
                <option value="">Female</option>
              </select>

              {/* TAGS */}
              <input type="checkbox" name="curfew"></input>

              <input type="checkbox" name="cookingallowed"></input>

              <input type="checkbox" name="visitorsallowed"></input>

              <input type="checkbox" name="petsallowed"></input>

              <input type="checkbox" name="bathroom"></input>

              <input type="checkbox" id="withaircon" name="withaircon"></input>
              <label>With Aircon</label>

              <input type="checkbox" name="withparking"></input>
              <label>With Parking Space</label>

              <input type="checkbox" name="hascctv"></input>
              <label>Has CCTV</label>

              <input type="checkbox" name="hasguards"></input>
              <label>Has Guards</label>

              <input type="checkbox" name="withlaundryspace"></input>
              <label>Laundry Space Available</label>

              <input type="checkbox" name="withlaundryservice"></input>
              <label>Laundry Service Available</label>

              <input
                type="text"
                name="customtag1"
                placeholder="Custom Tags (optional)"
              ></input>
            </div>
          </form>
          <br />

          {/* Log-in, help, sign-up buttons */}
          <div>
            <button className="group relative flex w-full justify-center rounded-lg bg-p-dblue px-4 py-2 text-white">
              <b>Log In</b>
            </button>
            <br />
            <p className="text-center text-sm text-gray-400">
              If you are having issues logging in, please contact an{" "}
              <a className="text-cyan-500 underline" href="">
                administrator
              </a>
              .
            </p>
            <br />
            <p className="text-center text-sm text-gray-400">
              Don&apos;t have an account yet?{" "}
              <a className="text-cyan-500 underline" href="">
                Sign Up
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
