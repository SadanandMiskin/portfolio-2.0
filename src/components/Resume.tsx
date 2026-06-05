import React, { useEffect, useState } from "react";
import { CgSpinner } from "react-icons/cg";

interface ResumeProps {
  driveLink: string;
}

const Resume: React.FC<ResumeProps> = ({ driveLink }) => {
  const [isReadyToShow, setReadyToShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setReadyToShow(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const fileId = driveLink.match(/\/d\/(.*?)\//)?.[1];
  const downloadLink = fileId
    ? `https://drive.google.com/uc?id=${fileId}&export=download`
    : "";

  return (
    <section className="page-shell flex min-h-[calc(100vh-6rem)] flex-col py-8">
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="section-kicker text-left">Resume</p>
          <h1 className="font-display text-3xl font-bold leading-tight text-[#171514] sm:text-4xl">
            Sadanand&apos;s Resume
          </h1>
        </div>
        {downloadLink ? (
          <a
            href={downloadLink}
            target="_blank"
            rel="noopener noreferrer"
            className="quiet-button"
          >
            Download PDF
          </a>
        ) : null}
      </div>

      <div
        className={`min-h-[70vh] flex-1 overflow-hidden rounded-[18px] border border-[#171514]/10 bg-[#fbfaf6] ${
          isReadyToShow ? "block" : "hidden"
        }`}
      >
        <iframe
          src={driveLink}
          title="PDF Preview"
          className="h-full min-h-[70vh] w-full"
          allowFullScreen
        />
      </div>

      {!isReadyToShow && (
        <div className="surface-card flex min-h-[70vh] flex-1 items-center justify-center gap-3">
          <CgSpinner className="h-6 w-6 animate-spin text-[#171514]" />
          <h2 className="text-sm font-semibold text-[#625c53]">Loading resume</h2>
        </div>
      )}
    </section>
  );
};

export default Resume;
