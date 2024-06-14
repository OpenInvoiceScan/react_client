import React from "react";

interface PDFFilesProps {
  files: File[];
}

export default function PDFFiles({ files }: PDFFilesProps) {
  return (
    <>
      <div className="pdf_files_main">
        <h2>Archivos PDF</h2>
        <div className="pdf_files_container">
          {files.map((file, index) => (
            <div key={index} className="pdf_file">
              <p>{file.name}</p>
              <p className="file_size_text">Tamaño: {(file.size / 1024).toFixed(2)} KB</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
