// import Link from "next/link";
// import Image from "next/image";
// import moment from "moment";

// import customFetch from "@/lib/axios";
// import { removeHtmlTags } from "@/lib/customFunction";
// import { BaseDomain } from "@/lib/axios";
// import { getDictionary } from "@/lib/dictionary";
// import CustomLink from "@/components/tools/custom-link";

// import CurrencySymbol from "@/components/layout/CurrencySymbol";
// import Inquiry from "../../../../../../components/layout/Inquiry";
// import Register from "../../../../../../components/layout/Register";

// import PdfDownloadButton from "@/components/tools/PdfDownloadButton";
// import PdfDownloadButtonAr from "@/components/tools/PdfDownloadButtonAr";

// function stripHtml(html) {
//     if (typeof window === "undefined") {
//         // Return the original html if we're on the server to avoid errors
//         return html;
//     }
//     const temporalDivElement = document.createElement("div");
//     temporalDivElement.innerHTML = html;
//     return temporalDivElement.textContent || temporalDivElement.innerText || "";
// }

// function removeTrailingZeros(price) {
//     return parseFloat(price).toString();
// }

// const page = async ({ params }) => {
//     const event = params.event;
//     const lang = params.lang;
//     const {
//         navigation,
//         Registers,
//         Inquirys,
//         Course_Details,
//         form_info,
//         training_course,
//     } = await getDictionary(lang);
//     const isEnglish = lang === "en";

//     const responsive = await customFetch.get(
//         `/event/${event}?with=city.hotels.media,course.category`
//     );

//     // Edit temporary
//     const responsiveHotelMedia = await customFetch.get(
//         `/event/${event}?with=city.media`
//     );

//     responsive.data.city.media = responsiveHotelMedia.data.city.media;

//     const eventInfo = responsive.data;

//     const cleanDetails = isEnglish
//         ? stripHtml(eventInfo.course.brochure.en)
//         : stripHtml(eventInfo.course.brochure.ar);
//     const cleanDetailsTitle = isEnglish
//         ? eventInfo.course.name.en
//         : eventInfo.course.name.ar;

//     const cleanCity = isEnglish
//         ? eventInfo.city.name.en
//         : eventInfo.city.name.ar;

//     const pdfDate = eventInfo.start_date;
//     const pdfDateEnd = eventInfo.end_date;

//     return (
//         <>
//             {/* Start Header */}
//             <div className="header-course">
//                 <div className="info">
//                     <nav aria-label="breadcrumb">
//                         <ol className="breadcrumb">
//                             <li className="breadcrumb-item">
//                                 <CustomLink href="/" lang={lang}>
//                                     {navigation.home}
//                                 </CustomLink>
//                             </li>
//                             <li className="breadcrumb-item">
//                                 <CustomLink href={`/categories`} lang={lang}>
//                                     {navigation.Categories}
//                                 </CustomLink>
//                             </li>
//                             <li className="breadcrumb-item">
//                                 <CustomLink
//                                     href={`/categories/${params.id}/${params.slug}`}
//                                     lang={lang}>
//                                     {isEnglish
//                                         ? eventInfo.course.category.name.en
//                                         : eventInfo.course.category.name.ar}
//                                 </CustomLink>
//                             </li>
//                             <li
//                                 className="breadcrumb-item active"
//                                 aria-current="page">
//                                 {isEnglish
//                                     ? eventInfo.course.name.en
//                                     : eventInfo.course.name.ar}
//                             </li>
//                         </ol>
//                     </nav>
//                     <div className="title-inn-slide">
//                         <h1 title="">
//                             {training_course} :
//                             {isEnglish
//                                 ? eventInfo.course.name.en
//                                 : eventInfo.course.name.ar}
//                         </h1>
//                         <p className="subtitle">
//                             {isEnglish
//                                 ? eventInfo.course.description.en
//                                 : eventInfo.course.description.ar}
//                         </p>
//                     </div>
//                     <div className="btn-block">
//                         {/* Start Register  */}
//                         <button
//                             type="button"
//                             className="btn btn-io-bg"
//                             data-bs-toggle="modal"
//                             data-bs-target="#register">
//                             {form_info.Registers}
//                         </button>

