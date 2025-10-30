import React, { useState } from "react";
import { CheckCircle, XCircle, Trash2, Eye } from "lucide-react";

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

  // Validate JSON
  const handleVisualize = () => {
    try {
      const parsed = JSON.parse(jsonText);
      setStatus("success");
      setMessage("Valid JSON");
      if (onValidJson) onValidJson(parsed);
    } catch (err) {
      setStatus("error");
      setMessage(err.message);
    }
  };

  // Clear input
  const handleClear = () => {
    setJsonText("");
    setStatus(null);
    setMessage("");
  };

  return (
    <div className="w-full max-w-3xl p-6 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700 bg-linear-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 transition-colors">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100 flex items-center gap-2">
        🧩 JSON Input
      </h2>

      <textarea
        className="w-full min-h-[220px] p-3 border border-gray-300 dark:border-gray-700 rounded-lg text-sm font-mono bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
        placeholder="Paste your JSON here..."
        value={jsonText}
        onChange={(e) => setJsonText(e.target.value)}
      />

      <div className="flex flex-wrap gap-3 mt-5">
        <button
          onClick={handleVisualize}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-lg font-medium shadow-sm transition-colors"
        >
          <Eye size={18} /> Visualize
        </button>
        <button
          onClick={handleClear}
          className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-100 px-4 py-2.5 rounded-lg font-medium transition-colors"
        >
          <Trash2 size={18} /> Clear
        </button>
      </div>

      {message && (
        <div
          className={`mt-4 flex items-center gap-2 text-sm font-medium ${
            status === "success"
              ? "text-green-600 dark:text-green-400"
              : "text-red-600 dark:text-red-400"
          }`}
        >
          {status === "success" ? (
            <CheckCircle size={18} />
          ) : (
            <XCircle size={18} />
          )}
          <span>
            {status === "success"
              ? "✅ Valid JSON"
              : `❌ Invalid JSON: ${message}`}
          </span>
        </div>
      )}
    </div>
  );
};

export default JsonInput;
