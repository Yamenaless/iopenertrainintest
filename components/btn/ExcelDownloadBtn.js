// "use client";
// export default function ExcelFileDownloadBtn() {
//   const handleDownload = async () => {
//     // Fetch the file from the public folder
//     const response = await fetch("/example.xlsx");
//     const blob = await response.blob();

//     // Create a link element and trigger the download
//     const url = window.URL.createObjectURL(blob);
//     const a = document.createElement("a");
//     a.href = url;
//     a.download = "sample.xlsx"; // Set the file name
//     a.click();
//     window.URL.revokeObjectURL(url);
//   };

//   return (
//     <div>
//       <button
//         onClick={handleDownload}
//         style={{
//           backgroundColor: "red",
//           border: "red",
//           color: "white",
//         }}
//       >
//          Plan25-26
//          <i className=" fas fa-download mr-5"></i>{" "}
//       </button>
//     </div>
//   );
// }


// fixed component fron deepseek.com 




"use client";
export default function ExcelFileDownloadBtn() {
  const handleDownload = () => {
    const a = document.createElement("a");
    a.href = "/sample.xlsx";
    a.download = "sample.xlsx"; // Set the file name
    a.click();
  };

  return (
    <div>
      <button
        onClick={handleDownload}
        style={{
          backgroundColor: "red",
          border: "red",
          color: "white",
        }}
      >
        Plan25-26
        <i className="fas fa-download mr-5"></i>
      </button>
    </div>
  );
}