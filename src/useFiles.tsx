import axios from "axios";
import { useState } from "react";
import { set } from "react-hook-form";

export default function useFiles() {
    const [loading, setLoading] = useState<boolean>(false);
    const [finished, setFinished] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    let files: File[] = [];

    function onDrop(pdfFiles: File[]): void {
        files = pdfFiles;
        sendFiles();
    }

    function sendFiles(): void {
        // Create a new FormData object
        setLoading(true);
        const formData = new FormData();

        files.forEach((file) => {
            formData.append("files", file);
        });

        axios.post("http://127.0.0.1:5000/pdf_upload/signed_pdf", formData, {
            responseType: 'blob' // Aquí configuramos axios para manejar blobs
        })
            .then((response) => {
                // Crear un enlace temporal en el navegador para descargar el archivo
                const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'signed_pdf.zip'); // Aquí pones el nombre del archivo que quieres que se descargue
                document.body.appendChild(link);
                link.click();

                // Limpiar
                window.URL.revokeObjectURL(url);
                link.remove();
                setFinished(true);
                setLoading(false);
            })
            .catch((error) => {
                setError(error);
                console.error(error);
            });
    }

    return { files, onDrop, loading, finished, error};
}