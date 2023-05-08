<h3 class="bg-blue-500 p-4">NAVBAR PLACEHOLDER</h3>
<button type="button" class="mx-4 mt-2 font-bold text-blue-500 drop-shadow-md">Back</button>
<br /><br />

<div class="container mx-auto rounded">
  <div class="rounded-xl bg-blue-200 p-6">
    <p class="mb-2 text-center text-xl font-bold drop-shadow-md">Add Room</p>
    <p class="mx-2 mb-3 text-lg font-bold drop-shadow-md">Background</p>

    <div class="flex w-full flex-col space-y-2">
      <input type="text" id="accomm-id" class="w-1/2 rounded border bg-gray-50 p-2 px-4 text-sm text-gray-900 drop-shadow-md focus:border-gray-500" placeholder="Accommodation ID" />

      <input type="text" id="room-id" class="w-1/2 rounded border bg-gray-50 p-2 px-4 text-sm text-gray-900 drop-shadow-md focus:border-gray-500" placeholder="Room ID" />

      <div class="w-1/2 rounded bg-white p-2 drop-shadow-md">
        <p class="mx-2 mb-1 text-gray-400">Occupied</p>
        <div class="mx-2">
          <div class="flex w-full flex-row space-x-2">
            <div class="flex items-center">
              <input id="occupied_t" type="radio" value="true" name="occupied" class="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500" />
              <label for="true" class="ml-2 text-gray-400">True</label>
            </div>

            <div class="flex items-center">
              <input id="occupied_f" type="radio" value="false" name="occupied" class="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500" />
              <label for="false" class="ml-2 text-gray-400">False</label>
            </div>
          </div>
        </div>
      </div>

      <input type="text" id="num-of-beds" class="w-1/2 rounded border bg-gray-50 p-2 px-4 text-sm text-gray-900 drop-shadow-md focus:border-gray-500" placeholder="No. of beds" />

      <input type="text" id="price" class="w-1/2 rounded border bg-gray-50 p-2 px-4 text-sm text-gray-900 drop-shadow-md focus:border-gray-500" placeholder="Price" />
    </div>
  </div>
</div>
