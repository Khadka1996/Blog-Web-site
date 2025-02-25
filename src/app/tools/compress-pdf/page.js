'use client'
import { useState } from "react";
import axios from "axios";
import { saveAs } from "file-saver";

export default function PdfCompressor() {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const compressPdf = async () => {
        if (!file) {
            alert("Please select a PDF file first!");
            return;
        }

        setLoading(true);

        try {
            const formData = new FormData();
            formData.append("file", file);

            const response = await axios.post("https://api.ilovepdf.com/v1/compress", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Authorization": "Bearer project_public_a193a30d4ef3527c5db6dd963f2144e1_Wf5PEedf94044b8b9eb005d6dd2bae5ef5da7", // Replace with your API Key
                },
                responseType: "blob", // Get compressed PDF as a blob
            });

            // Download the compressed file
            saveAs(response.data, "compressed.pdf");
        } catch (error) {
            console.error("Compression failed:", error);
            alert("Compression failed! Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-4 border rounded-lg shadow-md w-full max-w-md">
            <input type="file" accept="application/pdf" onChange={handleFileChange} className="mb-2" />
            <button
                onClick={compressPdf}
                className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-400 w-full"
                disabled={!file || loading}
            >
                {loading ? "Compressing..." : "Compress PDF"}
            </button>
        </div>
    );
}