//                         {/* End Register  */}
//                         {/* Start Inquiry  */}
//                         <button
//                             type="button"
//                             className="btn btn-io-bg-blue"
//                             data-bs-toggle="modal"
//                             data-bs-target="#inquiry">
//                             {form_info.Inquirys}
//                         </button>

//                         {/* End Inquiry  */}
//                         {/* Start Inquiry  */}
//                         {/* <button type="button" className="btn btn-io-bg-blue">
//                             PDF
//                         </button> */}

//                         {/* <PdfDownloadButton
//                             titleName={cleanDetailsTitle}
//                             cityName={cleanCity}
//                             datePdf={pdfDate}
//                             details={cleanDetails}
//                             filename="Event_Course_Details.pdf"
//                         /> */}

//                         {isEnglish ? (
//                             <PdfDownloadButton
//                                 titleName={cleanDetailsTitle}
//                                 cityName={cleanCity}
//                                 datePdf={pdfDate}
//                                 datePdfEnd={pdfDateEnd}
//                                 details={cleanDetails}
//                                 lang={lang}
//                                 filename="course.pdf"
//                             />
//                         ) : (
//                             <PdfDownloadButtonAr
//                                 titleName={cleanDetailsTitle}
//                                 cityName={cleanCity}
//                                 datePdf={pdfDate}
//                                 datePdfEnd={pdfDateEnd}
//                                 details={cleanDetails}
//                                 lang={lang}
//                                 filename="course.pdf"
//                             />
//                         )}

//                         {/* End Inquiry  */}
//                     </div>
//                 </div>

//                 <div className="course-details">
//                     <Image
//                         src={
//                             eventInfo.city.media.filter(
//                                 (f) => f.notes === "slide"
//                             ).length > 0
//                                 ? `${BaseDomain}/${
//                                       eventInfo.city.media.filter(
//                                           (f) => f.notes === "slide"
//                                       )[0].file_path
//                                   }`
//                                 : ""
//                         }
//                         alt=""
//                         fill={true}
//                     />
//                     <div className="image">
//                         {eventInfo.city.hotels.length > 0 &&
//                             eventInfo.city.hotels[0].media.length > 0 && (
//                                 <Image
//                                     src={`${BaseDomain}/${eventInfo.city.hotels[0].media[0].file_path}`}
//                                     alt=""
//                                     className="hotel-image"
//                                     width={170}
//                                     height={170}
//                                 />
//                             )}
//                     </div>
//                     <div className="details">
//                         <div className="details-box">
//                             <i className="fa-solid fa-tags"></i>
//                             <span> {eventInfo.course.code} </span>
//                         </div>
//                         <div className="details-box">
//                             <i className="fa-solid fa-location-dot"></i>
//                             <span>
//                                 {isEnglish
//                                     ? eventInfo.city.name.en
//                                     : eventInfo.city.name.ar}
//                             </span>
//                         </div>
//                         <div className="details-box">
//                             <i className="fa-regular fa-calendar-minus"></i>
//                             <span>
//                                 {moment(eventInfo.start_date).format(
//                                     "dddd, DD MMM YYYY"
//                                 )}
//                                 -
//                                 {moment(eventInfo.end_date).format(
//                                     "dddd, DD MMM YYYY"
//                                 )}
//                             </span>
//                         </div>
//                         {eventInfo.city.hotels[0].name.en ? (
//                             <div className="details-box">
//                                 <i className="fa-solid fa-hotel"></i>
//                                 <span>
//                                     {isEnglish
//                                         ? eventInfo.city.hotels[0].name.en
//                                         : eventInfo.city.hotels[0].name.ar}
//                                 </span>
//                             </div>
//                         ) : null}
//                         <div className="details-box">
//                             <span className="price">Price: </span>
//                             <span>
//                                 {removeTrailingZeros(eventInfo.price)}
//                                 <CurrencySymbol currency={eventInfo.currency} />
//                             </span>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//             {/* End Header */}

