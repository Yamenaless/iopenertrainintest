"use client";
import React from "react";

const DownloadExcelBtn = () => {
  const handleDownload = () => {
    // إنشاء رابط لتنزيل الملف
    const link = document.createElement("a");
    link.href = "@/public/plan25-26.pdf"; // المسار إلى الملف داخل مجلد public
    link.download = "plan25-26.pdf"; // اسم الملف الذي سيتم تنزيله
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      <button
        className="btn btn-warning btn-sm flex items-center"
        style={{
          backgroundColor: "red",
          border: "red",
          color: "white",
        }}
        onClick={handleDownload}
      >
        Plan25-26
        <i className=" fas fa-download mr-5"></i>{" "}
        {/* FontAwesome download icon */}
      </button>
    </div>
  );
};

export default DownloadExcelBtn;
