import React, { useState } from "react";
import SearchByCatalog from "./SearchByCatalog";
import SearchByRegister from "./SearchByRegister";

export default function CodeSearch({ onExemplarSelect }) {
  const [activeTab, setActiveTab] = useState("catalog");

  return (
    <div>
      <div>
        <button onClick={() => setActiveTab("catalog")}>
          buscar per catalog
        </button>
        <button onClick={() => setActiveTab("exemplar")}>
          buscar per codi de exemplar
        </button>
      </div>

      <div>
        {activeTab === "catalog" && <SearchByCatalog onExemplarSelect={onExemplarSelect} />}
        {activeTab === "exemplar" && (
          <SearchByRegister onExemplarSelect={onExemplarSelect} />
        )}
      </div>
    </div>
  );
}