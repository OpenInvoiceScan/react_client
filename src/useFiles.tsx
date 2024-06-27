import axios from "axios";
import { useState } from "react";


const SERVER_URL = import.meta.env.VITE_SERVER_URL;

export default function useFiles() {
    const [loading, setLoading] = useState<boolean>(false);
    const [finished, setFinished] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [invoices, setInvoices] = useState<Invoice[]>([]);
    const [onlyJson, setOnlyJson] = useState<boolean>(false);
    let files: File[] = [];

    function onDrop(pdfFiles: File[]): void {
        files = pdfFiles;
        if (!onlyJson) sendFiles();
        if (onlyJson) sendJson();
    }

    function handleJsonOption(state : boolean ): void {
        setOnlyJson(state);
    }

    function sendFiles(): void {
        setLoading(true);
        const formData = new FormData();

        files.forEach((file) => {
            formData.append("files", file);
        });

        axios.post(`${SERVER_URL}/pdf_upload/signed_pdf`, formData, {
            responseType: 'blob'
        })
            .then((response) => {
                const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'signed_pdf.zip');
                document.body.appendChild(link);
                link.click();

                window.URL.revokeObjectURL(url);
                link.remove();
                setFinished(true);
                setLoading(false);
            })
            .catch((error) => {
                setError(error.message);
                setLoading(false);
                console.error(error);
            });
    }

    function sendJson(): void {
        setLoading(true);
        const formData = new FormData();
        files.forEach((file) => {
            formData.append("files", file);
        });

        axios.post(`${SERVER_URL}/pdf_upload/json`, formData, {
            responseType: 'json'
        })
            .then((response) => {
                setInvoices(response.data);
                console.log(response.data);
                setFinished(true);
                setLoading(false);
            })
            .catch((error) => {
                setError(error.message);
                setLoading(false);
                console.error(error);
            });
    }

    return { files, onDrop, loading, finished, error, invoices, onlyJson, handleJsonOption};
}
