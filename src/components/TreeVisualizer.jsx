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

const TreeVisualizer = ({ nodes = [], edges = [] }) => {
  const [rfNodes, setRfNodes, onNodesChange] = useNodesState(nodes);
  const [rfEdges, setRfEdges, onEdgesChange] = useEdgesState(edges);

  useEffect(() => {
    setRfNodes(nodes);
    setRfEdges(edges);
  }, [nodes, edges, setRfNodes, setRfEdges]);

  return (
    <div className="w-full h-[600px] bg-white border rounded-xl shadow-sm">
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
