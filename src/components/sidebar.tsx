import { useState } from "react";

export default function SideBar() {
  return (
    <>
      {/* Filters */}
      <div className="flex flex-col bg-p-lblue p-5">
        {/* Location */}
        <div className="mb-4">
          <h2 className="mb-2 text-base font-bold">Location</h2>
          <Location />
        </div>

        {/* Types */}
        <div className="mb-4">
          <h2 className="mb-2 text-base font-bold">Types</h2>
          <div className="mb-2 flex items-center">
            <input
              id="Apartments"
              type="checkbox"
              value=""
              className="ml-3 h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
            />
            <label htmlFor="Apartments" className="filter-text ">
              Apartments
            </label>
          </div>

          <div className="mb-2 flex items-center">
            <input
              id="Bedspaces"
              type="checkbox"
              value=""
              className="ml-3 h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
            />
            <label htmlFor="Bedspaces" className="filter-text">
              Bedspaces
            </label>
          </div>

          <div className="mb-2 flex items-center">
            <input
              id="Dormitories"
              type="checkbox"
              value=""
              className="ml-3 h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
            />
            <label htmlFor="Dormitories" className="filter-text">
              Dormitories
            </label>
          </div>

          <div className="mb-2 flex items-center">
            <input
              id="Hotels"
              type="checkbox"
              value=""
              className="ml-3 h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
            />
            <label htmlFor="Hotels" className="filter-text">
              Hotels
            </label>
          </div>

          <div className="flex items-center">
            <input
              id="Transients"
              type="checkbox"
              value=""
              className="ml-3 h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
            />
            <label htmlFor="Transients" className="filter-text">
              Transients
            </label>
          </div>
        </div>

        {/* Price Range */}
        <div className="mb-4">
          <h2 className="mb-2 text-base font-bold">Price Range</h2>
          <div className="mb-2 flex items-center">
            <input
              id="below-1000"
              type="checkbox"
              value=""
              className="ml-3 h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
            />
            <label htmlFor="below-1000" className="filter-text">
              Below ₱ 1000
            </label>
          </div>

          <div className="mb-2 flex items-center">
            <input
              id="one-to-two"
              type="checkbox"
              value=""
              className="ml-3  h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
            />
            <label htmlFor="one-to-two" className="filter-text">
              ₱ 1000 – ₱ 2000{" "}
            </label>
          </div>

          <div className="mb-2 flex items-center">
            <input
              id="two-to-three"
              type="checkbox"
              value=""
              className="ml-3  h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
            />
            <label htmlFor="two-to-three" className="filter-text">
              ₱ 2001 – ₱ 3000{" "}
            </label>
          </div>

          <div className="mb-2 flex items-center">
            <input
              id="three-to-four"
              type="checkbox"
              value=""
              className="ml-3 h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
            />
            <label htmlFor="three-to-four" className="filter-text">
              ₱ 3001 – ₱ 4000{" "}
            </label>
          </div>

          <div className="flex items-center">
            <input
              id="above-four"
              type="checkbox"
              value=""
              className="ml-3 h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
            />
            <label htmlFor="above-four" className="filter-text">
              Above ₱ 4001
            </label>
          </div>
        </div>

        {/* Capacity */}
        <div className="mb-4 flex flex-col">
          <h2 className="mb-2 text-base font-bold">Capacity</h2>
          <label className="mb-1">
            <input
              type="radio"
              className="form-radio ml-3"
              name="radio-group"
              value="option1"
              defaultChecked
            />
            <span className="filter-text">Solo</span>
          </label>

          <label className="mb-1">
            <input
              type="radio"
              className="form-radio ml-3"
              name="radio-group"
              value="option1"
              defaultChecked
            />
            <span className="filter-text">2 Persons</span>
          </label>

          <label className="mb-1">
            <input
              type="radio"
              className="form-radio ml-3"
              name="radio-group"
              value="option1"
              defaultChecked
            />
            <span className="filter-text">3 Persons</span>
          </label>

          <label className="mb-1">
            <input
              type="radio"
              className="form-radio ml-3"
              name="radio-group"
              value="option1"
              defaultChecked
            />
            <span className="filter-text">4 Persons</span>
          </label>

          <label className="">
            <input
              type="radio"
              className="form-radio ml-3"
              name="radio-group"
              value="option1"
              defaultChecked
            />
            <span className="filter-text">More than 4</span>
          </label>
        </div>

        {/* Include */}
        <div className="mb-4">
          <h2 className="mb-2 text-base font-bold">Include</h2>
          <input
            className="filter-search"
            placeholder="Type for suggestions..."
          ></input>
        </div>
      </div>
    </>
  );
}

const Location: React.FC = () => {
  // this will be used in the filter button for the location
  const [value, setValue] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const suggestions = [
    "Brgy. Anos",
    "Brgy. Batong Malake",
    "Brgy. Mayondon",
    "Brgy. Putho-Tuntungin",
  ]; //! TODO: this is hardcoded

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value);
    setShowSuggestions(event.target.value !== "");
  }

  function handleSuggestionClick(suggestion: string) {
    setValue(suggestion);
    setShowSuggestions(false);
  }

  return (
    <div className="relative">
      <div>
        <input
          type="text"
          value={value}
          onChange={handleChange}
          className="filter-search"
          placeholder="Type for suggestions..."
        />
        {showSuggestions && (
          <ul className="absolute mt-1 flex w-full flex-col space-y-1 rounded-xl bg-white p-3 text-black shadow shadow-lg shadow-lg dark:bg-white dark:text-black">
            {suggestions
              .filter((suggestion) =>
                suggestion.toLowerCase().includes(value.toLowerCase()),
              )
              .map((suggestion) => (
                <li
                  key={suggestion}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="dropdown-buttons"
                >
                  {highlightMatchedSubstring(suggestion)}
                </li>
              ))}
          </ul>
        )}
      </div>
    </div>
  );

  function highlightMatchedSubstring(suggestion: string) {
    const index = suggestion.toLowerCase().indexOf(value.toLowerCase());
    if (index < 0) return suggestion;
    return (
      <>
        {suggestion.substring(0, index)}
        <span style={{ fontWeight: "bold" }}>
          {suggestion.substring(index, index + value.length)}
        </span>
        {suggestion.substring(index + value.length)}
      </>
    );
  }
};
