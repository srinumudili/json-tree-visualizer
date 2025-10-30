import React, { useState } from "react";

const JsonInput = ({ onValidJson, placeholderJson }) => {
  const [jsonText, setJsonText] = useState(
    placeholderJson ||
      `{
  "user": {
    "name": "Srinu",
    "address": { "city": "Hyderabad", "zip": 500018 }
  },
  "items": [
    { "id": 1, "name": "Shirt", "price": 299 },
    { "id": 2, "name": "Jeans", "price": 799 }
  ],
  "active": true
}`
  );
  const [status, setStatus] = useState(null);
  const [message, setMessage] = useState("");

  // Validate JSON on button click
  const handleVisualize = () => {
    try {
      const parsed = JSON.parse(jsonText);
      setStatus("success");
      setMessage("✅ Valid JSON");
      if (onValidJson) onValidJson(parsed);
    } catch (err) {
      setStatus("error");
      setMessage("❌ Invalid JSON: " + err.message);
    }
  };

  // Reset input + state
  const handleClear = () => {
    setJsonText("");
    setStatus(null);
    setMessage("");
  };

  return (
    <div className="w-full p-4 bg-white rounded-xl shadow-sm border border-gray-200">
      <h2 className="text-lg font-semibold mb-3 text-gray-800">
        Paste or type JSON data
      </h2>

      <textarea
        className="w-full min-h-[200px] p-3 border border-gray-300 rounded-md text-sm font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500"
        placeholder="Paste your JSON here..."
        value={jsonText}
        onChange={(e) => setJsonText(e.target.value)}
      />

      <div className="flex gap-3 mt-4">
        <button
          onClick={handleVisualize}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md transition-colors"
        >
          Visualize
        </button>
        <button
          onClick={handleClear}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md transition-colors"
        >
          Clear
        </button>
      </div>

      {message && (
        <p
          className={`mt-3 text-sm font-medium ${
            status === "success" ? "text-green-600" : "text-red-600"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
};

export default JsonInput;
