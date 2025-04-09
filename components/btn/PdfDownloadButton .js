// "use client";
// // components/PdfDownloadButton.jsx
// import React from "react";

// const PdfDownloadButton = ({
//   pdfUrl,
//   fileName = "document.pdf",
//   buttonText = "Download PDF",
// }) => {
//   const handleDownload = () => {
//     // Create a hidden anchor element
//     const link = document.createElement("a");
//     link.href = pdfUrl;
//     link.download = fileName; // Set the download attribute with the filename
//     link.target = "_blank"; // Open in new tab
//     link.rel = "noopener noreferrer"; // Security best practice

//     // Trigger the download
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

//   return (
//     <button
//       onClick={handleDownload}
//       className="btn btn-warning btn-sm flex items-center"
//       style={{
//         backgroundColor: "red",
//         border: "red",
//         color: "white",
//       }}
//     >
//       {buttonText}
//       <i className=" fas fa-download mr-5"></i> {/* FontAwesome download icon */}
//     </button>
//   );
// };

// export default PdfDownloadButton;

 const PdfDownloadButton = () => { 
  return ( 
    <a href="/pdf/plan25-26.pdf">
      download pdf
    </a>
  )
 }

 export default PdfDownloadButton