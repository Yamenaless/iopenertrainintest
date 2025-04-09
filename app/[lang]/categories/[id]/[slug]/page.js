import Link from "next/link";
import Image from "next/image";
import moment from "moment";

import customFetch from "@/lib/axios";
import { BaseDomain } from "@/lib/axios";
import { getDictionary } from "@/lib/dictionary";
import CustomLink from "@/components/tools/custom-link";
import InquiryCourse from "@/components/layout/InquiryCourse";
// import RegisterCourse from "@/components/layout/RegisterCourse";

import CurrencySymbol from "@/components/layout/CurrencySymbol";
import PdfDownloadButtonCourse from "@/components/tools/PdfDownloadButtonCourse";
import PdfDownloadButtonCourseAR from "@/components/tools/PdfDownloadButtonCourseAR";

// export async function generateMetadata({ params }) {
//     try {
//         const res = await customFetch.get(`/course/search?q=${params.slug}`);
//         const SingleCourseTitle = res.data.data[0];
//         console.log(SingleCourseTitle);
//         if (!SingleCourseTitle)
//             return {
//                 title: "not found",
//             };
//         return {
//             title: SingleCourseTitle.name.en,
//             description: SingleCourseTitle.description.en,
//             // description: SingleCourseTitle.properties.seo.en.keywords,
//             // alternates: {
//             //     canonical: `categories/${params.id}/${SingleCourseTitle.slug}`,
//             //     languages: {
//             //         "en-US": `/en/categories/${params.id}/${SingleCourseTitle.slug}`,
//             //         "ar-AR": `/ar/categories/${params.id}/${SingleCourseTitle.slug}`,
//             //     },
//             // },
//         };
//     } catch (error) {
//         console.error(error);
//         return {
//             title: "not found",
//         };
//     }
// }

export async function generateMetadata({ params }) {
    try {
        const res = await customFetch.get(`/course/search?q=${params.slug}&with=category,events.city.hotels,media`);
        const SingleCourseTitle = res.data.data[0];

        if (!SingleCourseTitle) {
            return {
                title: "not found",
            };
        }

        // 1. Parse the `properties` field (if it’s a valid JSON string)
        // 2. Check for the language and retrieve keywords
        let metaKeywords = [];
        const isEnglish = params.lang === "en";
        if (SingleCourseTitle.properties) {
            try {
                const parsedProps = JSON.parse(SingleCourseTitle.properties);
                if (parsedProps?.seo) {
                    // If the language is English, pull from `seo.en.keywords`, otherwise from `seo.ar.keywords`
                    metaKeywords = isEnglish ? parsedProps.seo.en?.keywords : parsedProps.seo.ar?.keywords;
                }
            } catch (err) {
                console.error("Error parsing properties JSON:", err);
            }
        }

        return {
            title: isEnglish ? SingleCourseTitle.name.en : SingleCourseTitle.name.ar,
            description: isEnglish ? SingleCourseTitle.description.en : SingleCourseTitle.description.ar,
            keywords: metaKeywords || [],
        };
    } catch (error) {
        console.error(error);
        return {
            title: "not found",
        };
    }
}

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

