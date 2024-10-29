import React from "react";
import CertImageCard from "./CertImageCard";

const CertContainer = ({certificates, setCardOpen, setCard}) => {
  const splitIntoColumns = (certs, numCols) => {
    const columnLength = Math.ceil(certs.length / numCols);
    return Array.from({length: numCols}, (_, index) =>
      certs.slice(index * columnLength, (index + 1) * columnLength)
    );
  };

  const columns =
    certificates.length > 3 ? splitIntoColumns(certificates, 3) : [certificates];

  return (
    <div
      className={`grid ${
        certificates.length > 3
          ? "grid-cols-3"
          : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
      } gap-4 p-2 h-72 overflow-auto`}>
      {columns.map((column, columnIndex) => (
        <div
          key={`column-${columnIndex}`}
          className='flex flex-col gap-4'>
          {column.map((cert, index) => (
            <CertImageCard
              cert={cert}
              key={`cert-${columnIndex}-${index}`}
              setCardOpen={setCardOpen}
              setCard={setCard}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default CertContainer;
