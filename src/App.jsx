import React, { useState } from "react";
import JsonInput from "./components/JsonInput.jsx";
import { jsonToNode } from "./components/utils/jsonToNodes.js";
import TreeVisualizer from "./components/TreeVisualizer.jsx";

const App = () => {
  const [flowData, setFlowData] = useState({ nodes: [], edges: [] });
  const handleValidJson = (data) => {
    const { nodes, edges } = jsonToNode(data);
    setFlowData({ nodes, edges });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col gap-6 items-center p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-2">
        JSON Tree Visualizer 🌳
      </h1>

      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-6">
        <JsonInput onValidJson={handleValidJson} />
        <TreeVisualizer nodes={flowData.nodes} edges={flowData.edges} />
      </div>
    </div>
  );
};

export default App;
