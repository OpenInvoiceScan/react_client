import React, { useCallback } from "react";
import { useDropzone, DropzoneOptions } from "react-dropzone";

interface PDFDropzoneProps {
  onDrop: (acceptedFiles: File[]) => void;
}

const PDFDropzone: React.FC<PDFDropzoneProps> = ({ onDrop }) => {
  const onDropCallback = useCallback(
    (acceptedFiles: File[]) => {
      // Filtrar solo archivos PDF
      const pdfFiles = acceptedFiles.filter(
        (file) => file.type === "application/pdf"
      );
      onDrop(pdfFiles);
    },
    [onDrop]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: onDropCallback,
    accept: { "application/pdf": [] },
  } as DropzoneOptions);

  return (
    <div className="main_dropzone" {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <> </>
      ) : (
        <p>
          Arrastra y suelta algunos archivos PDF aquí, o haz clic para
          seleccionar archivos
        </p>
      )}

      {isDragActive && (
        <div className="dropzone_overlay">
          <p>Suelta los archivos aquí ...</p>
        </div>
      )}
    </div>
  );
};

export default PDFDropzone;
