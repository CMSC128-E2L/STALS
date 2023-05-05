export default function Accommodation() {
  return (
    <div className="temp">
      {/* HEADER */}
      <header className="sticky top-0 mx-auto mb-5 flex flex-wrap items-center justify-between bg-p-dblue p-4">
        {/* Left side */}
        <div className="items-center align-middle">
          <a href="" className="flex items-center">
            <img
              src="https://www.pngfind.com/pngs/m/439-4392840_facebook-link-icon-image-dynamic-spectrum-alliance-pink.png"
              className="mr-3 h-12 rounded-3xl"
              alt="STALS Logo"
            />
            <h1 className="self-center text-4xl font-bold text-white">STALS</h1>
          </a>
        </div>

        {/* Right side */}
        <div className="w-full md:block md:w-auto">
          <ul className="mt-4 flex flex-col items-center p-4 font-medium md:mt-0 md:flex-row md:space-x-8 md:border-0 md:p-0 ">
            <li>
              <input
                className="rounded-2xl px-3 py-1"
                placeholder="Search"
              ></input>
            </li>
            <li>{/* image placeholder */}</li>
          </ul>
        </div>
      </header>
      {/* BODY */}
      <div>
        {/* LANDLORD PROFILE */}
        <div className="position-left ml-10 w-1/4 bg-yellow-100 p-4 py-2">
          <div className="grid grid-cols-2 rounded-md bg-white px-10 shadow-md">
            {/* Insert Landlord Image here */}
            <img
              src="public/placeholder_1.png"
              className="mr-3 h-12 rounded-full"
            ></img>
            <div>
              <h1 className="name"> Alfred Santos</h1>
              <label>Date | time</label>
            </div>
          </div>
        </div>
        {/* cONTAINS THE ACCOMMODATION INFO */}
        <div className="flex min-h-screen justify-center">
          {/* Box that contains the accommodation thingy */}
          <div className="margin-40 flex w-11/12 gap-2 bg-p-lblue p-4 py-4 shadow-md">
            {/* GALLERY */}
            <div className="w-1/3 flex-none bg-red-100">a</div>
            {/* DESCRIPTION */}
            <div className="w-3/4 flex-initial bg-green-100 p-4">
              <div className="bg-purple-100">a</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
