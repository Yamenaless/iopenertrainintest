"use client";
import { useRef } from "react";
import { generatePdfAr } from "@/utils/pdfGeneratorAr";

const PdfDownloadButtonAr = ({
    titleName,
    cityName,
    datePdf,
    datePdfEnd,
    details,
    filename,
    lang,
}) => {
    const pdfContentRefAr = useRef();

    const handleDownload = () => {
        generatePdfAr(
            pdfContentRefAr.current,
            filename,
            titleName,
            cityName,
            datePdfEnd,
            datePdf,
            details,
            lang // Pass the details prop
        );
    };

    return (
        <>
            <div style={{ display: "none" }}>
                <div ref={pdfContentRefAr}>
                    <div style={{ pageBreakAfter: "always" }}>
                        {/* الصفحة الأولى بدون النصوص */}
                    </div>
                    <div className="page" style={{ padding: "25px" }}>
                        {/* <div
                            dangerouslySetInnerHTML={{ __html: details }}
                            style={{ margin: "25px" }}
                        /> */}
                    </div>
                </div>
            </div>
            <style>
                {`
                    .page {
                        page-break-after: always;
                    }
                    h2, h3, h4, h5 {
                        color: #a91314;
                    }
                `}
            </style>
            <button
                type="button"
                className="btn btn-io-bg-blue"
                onClick={handleDownload}>
                PDF
            </button>
        </>
    );
};

export default PdfDownloadButtonAr;

// "use client";
// import { useRef } from "react";
// import { generatePdfAr } from "@/utils/pdfGeneratorAr";

// const PdfDownloadButtonAr = ({
//     titleName,
//     cityName,
//     datePdf,
//     details,
//     filename,
//     lang,
// }) => {
//     const pdfContentRefAr = useRef();

//     const handleDownload = () => {
//         generatePdfAr(
//             pdfContentRefAr.current,
//             filename,
//             titleName,
//             cityName,
//             datePdf,
//             details,
//             lang // Pass the details prop
//         );
//     };

//     return (
//         <>
//             <div style={{ display: "none" }}>
//                 <div ref={pdfContentRefAr}>
//                     <div style={{ pageBreakAfter: "always" }}>
//                         {/* الصفحة الأولى بدون النصوص */}
//                     </div>
//                     <div className="page" style={{ padding: "25px" }}>
//                         {/* <div
//                             dangerouslySetInnerHTML={{ __html: details }}
//                             style={{ margin: "25px" }}
//                         /> */}
//                     </div>
//                 </div>
//             </div>
//             <style>
//                 {`
//                     .page {
//                         page-break-after: always;
//                     }
//                     h2, h3, h4, h5 {
//                         color: #a91314;
//                     }
//                 `}
//             </style>
//             <button
//                 type="button"
//                 className="btn btn-io-bg-blue"
//                 onClick={handleDownload}>
//                 PDF
//             </button>
//         </>
//     );
// };

// export default PdfDownloadButtonAr;

// "use client";
// import { useRef } from "react";
// import { generatePdf } from "@/utils/pdfGenerator";

// const PdfDownloadButton = ({
//     titleName,
//     cityName,
//     datePdf,
//     details,
//     filename,
// }) => {
//     const pdfContentRef = useRef();

//     const handleDownload = () => {
//         generatePdf(
//             pdfContentRef.current,
//             filename,
//             titleName,
//             cityName,
//             datePdf,
//             details // Pass the details prop
//         );
//     };

//     return (
//         <>
//             <div style={{ display: "none" }}>
//                 <div ref={pdfContentRef}>
//                     <div style={{ pageBreakAfter: "always" }}>
//                         {/* الصفحة الأولى بدون النصوص */}
//                     </div>
//                     <div className="page" style={{ padding: "25px" }}>
//                         {/* <div
//                             dangerouslySetInnerHTML={{ __html: details }}
//                             style={{ margin: "25px" }}
//                         /> */}
//                     </div>
//                 </div>
//             </div>
//             <style>
//                 {`
//                     .page {
//                         page-break-after: always;
//                     }
//                     h2, h3, h4, h5 {
//                         color: #a91314;
//                     }
//                 `}
//             </style>
//             <button
//                 type="button"
//                 className="btn btn-io-bg-blue"
//                 onClick={handleDownload}>
//                 Download PDF
//             </button>
//         </>
//     );
// };

// export default PdfDownloadButton;
// "use client";
// import { useRef } from "react";
// import { generatePdf } from "@/utils/pdfGenerator";

// const PdfDownloadButton = ({
//     titleName,
//     cityName,
//     datePdf,
//     details,
//     filename,
// }) => {
//     const pdfContentRef = useRef();

//     const handleDownload = () => {
//         generatePdf(
//             pdfContentRef.current,
//             filename,
//             titleName,
//             cityName,
//             datePdf
//         );
//     };

//     return (
//         <>
//             <div style={{ display: "none" }}>
//                 <div ref={pdfContentRef}>
//                     <div style={{ pageBreakAfter: "always" }}>
//                         {/* الصفحة الأولى بدون النصوص */}
//                     </div>
//                     <div className="page" style={{ padding: "25px" }}>
//                         <div
//                             dangerouslySetInnerHTML={{ __html: details }}
//                             style={{ margin: "25px" }}
//                         />
//                     </div>
//                 </div>
//             </div>
//             <style>
//                 {`
//                     .page {
//                         page-break-after: always;
//                     }
//                     h2, h3, h4, h5 {
//                         color: #a91314;
//                     }
//                 `}
//             </style>
//             <button
//                 type="button"
//                 className="btn btn-io-bg-blue"
//                 onClick={handleDownload}>
//                 Download PDF
//             </button>
//         </>
//     );
// };

// export default PdfDownloadButton;

// "use client";
// import { useRef } from "react";
// import { generatePdf } from "@/utils/pdfGenerator";

// const PdfDownloadButton = ({
//     titleName,
//     cityName,
//     datePdf,
//     details,
//     filename,
// }) => {
//     const pdfContentRef = useRef();

//     const handleDownload = () => {
//         generatePdf(
//             pdfContentRef.current,
//             filename,
//             titleName,
//             cityName,
//             datePdf,
//             details // Pass the details prop
//         );
//     };

//     return (
//         <>
//             <div style={{ display: "none" }}>
//                 <div ref={pdfContentRef}>
//                     <div style={{ pageBreakAfter: "always" }}>
//                         {/* الصفحة الأولى بدون النصوص */}
//                     </div>
//                     <div className="page" style={{ padding: "25px" }}>
//                         <div
//                             dangerouslySetInnerHTML={{ __html: details }}
//                             style={{ margin: "25px" }}
//                         />
//                     </div>
//                 </div>
//             </div>
//             <style>
//                 {`
//                     .page {
//                         page-break-after: always;
//                     }
//                     h2, h3, h4, h5 {
//                         color: #a91314;
//                     }
//                 `}
//             </style>
//             <button
//                 type="button"
//                 className="btn btn-io-bg-blue"
//                 onClick={handleDownload}>
//                 Download PDF
//             </button>
//         </>
//     );
// };

// export default PdfDownloadButton;