//             <div className="overview">
//                 <div className="container">
//                     {/* Start Information */}
//                     {/* <h3 className="title-overview-one"> {Course_Details} </h3> */}

//                     <div
//                         className="info"
//                         dangerouslySetInnerHTML={{
//                             __html: isEnglish
//                                 ? eventInfo.course.details.en || ""
//                                 : eventInfo.course.details.ar || "",
//                         }}></div>
//                     {/* End Information */}
//                 </div>
//             </div>
//             {/*  Model Register */}
//             <div
//                 className="modal fade"
//                 id="register"
//                 tabIndex="-1"
//                 aria-labelledby="registerLabel"
//                 aria-hidden="true">
//                 <div className="modal-dialog modal-dialog-centered modal-xl ">
//                     <div className="modal-content">
//                         <div className="modal-header">
//                             <h1 className="modal-title fs-5" id="registerLabel">
//                                 {isEnglish
//                                     ? eventInfo.course.name.en
//                                     : eventInfo.course.name.ar}
//                             </h1>
//                             <button
//                                 type="button"
//                                 className="btn-close"
//                                 data-bs-dismiss="modal"
//                                 aria-label="Close"></button>
//                         </div>
//                         <div className="modal-body">
//                             <Register
//                                 lang={lang}
//                                 form_info={form_info}
//                                 eventInfo={eventInfo}
//                             />
//                         </div>
//                     </div>
//                 </div>
//             </div>
//             {/*  Model Inquiry */}
//             <div
//                 className="modal fade"
//                 id="inquiry"
//                 tabIndex="-1"
//                 aria-labelledby="inquiryLabel"
//                 aria-hidden="true">
//                 <div className="modal-dialog modal-dialog-centered modal-lg ">
//                     <div className="modal-content">
//                         <div className="modal-header">
//                             <h1 className="modal-title fs-5" id="inquiryLabel">
//                                 {isEnglish
//                                     ? eventInfo.course.name.en
//                                     : eventInfo.course.name.ar}
//                             </h1>
//                             <button
//                                 type="button"
//                                 className="btn-close"
//                                 data-bs-dismiss="modal"
//                                 aria-label="Close"></button>
//                         </div>
//                         <div className="modal-body">
//                             <Inquiry
//                                 lang={lang}
//                                 form_info={form_info}
//                                 eventInfo={eventInfo}
//                             />
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// };

// export default page;












// my code 




import Link from "next/link";
import Image from "next/image";
import moment from "moment";
import { redirect } from "next/navigation"; // Import the redirect function

import customFetch from "@/lib/axios";
import { removeHtmlTags } from "@/lib/customFunction";
import { BaseDomain } from "@/lib/axios";
import { getDictionary } from "@/lib/dictionary";
import CustomLink from "@/components/tools/custom-link";

import CurrencySymbol from "@/components/layout/CurrencySymbol";
import Inquiry from "../../../../../../components/layout/Inquiry";
import Register from "../../../../../../components/layout/Register";

import PdfDownloadButton from "@/components/tools/PdfDownloadButton";
import PdfDownloadButtonAr from "@/components/tools/PdfDownloadButtonAr";

function stripHtml(html) {
    if (typeof window === "undefined") {
        // Return the original html if we're on the server to avoid errors
        return html;
    }
    const temporalDivElement = document.createElement("div");
    temporalDivElement.innerHTML = html;
    return temporalDivElement.textContent || temporalDivElement.innerText || "";
}

function removeTrailingZeros(price) {
    return parseFloat(price).toString();
}

