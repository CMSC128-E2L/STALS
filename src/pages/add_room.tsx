export default function Add_Room() {
  return (
    <div className="">
      <h3 className="bg-blue-500 p-4">NAVBAR PLACEHOLDER</h3>
      <button
        type="button"
        className="mx-4 mt-2 font-bold text-blue-500 drop-shadow-md"
      >
        Back
      </button>
      <br />
      <br />

      <div className="container mx-auto rounded">
        <div className="rounded-xl bg-blue-200 p-6">
          <p className="mb-2 text-center text-xl font-bold drop-shadow-md">
            Add Room
          </p>
          <p className="mx-2 mb-3 text-lg font-bold drop-shadow-md">
            Background
          </p>

          <div className="flex w-full flex-col space-y-2">
            <input
              type="text"
              id="accomm-id"
              className="w-1/2 rounded border bg-gray-50 p-2 px-4 text-sm text-gray-900 drop-shadow-md focus:border-gray-500"
              placeholder="Accommodation ID"
            />

            <input
              type="text"
              id="room-id"
              className="w-1/2 rounded border bg-gray-50 p-2 px-4 text-sm text-gray-900 drop-shadow-md focus:border-gray-500"
              placeholder="Room ID"
            />

            <div className="w-1/2 rounded bg-white p-2 drop-shadow-md">
              <p className="mx-2 mb-1 text-gray-400">Occupied</p>
              <div className="mx-2">
                <div className="flex w-full flex-row space-x-2">
                  <div className="flex items-center">
                    <input
                      id="occupied_t"
                      type="radio"
                      value="true"
                      name="occupied"
                      className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <label htmlFor="true" className="ml-2 text-gray-400">
                      True
                    </label>
                  </div>

                  <div className="flex items-center">
                    <input
                      id="occupied_f"
                      type="radio"
                      value="false"
                      name="occupied"
                      className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <label htmlFor="false" className="ml-2 text-gray-400">
                      False
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <input
              type="text"
              id="num-of-beds"
              className="w-1/2 rounded border bg-gray-50 p-2 px-4 text-sm text-gray-900 drop-shadow-md focus:border-gray-500"
              placeholder="No. of beds"
            />

            <input
              type="text"
              id="price"
              className="w-1/2 rounded border bg-gray-50 p-2 px-4 text-sm text-gray-900 drop-shadow-md focus:border-gray-500"
              placeholder="Price"
            />
          </div>

          <div className="h-20 w-full bg-blue-200"></div>
          <div className="flex w-full flex-row space-x-2">
            <div className="w-full bg-blue-200"></div>

            <button className="mt-2 rounded border border-gray-400 bg-white p-2">
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
