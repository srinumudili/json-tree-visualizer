import React, { useState } from "react";
import JsonInput from "./components/JsonInput";
import TreeVisualizer from "./components/TreeVisualizer";
import SearchBar from "./components/SearchBar";
import { jsonToNodes } from "./components/utils/jsonToNodes";

const App = () => {
  const [flowData, setFlowData] = useState({ nodes: [], edges: [] });
  const [highlightPath, setHighlightPath] = useState(null);

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
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-6 gap-4">
      <h1 className="text-2xl font-bold text-gray-800">
        JSON Tree Visualizer 🌳
      </h1>

      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-6">
        <JsonInput onValidJson={handleValidJson} />
        <div className="flex flex-col gap-4">
          <SearchBar onSearch={handleSearch} />
          <TreeVisualizer
            nodes={flowData.nodes}
            edges={flowData.edges}
            highlightPath={highlightPath}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