const page = async ({ params }) => {
    const event = params.event;
    const lang = params.lang;
    const {
        navigation,
        Registers,
        Inquirys,
        Course_Details,
        form_info,
        training_course,
    } = await getDictionary(lang);
    const isEnglish = lang === "en";

    const responsive = await customFetch.get(
        `/event/${event}?with=city.hotels.media,course.category`
    );

    // Edit temporary
    const responsiveHotelMedia = await customFetch.get(
        `/event/${event}?with=city.media`
    );

    responsive.data.city.media = responsiveHotelMedia.data.city.media;

    const eventInfo = responsive.data;

    // Check if the event date is today or the day before today
    const eventDate = moment(eventInfo.start_date);
    const today = moment().startOf("day"); // Get today's date at the start of the day
    const yesterday = moment().subtract(1, "day").startOf("day"); // Get yesterday's date at the start of the day

    if (eventDate.isSame(today) || eventDate.isSame(yesterday)) {
        // Redirect to the home page
        redirect(`/${lang}`);
    }

    const cleanDetails = isEnglish
        ? stripHtml(eventInfo.course.brochure.en)
        : stripHtml(eventInfo.course.brochure.ar);
    const cleanDetailsTitle = isEnglish
        ? eventInfo.course.name.en
        : eventInfo.course.name.ar;

    const cleanCity = isEnglish
        ? eventInfo.city.name.en
        : eventInfo.city.name.ar;

    const pdfDate = eventInfo.start_date;
    const pdfDateEnd = eventInfo.end_date;

    return (
        <>
            {/* Start Header */}
            <div className="header-course">
                <div className="info">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                                <CustomLink href="/" lang={lang}>
                                    {navigation.home}
                                </CustomLink>
                            </li>
                            <li className="breadcrumb-item">
                                <CustomLink href={`/categories`} lang={lang}>
                                    {navigation.Categories}
                                </CustomLink>
                            </li>
                            <li className="breadcrumb-item">
                                <CustomLink
                                    href={`/categories/${params.id}/${params.slug}`}
                                    lang={lang}>
                                    {isEnglish
                                        ? eventInfo.course.category.name.en
                                        : eventInfo.course.category.name.ar}
                                </CustomLink>
                            </li>
                            <li
                                className="breadcrumb-item active"
                                aria-current="page">
                                {isEnglish
                                    ? eventInfo.course.name.en
                                    : eventInfo.course.name.ar}
                            </li>
                        </ol>
                    </nav>
                    <div className="title-inn-slide">
                        <h1 title="">
                            {training_course} :
                            {isEnglish
                                ? eventInfo.course.name.en
                                : eventInfo.course.name.ar}
                        </h1>
                        <p className="subtitle">
                            {isEnglish
                                ? eventInfo.course.description.en
                                : eventInfo.course.description.ar}
                        </p>
                    </div>
                    <div className="btn-block">
                        {/* Start Register  */}
                        <button
                            type="button"
                            className="btn btn-io-bg"
                            data-bs-toggle="modal"
                            data-bs-target="#register">
                            {form_info.Registers}
                        </button>

                        {/* End Register  */}
                        {/* Start Inquiry  */}
                        <button
                            type="button"
                            className="btn btn-io-bg-blue"
                            data-bs-toggle="modal"
                            data-bs-target="#inquiry">
                            {form_info.Inquirys}
                        </button>

                        {/* End Inquiry  */}
                        {/* Start Inquiry  */}
                        {/* <button type="button" className="btn btn-io-bg-blue">
                            PDF
                        </button> */}

                        {/* <PdfDownloadButton
                            titleName={cleanDetailsTitle}
                            cityName={cleanCity}
                            datePdf={pdfDate}
                            details={cleanDetails}
                            filename="Event_Course_Details.pdf"
                        /> */}

                        {isEnglish ? (
                            <PdfDownloadButton
                                titleName={cleanDetailsTitle}
                                cityName={cleanCity}
                                datePdf={pdfDate}
                                datePdfEnd={pdfDateEnd}
                                details={cleanDetails}
                                lang={lang}
                                filename="course.pdf"
                            />
                        ) : (
                            <PdfDownloadButtonAr
                                titleName={cleanDetailsTitle}
                                cityName={cleanCity}
                                datePdf={pdfDate}
                                datePdfEnd={pdfDateEnd}
                                details={cleanDetails}
                                lang={lang}
                                filename="course.pdf"
                            />
                        )}

                        {/* End Inquiry  */}
                    </div>
                </div>

                <div className="course-details">
                    <Image
                        src={
                            eventInfo.city.media.filter(
                                (f) => f.notes === "slide"
                            ).length > 0
                                ? `${BaseDomain}/${
                                      eventInfo.city.media.filter(
                                          (f) => f.notes === "slide"
                                      )[0].file_path
                                  }`
                                : ""
                        }
                        alt=""
                        fill={true}
                    />
                    <div className="image">
                        {eventInfo.city.hotels.length > 0 &&
                            eventInfo.city.hotels[0].media.length > 0 && (
                                <Image
                                    src={`${BaseDomain}/${eventInfo.city.hotels[0].media[0].file_path}`}
                                    alt=""
                                    className="hotel-image"
                                    width={170}
                                    height={170}
                                />
                            )}
                    </div>
                    <div className="details">
                        <div className="details-box">
                            <i className="fa-solid fa-tags"></i>
                            <span> {eventInfo.course.code} </span>
                        </div>
                        <div className="details-box">
                            <i className="fa-solid fa-location-dot"></i>
                            <span>
                                {isEnglish
                                    ? eventInfo.city.name.en
                                    : eventInfo.city.name.ar}
                            </span>
                        </div>
                        <div className="details-box">
                            <i className="fa-regular fa-calendar-minus"></i>
                            <span>
                                {moment(eventInfo.start_date).format(
                                    "dddd, DD MMM YYYY"
                                )}
                                -
                                {moment(eventInfo.end_date).format(
                                    "dddd, DD MMM YYYY"
                                )}
                            </span>
                        </div>
                        {eventInfo.city.hotels[0].name.en ? (
                            <div className="details-box">
                                <i className="fa-solid fa-hotel"></i>
                                <span>
                                    {isEnglish
                                        ? eventInfo.city.hotels[0].name.en
                                        : eventInfo.city.hotels[0].name.ar}
                                </span>
                            </div>
                        ) : null}
                        <div className="details-box">
                            <span className="price">Price: </span>
                            <span>
                                {removeTrailingZeros(eventInfo.price)}
                                <CurrencySymbol currency={eventInfo.currency} />
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            {/* End Header */}

            <div className="overview">
                <div className="container">
                    {/* Start Information */}
                    {/* <h3 className="title-overview-one"> {Course_Details} </h3> */}

                    <div
                        className="info"
                        dangerouslySetInnerHTML={{
                            __html: isEnglish
                                ? eventInfo.course.details.en || ""
                                : eventInfo.course.details.ar || "",
                        }}></div>
                    {/* End Information */}
                </div>
            </div>
            {/*  Model Register */}
            <div
                className="modal fade"
                id="register"
                tabIndex="-1"
                aria-labelledby="registerLabel"
                aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-xl ">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="registerLabel">
                                {isEnglish
                                    ? eventInfo.course.name.en
                                    : eventInfo.course.name.ar}
                            </h1>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <Register
                                lang={lang}
                                form_info={form_info}
                                eventInfo={eventInfo}
                            />
                        </div>
                    </div>
                </div>
            </div>
            {/*  Model Inquiry */}
            <div
                className="modal fade"
                id="inquiry"
                tabIndex="-1"
                aria-labelledby="inquiryLabel"
                aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-lg ">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="inquiryLabel">
                                {isEnglish
                                    ? eventInfo.course.name.en
                                    : eventInfo.course.name.ar}
                            </h1>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <Inquiry
                                lang={lang}
                                form_info={form_info}
                                eventInfo={eventInfo}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default page;
