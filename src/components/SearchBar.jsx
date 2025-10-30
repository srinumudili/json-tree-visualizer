import React, { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [path, setPath] = useState("");
  const [feedback, setFeedback] = useState("");

  const handleSearch = () => {
    if (!path.trim()) {
      setFeedback("⚠️ Please enter a JSON path");
      return;
    }

    const normalizedPath = path.trim().startsWith("$")
      ? path.trim()
      : `$.${path.trim()}`;

    const found = onSearch(normalizedPath); // returns true/false from parent

    if (found) {
      setFeedback("✅ Match found");
    } else {
      setFeedback("❌ No match found");
    }
  };

  const handleClear = () => {
    setPath("");
    setFeedback("");
  };

  return (
    <div className="w-full flex flex-col md:flex-row gap-3 items-center p-3 border rounded-xl shadow-sm border-gray-200 dark:border-gray-700 bg-linear-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 transition-colors">
      <input
        type="text"
        placeholder="Enter JSON path e.g. $.user.address.city"
        value={path}
        onChange={(e) => setPath(e.target.value)}
        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <div className="flex gap-2">
        <button
          onClick={handleSearch}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md"
        >
          Search
        </button>
        <button
          onClick={handleClear}
          className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-md"
        >
          Clear
        </button>
      </div>
      {feedback && (
        <p
          className={`text-sm font-medium mt-2 md:mt-0 md:ml-4 ${
            feedback.startsWith("✅")
              ? "text-green-600"
              : feedback.startsWith("❌")
              ? "text-red-600"
              : "text-yellow-600"
          }`}
        >
          {feedback}
        </p>
      )}
    </div>
  );
};

export default SearchBar;
