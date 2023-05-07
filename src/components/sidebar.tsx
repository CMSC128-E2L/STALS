export default function SideBar() {
  return (
    <>
      {/* Filters */}
      <div className="max-w-1/6 mr-4 flex h-[90%] flex-col rounded-r-[60px] bg-p-lblue p-10">
        <h1 className="mb-5">Filter</h1>

        {/* Location */}
        <div className="mb-5">
          <h2 className="mb-2">Location</h2>
          <input
            className="rounded-2xl px-3 py-1"
            placeholder="Ex: Brgy. Batong Malake"
          ></input>
        </div>

        {/* Types */}
        <div>
          <h2>Types</h2>
          <div className="mb-2 mt-2 flex items-center">
            <input
              id="Apartments"
              type="checkbox"
              value=""
              className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
            />
            <label htmlFor="Apartments" className="ml-2 text-sm font-medium">
              Apartments
            </label>
          </div>

          <div className="mb-2 flex items-center">
            <input
              id="Bedspaces"
              type="checkbox"
              value=""
              className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
            />
            <label htmlFor="Bedspaces" className="ml-2 text-sm font-medium">
              Bedspaces
            </label>
          </div>

          <div className="mb-2 flex items-center">
            <input
              id="Dormitories"
              type="checkbox"
              value=""
              className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
            />
            <label htmlFor="Dormitories" className="ml-2 text-sm font-medium">
              Dormitories
            </label>
          </div>

          <div className="mb-2 flex items-center">
            <input
              id="Hotels"
              type="checkbox"
              value=""
              className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
            />
            <label htmlFor="Hotels" className="ml-2 text-sm font-medium">
              Hotels
            </label>
          </div>

          <div className="mb-2 flex items-center">
            <input
              id="Transients"
              type="checkbox"
              value=""
              className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
            />
            <label htmlFor="Transients" className="ml-2 text-sm font-medium">
              Transients
            </label>
          </div>
        </div>

        {/* Price Range */}
        <div className="mt-5">
          <h2>Price Range</h2>
          <div className="mb-2 mt-2 flex items-center">
            <input
              id="below-1000"
              type="checkbox"
              value=""
              className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
            />
            <label htmlFor="below-1000" className="ml-2 text-sm font-medium">
              Below ₱ 1000
            </label>
          </div>

          <div className="mb-2 flex items-center">
            <input
              id="one-to-two"
              type="checkbox"
              value=""
              className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
            />
            <label htmlFor="one-to-two" className="ml-2 text-sm font-medium">
              ₱ 1000 – ₱ 2000{" "}
            </label>
          </div>

          <div className="mb-2 flex items-center">
            <input
              id="two-to-three"
              type="checkbox"
              value=""
              className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
            />
            <label htmlFor="two-to-three" className="ml-2 text-sm font-medium">
              ₱ 2001 – ₱ 3000{" "}
            </label>
          </div>

          <div className="mb-2 flex items-center">
            <input
              id="three-to-four"
              type="checkbox"
              value=""
              className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
            />
            <label htmlFor="three-to-four" className="ml-2 text-sm font-medium">
              ₱ 3001 – ₱ 4000{" "}
            </label>
          </div>

          <div className="mb-2 flex items-center">
            <input
              id="above-four"
              type="checkbox"
              value=""
              className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
            />
            <label htmlFor="above-four" className="ml-2 text-sm font-medium">
              Above ₱ 4001
            </label>
          </div>
        </div>

        {/* Capacity */}
        <div className="mt-7 flex flex-col">
          <h2 className="mb-2">Capacity</h2>
          <label className="mb-2">
            <input
              type="radio"
              className="form-radio"
              name="radio-group"
              value="option1"
              defaultChecked
            />
            <span className="ml-2">Solo</span>
          </label>

          <label className="mb-2">
            <input
              type="radio"
              className="form-radio"
              name="radio-group"
              value="option1"
              defaultChecked
            />
            <span className="ml-2">2 Persons</span>
          </label>

          <label className="mb-2">
            <input
              type="radio"
              className="form-radio"
              name="radio-group"
              value="option1"
              defaultChecked
            />
            <span className="ml-2">3 Persons</span>
          </label>

          <label className="mb-2">
            <input
              type="radio"
              className="form-radio"
              name="radio-group"
              value="option1"
              defaultChecked
            />
            <span className="ml-2">4 Persons</span>
          </label>

          <label className="mb-2">
            <input
              type="radio"
              className="form-radio"
              name="radio-group"
              value="option1"
              defaultChecked
            />
            <span className="ml-2">More than 4</span>
          </label>
        </div>

        {/* Include */}
        <div className="mt-5">
          <h2 className="mb-2">Include</h2>
          <input
            className="rounded-2xl px-3 py-1"
            placeholder="Type for suggestions..."
          ></input>
        </div>
      </div>
    </>
  );
}