const SingleCourse = async ({ params }) => {
    const lang = params.lang;
    const { navigation, form_info } = await getDictionary(lang);
    const isEnglish = lang === "en";
    const courseSlug = params.slug;
    const res = await customFetch.get(
        // `/category/${courseId}?with=courses.events.city,media`
        `/course/search?q=${courseSlug}&with=category,events.city.hotels,media,`
    );

    const course = res.data.data[0];
    // console.log(course);

    // const cleanDetailsTitle = isEnglish ? course.name.en : course.name.ar;
    // const cleanDetails = isEnglish
    //     ? stripHtml(course.brochure.en)
    //     : stripHtml(course.brochure.ar);

    const cleanDetails = isEnglish ? stripHtml(course.brochure.en) : stripHtml(course.brochure.ar);
    const cleanDetailsTitle = isEnglish ? course.name.en : course.name.ar;

    return (
        <div>
            <div key={course.id} className="">
                {/* Start Header */}
                <div className="header-title">
                    <Image
                        src={course.media.length > 0 ? `${BaseDomain}/${course.media[0].file_path}` : ""}
                        alt=""
                        width={380}
                        height={265}
                        className="image-category"
                    />
                    <div className="big_titles2">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-12">
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
                                            <li className="breadcrumb-item" aria-current="page">
                                                <CustomLink href={`/categories/${params.id}`} lang={lang}>
                                                    {isEnglish ? course.category.name.en : course.category.name.ar}
                                                </CustomLink>
                                            </li>
                                            <li className="breadcrumb-item active" aria-current="page">
                                                {isEnglish ? course.name.en : course.name.ar}
                                            </li>
                                        </ol>
                                    </nav>
                                </div>
                                <div className="col-md-9">
                                    <div className="title-inn-slide">
                                        <h1 className="title">{isEnglish ? course.name.en : course.name.ar}</h1>
                                        <p className="subtitle">{isEnglish ? course.description.en : course.description.ar}</p>
                                    </div>
                                    <div className="btn-block mt-5">
                                        {/* Start Register  */}
                                        {/* <button
                                            type="button"
                                            className="btn btn-io-bg"
                                            data-bs-toggle="modal"
                                            data-bs-target="#register-course">
                                            {form_info.Registers}
                                        </button> */}

                                        {/* End Register  */}
                                        {/* Start Inquiry  */}
                                        <button type="button" className="btn-io-bg-blue" data-bs-toggle="modal" data-bs-target="#inquiry-course">
                                            {form_info.Inquirys}
                                        </button>
                                        {/* <button
                                            type="button"
                                            className="btn-io-bg-blue mx-2">
                                            PDF
                                        </button> */}

                                        {/* End Inquiry  */}
                                        {/* Start Inquiry  */}
                                        {/* <button type="button" className="btn btn-io-bg-blue">
                            PDF
                        </button> */}

                                        {/* <PdfDownloadButtonCourse
                                            titleName={cleanDetailsTitle}
                                            details={cleanDetails}
                                            filename="Event_Course_Details.pdf"
                                        /> */}

                                        {isEnglish ? (
                                            <PdfDownloadButtonCourse
                                                titleName={cleanDetailsTitle}
                                                details={cleanDetails}
                                                lang={lang}
                                                filename="course.pdf"
                                            />
                                        ) : (
                                            <PdfDownloadButtonCourseAR
                                                titleName={cleanDetailsTitle}
                                                details={cleanDetails}
                                                lang={lang}
                                                filename="course.pdf"
                                            />
                                        )}

                                        {/* End Inquiry  */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* End Header */}

                <div className="overview">
                    <div className="container">
                        {/* Start Information */}
                        {/* <h3 className="title-overview-one">{Course_Details}</h3> */}
                        <div
                            className="info"
                            dangerouslySetInnerHTML={{
                                __html: isEnglish ? course.details.en || "" : course.details.ar || "",
                            }}
                        ></div>
                        {course.contact_button_shown === 1 ? (
                            <div className="cover-btn">
                                <CustomLink href={`/contact`} className="btn btn-io-bg" lang={lang}>
                                    Contact us
                                </CustomLink>
                            </div>
                        ) : (
                            ""
                        )}

                        {/* End Information */}

                        {/* Start Global Courses */}
                        <div className="global-course">
                            <div className="row">
                                {course.events
                                    .filter((event) => moment(event.start_date).isAfter(moment()))
                                    .map((event) => (
                                        <div className="col-sm-6" key={event.id}>
                                            <div className="box">
                                                <CustomLink href={`/categories/${params.id}/${course.slug}/${event.id}`} lang={lang}>
                                                    <div className="row">
                                                        <div className="col-sm-12 col-md-6 col-lg-5  col-xl-3">
                                                            <i className="fa-solid fa-map-location-dot"></i>
                                                            <span>{isEnglish ? event.city.name.en : event.city.name.ar}</span>
                                                        </div>
                                                        <div className="col-sm-12 col-md-6 col-lg-3  col-xl-6">
                                                            <i className="fa-regular fa-calendar-check"></i>
                                                            <span>
                                                                {moment(event.start_date).format("DD/MMM/YYYY")}-
                                                                {moment(event.end_date).format("DD/MMM/YYYY")}
                                                            </span>
                                                        </div>
                                                        <div className="col-sm-12 col-md-6 col-lg-2  col-xl-3">
                                                            <span>
                                                                {removeTrailingZeros(event.price)}
                                                                <CurrencySymbol currency={event.currency} />
                                                            </span>
                                                        </div>
                                                    </div>
                                                </CustomLink>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </div>
                        {/* End Global Courses */}
                    </div>
                </div>
                {/*  Model Inquiry */}
                <div className="modal fade" id="inquiry-course" tabIndex="-1" aria-labelledby="inquiryCourseLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered modal-lg ">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="inquiryCourseLabel">
                                    {isEnglish ? course.name.en : course.name.ar}
                                </h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <InquiryCourse lang={lang} form_info={form_info} course={course} />
                            </div>
                        </div>
                    </div>
                </div>
                {/*  Model Register */}
                {/* <div
                    className="modal fade"
                    id="register-course"
                    tabIndex="-1"
                    aria-labelledby="registerCourseLabel"
                    aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered modal-xl ">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1
                                    className="modal-title fs-5"
                                    id="registerCourseLabel">
                                    {isEnglish
                                        ? course.name.en
                                        : course.name.ar}
                                </h1>
                                <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <RegisterCourse
                                    lang={lang}
                                    form_info={form_info}
                                    eventInfo={course}
                                />
                            </div>
                        </div>
                    </div>
                </div> */}
            </div>
        </div>
    );
};

export default SingleCourse;
