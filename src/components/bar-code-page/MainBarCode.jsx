import React, { useState } from "react";
import AsideListCode from "./AsideListCode";
import CodeSearch from "./CodeSearch";

export default function MainBarCode() {
  const [selectedExemplars, setSelectedExemplars] = useState([]);

  const handleAddExemplar = (exemplar) => {
    setSelectedExemplars((prev) => [...prev, exemplar]);
  };

  return (
    <>
      <AsideListCode exemplarsList={selectedExemplars} />
      <CodeSearch onExemplarSelect={handleAddExemplar} />
    </>
  );
}