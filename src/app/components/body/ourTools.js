import React from "react";
import { FaDownload, FaFilePdf, FaRegFilePdf } from "react-icons/fa"; // Import React Icons

const OurTools = () => {
  return (
    <div className="max-w-screen-xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h2 className="text-4xl font-bold text-center mb-8 text-gray-900">Our Tools</h2>
      <div className="mx-3 md:mx-10 lg:mx-18">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {/* Video Downloader Tool */}
          <div className="relative flex flex-col items-center bg-white p-6 rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105">
            <a href="/tools/video-downloader" className="absolute inset-0 z-10" />
            <div className="w-full h-48 flex items-center justify-center bg-gray-100 rounded-lg mb-4">
              <FaDownload size="3rem" className="text-[#52aa4d] mb-4" />
            </div>
            <div className="relative z-20 flex flex-col items-center">
              <h3 className="text-xl font-semibold text-gray-900">Video Downloader</h3>
              <p className="text-center text-gray-600 mt-2">
                Combine PDFs in the order you want with the easiest PDF merger available.
              </p>
            </div>
          </div>
           {/* Video Downloader Tool */}
           <div className="relative flex flex-col items-center bg-white p-6 rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105">
            <a href="/tools/video-downloader" className="absolute inset-0 z-10" />
            <div className="w-full h-48 flex items-center justify-center bg-gray-100 rounded-lg mb-4">
              <FaDownload size="3rem" className="text-[#52aa4d] mb-4" />
            </div>
            <div className="relative z-20 flex flex-col items-center">
              <h3 className="text-xl font-semibold text-gray-900">Video Downloader</h3>
              <p className="text-center text-gray-600 mt-2">
                Combine PDFs in the order you want with the easiest PDF merger available.
              </p>
            </div>
          </div>

          {/* Merge PDF Tool */}
          <div className="relative flex flex-col items-center bg-white p-6 rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105">
            <a href="/tools/merge-pdf" className="absolute inset-0 z-10" />
            <div className="w-full h-48 flex items-center justify-center bg-gray-100 rounded-lg mb-4">
              <FaFilePdf size="3rem" className="text-[#52aa4d] mb-4" />
            </div>
            <div className="relative z-20 flex flex-col items-center">
              <h3 className="text-xl font-semibold text-gray-900">Merge PDF</h3>
              <p className="text-center text-gray-600 mt-2">
                Combine PDFs in the order you want with the easiest PDF merger available.
              </p>
            </div>
          </div>

          {/* PDF to Word Tool */}
          <div className="relative flex flex-col items-center bg-white p-6 rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105">
            <a href="/tools/pdf-to-word" className="absolute inset-0 z-10" />
            <div className="w-full h-48 flex items-center justify-center bg-gray-100 rounded-lg mb-4">
              <FaFilePdf size="3rem" className="text-[#52aa4d] mb-4" />
            </div>
            <div className="relative z-20 flex flex-col items-center">
              <h3 className="text-xl font-semibold text-gray-900">PDF to Word</h3>
              <p className="text-center text-gray-600 mt-2">
                Easily convert your PDF files into easy-to-edit DOC and DOCX documents. 
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurTools;