"use client";
import { useRef } from "react";
import { pdfGeneratorCourse } from "@/utils/pdfGeneratorCourse";

const PdfDownloadButtonCourse = ({ titleName, details, filename, lang }) => {
    const pdfContentRef = useRef();

    const handleDownload = () => {
        pdfGeneratorCourse(
            pdfContentRef.current,
            filename,
            titleName,
            details,
            lang // Pass the details prop
        );
    };

    return (
        <>
            <div style={{ display: "none" }}>
                <div ref={pdfContentRef}>
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
                className="btn-io-bg-blue ms-3"
                onClick={handleDownload}>
                PDF
            </button>
        </>
    );
};

export default PdfDownloadButtonCourse;

// "use client";
// import { PDFDownloadLink } from "@react-pdf/renderer";
// import PdfContentCourse from "@/components/tools/PdfContentCourse";

// const PdfDownloadButtonCourse = ({
//     titleName,
//     cityName,
//     datePdf,
//     details,
//     filename,
// }) => {
//     return (
//         <PDFDownloadLink
//             document={
//                 <PdfContentCourse titleName={titleName} details={details} />
//             }
//             filename={filename}>
//             <button type="button" className="btn btn-io-bg-blue mx-2">
//                 PDF
//             </button>
//         </PDFDownloadLink>
//     );
// };

// export default PdfDownloadButtonCourse;
