let nodeCounter = 0;

export function jsonToNodes(jsonData) {
  nodeCounter = 0;
  const nodes = [];
  const edges = [];

  const xGap = 250;
  const yGap = 120;

  function traverse(
    value,
    parentId = null,
    depth = 0,
    xOffset = 0,
    path = "$"
  ) {
    const id = `node_${nodeCounter++}`;

    const type = Array.isArray(value)
      ? "array"
      : value !== null && typeof value === "object"
      ? "object"
      : "primitive";

    const label =
      type === "primitive"
        ? `${path.split(".").pop()}: ${String(value)}`
        : path.split(".").pop() || "root";

    const background =
      type === "object" ? "#e0d4ff" : type === "array" ? "#c8facc" : "#ffecb3";

    // Create the node
    const node = {
      id,
      data: { label, value, path, nodeType: type },
      position: { x: xOffset, y: depth * yGap },
      style: {
        background,
        border: "1px solid #555",
        borderRadius: 8,
        padding: 10,
        width: 140,
        textAlign: "center",
        fontFamily: "monospace",
        fontSize: 13,
        fontWeight: 500,
      },
    };

    nodes.push(node);

    if (parentId) {
      edges.push({
        id: `edge_${parentId}_${id}`,
        source: parentId,
        target: id,
        type: "smoothstep",
        style: { stroke: "#666", strokeWidth: 2 },
      });
    }

    const children =
      type === "object"
        ? Object.entries(value)
        : type === "array"
        ? value.map((v, i) => [i, v])
        : [];

    if (children.length > 0) {
      const totalWidth = (children.length - 1) * xGap;
      const startX = xOffset - totalWidth / 2;

      children.forEach(([key, childValue], index) => {
        const childXOffset = startX + index * xGap;
        traverse(
          childValue,
          id,
          depth + 1,
          childXOffset,
          `${path}.${key}`,
          index,
          children.length
        );
      });
    }
  }

  // start recursion
  traverse(jsonData, null, 0, 0);
  return { nodes, edges };
}
