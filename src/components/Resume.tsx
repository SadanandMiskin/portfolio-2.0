import React, { useState, useEffect } from "react";
import { CgSpinner } from "react-icons/cg";
interface ResumeProps {
    driveLink: string; // Google Drive viewable link
}

const Resume: React.FC<ResumeProps> = ({ driveLink }) => {
    const [isReadyToShow, setReadyToShow] = useState(false);

    useEffect(() => {
        // Timer to show the iframe after the delay
        const timer = setTimeout(() => {
            setReadyToShow(true);
        }, 1500);

        return () => clearTimeout(timer); // Cleanup the timer on unmount
    }, []);

    // Convert Google Drive viewable link to direct download link
    const fileId = driveLink.match(/\/d\/(.*?)\//)?.[1];
    const downloadLink = fileId
        ? `https://drive.google.com/uc?id=${fileId}&export=download`
        : "";

    return (
        <div className="flex flex-col items-center w-full h-screen dark:bg-white p-4">
            <h1 className="mb-7 text-3xl font-bold font-mono dark:text-black text-white">Resume</h1>
            <div className="mb-4">
                <a
                    href={downloadLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 transition duration-200"
                >
                    Download PDF
                </a>
            </div>

            {/* Preloaded Iframe */}
            <div
                className={`w-full max-w-4xl h-full rounded-md shadow-md bg-white ${
                    isReadyToShow ? "block" : "hidden"
                }`}
            >
                <iframe
                    src={driveLink}
                    title="PDF Preview"
                    className="w-full h-full rounded-md shadow-lg"
                    allowFullScreen
                ></iframe>
            </div>

            {/* Placeholder */}
            {!isReadyToShow && (
                <div className="flex items-start top-6 py-10 justify-center w-full max-w-4xl h-full dark:bg-white bg-black rounded-md shadow-md gap-2">


    <CgSpinner color="blue" className="inline w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"/>
    <h1 className="flex items-center justify-center text-3xl text-white dark:text-black">Loading...</h1>
                </div>

            )}
        </div>
    );
};

export default Resume;
