import React, { useEffect, useState } from "react";
import JsonInput from "./components/JsonInput";
import TreeVisualizer from "./components/TreeVisualizer";
import SearchBar from "./components/SearchBar";
import { jsonToNodes } from "./components/utils/jsonToNodes";

const App = () => {
  const [flowData, setFlowData] = useState({ nodes: [], edges: [] });
  const [highlightPath, setHighlightPath] = useState(null);
  const [darkMode, setDarkMode] = useState(() => {
    // persist dark mode preference
    return localStorage.getItem("theme") === "dark";
  });

  // Apply dark mode class to <html> element
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const handleValidJson = (parsedJson) => {
    const { nodes, edges } = jsonToNodes(parsedJson);
    setFlowData({ nodes, edges });
    setHighlightPath(null);
  };

  const handleSearch = (path) => {
    if (!path) {
      setHighlightPath(null);
      return false;
    }

    const found = flowData.nodes.some(
      (node) =>
        node.data.path === path ||
        node.data.path.replace("$.", "") === path.replace("$.", "")
    );

    if (found) {
      setHighlightPath(path);
      return true;
    } else {
      setHighlightPath(null);
      return false;
    }
  };

  return (
    <div
      className={`min-h-screen flex flex-col items-center p-6 gap-4 transition-colors duration-300 
        ${darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-800"}
      `}
    >
      {/* Header + Toggle */}
      <div className="w-full max-w-6xl flex justify-between items-center">
        <h1 className="text-2xl font-bold">JSON Tree Visualizer 🌳</h1>

        <button
          onClick={() => setDarkMode((prev) => !prev)}
          className="px-4 py-2 text-sm rounded-md bg-indigo-600 hover:bg-indigo-700 text-white transition"
        >
          {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>

      {/* Main Layout */}
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-6">
        <JsonInput onValidJson={handleValidJson} />
        <div className="flex flex-col gap-4">
          <SearchBar onSearch={handleSearch} />
          <TreeVisualizer
            nodes={flowData.nodes}
            edges={flowData.edges}
            highlightPath={highlightPath}
            darkMode={darkMode} // 👈 pass theme to visualizer
          />
        </div>
      </div>
    </div>
  );
};

export default App;
