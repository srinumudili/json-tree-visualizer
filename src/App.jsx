import React from "react";
import JsonInput from "./components/JsonInput.jsx";

const App = () => {
  const handleValidJson = (data) => {
    console.log("Valid JSON parsed:", data);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="max-w-3xl w-full">
        <JsonInput onValidJson={handleValidJson} />
      </div>
    </div>
  );
};

export default App;
