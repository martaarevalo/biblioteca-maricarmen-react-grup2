import React, { useState } from "react";
import AsideListCode from "./AsideListCode";
import CodeSearch from "./CodeSearch";

export default function MainBarCode() {
  const [selectedExemplars, setSelectedExemplars] = useState([]);

  const handleAddExemplar = (exemplar) => {
    setSelectedExemplars((prev) => [...prev, exemplar]);
  };

  return (
    <div className="mainBarCodeContainer">
      {/* Pasar setSelectedExemplars como prop */}
      <AsideListCode 
        exemplarsList={selectedExemplars} 
        setExemplarsList={setSelectedExemplars} 
      />
      <div className="codeSearchArea">
        <CodeSearch onExemplarSelect={handleAddExemplar} />
      </div>
    </div>
  );
}