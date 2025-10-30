import {
  Background,
  Controls,
  MiniMap,
  ReactFlow,
  useEdgesState,
  useNodesState,
} from "@xyflow/react";
import { useEffect } from "react";
import "@xyflow/react/dist/style.css";

const TreeVisualizer = ({ nodes = [], edges = [], highlightPath }) => {
  const [rfNodes, setRfNodes, onNodesChange] = useNodesState(nodes);
  const [rfEdges, setRfEdges, onEdgesChange] = useEdgesState(edges);

  useEffect(() => {
    setRfNodes(
      nodes.map((node) => {
        const isHighlighted =
          highlightPath &&
          (node.data.path === highlightPath ||
            node.data.path.replace("$.", "") ===
              highlightPath.replace("$.", ""));

        return {
          ...node,
          style: {
            ...node.style,
            boxShadow: isHighlighted
              ? "0 0 0 4px rgba(99,102,241,0.5)"
              : "none",
          },
        };
      })
    );
    setRfEdges(edges);
  }, [nodes, edges, highlightPath, setRfNodes, setRfEdges]);

  return (
    <div className="w-full h-[600px] rounded-xl shadow-sm border-gray-200 dark:border-gray-700 bg-linear-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 text-gray-800 dark:text-gray-600 transition-colors">
      <ReactFlow
        nodes={rfNodes}
        edges={rfEdges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
      >
        <Background color="#eee" gap={16} />
        <Controls />
        <MiniMap
          nodeStrokeColor={(n) => {
            if (n.data.nodeType === "object") return "#8b5cf6";
            if (n.data.nodeType === "array") return "#10b981";
            return "#f59e0b";
          }}
          nodeColor={(n) => {
            if (n.data.nodeType === "object") return "#ede9fe";
            if (n.data.nodeType === "array") return "#d1fae5";
            return "#fef3c7";
          }}
        />
      </ReactFlow>
    </div>
  );
};

export default TreeVisualizer;
