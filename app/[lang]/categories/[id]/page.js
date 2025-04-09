import Image from "next/image";
import Link from "next/link";
import moment from "moment";

import customFetch from "@/lib/axios";
import { BaseDomain } from "@/lib/axios";
import { getDictionary } from "@/lib/dictionary";
import CustomLink from "@/components/tools/custom-link";

export async function generateMetadata({ params }) {
    try {
        const res = await customFetch.get(`/category/${params.id}`);
        const cityTitle = res.data;
        if (!cityTitle)
            return {
                title: "not found",
            };
        return {
            title: cityTitle.name.en,
        };
    } catch (error) {
        console.error(error);
        return {
            title: "not found",
        };
    }
}

const SingleCategory = async ({ params }) => {
    const lang = params.lang;
    const { navigation, btn_more_date, btn_more_city, week, weeks } =
        await getDictionary(lang);
    const isEnglish = lang === "en";
    const catId = params.id;
    // console.log(params);
    const res = await customFetch.get(
        `/category/${catId}?with=courses.media,courses.events.city,media`
    );

    // Edit temporary
    const responseMedia = await customFetch.get(
        `/category/${catId}?with=courses.media`
    );

    const coursesEvents = res.data.courses;
    const coursesMedia = responseMedia.data.courses;

    res.data.courses = coursesEvents.map((courseEvent) => {
        const courseMedia = coursesMedia.find(
            (courseM) => courseM.id === courseEvent.id
        );

        return {
            ...courseEvent,
            media: courseMedia ? courseMedia.media : [],
        };
    });

    const singleCategory = res.data;

    return (
        <>
            {/* Start Header */}
            <div className="header-title">
                <Image
                    src={
                        singleCategory.media.length > 0
                            ? `${BaseDomain}/${singleCategory.media[0].file_path}`
                            : ""
                    }
                    alt=""
                    width={350}
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
                                            <CustomLink
                                                href={`/categories`}
                                                lang={lang}>
                                                {navigation.Categories}
                                            </CustomLink>
                                        </li>
                                        <li
                                            className="breadcrumb-item active"
                                            aria-current="page">
                                            {isEnglish
                                                ? singleCategory.name.en
                                                : singleCategory.name.ar}
                                        </li>
                                    </ol>
                                </nav>
                            </div>
                            <div className="col-md-6">
                                <div className="title-inn-slide">
                                    <h1 title="">
                                        {isEnglish
                                            ? singleCategory.name.en
                                            : singleCategory.name.ar}
                                    </h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* End Header */}
            {/* Start Container  */}
            <div className="single-cat">
                <div className="container">
                    <div className="row">
                        {singleCategory.courses.map((course) => (
                            <div
                                key={course.id}
                                className="col-lg-3 col-sm-12 mb-4"
                                style={{
                                    display:
                                        course.hidden === 1 ? "none" : "block",
                                }}>
                                <div className="single-cat-card">
                                    <CustomLink
                                        href={`/categories/${catId}/${course.slug}`}
                                        lang={lang}>
                                        <Image
                                            src={
                                                course.media.length > 0
                                                    ? `${BaseDomain}/${course.media[0].file_path}`
                                                    : ""
                                            }
                                            className="w-100"
                                            width={300}
                                            height={200}
                                            alt="..."
                                        />
                                        <div className="card-body">
                                            <h6 className="course-title">
                                                {isEnglish
                                                    ? course.name.en
                                                    : course.name.ar}
                                            </h6>
                                        </div>
                                    </CustomLink>
                                    <div className="card-info">
                                        <div className="city">
                                            <i className="fa-solid fa-tags"></i>
                                            {course.code}
                                        </div>
                                        <div className="date">
                                            <i className="fa-regular fa-clock"></i>
                                            {course.weeks}
                                            {course.weeks > 1
                                                ? ` ${weeks}`
                                                : ` ${week}`}
                                        </div>
                                    </div>
                                    <div className="filter-btn">
                                        {/* Button to show course events */}
                                        <button
                                            type="button"
                                            className="btn-explore"
                                            data-bs-toggle="modal"
                                            data-bs-target={`#events-modal-${course.id}`}>
                                            {btn_more_date}
                                        </button>
                                        {/* Button to show course cities */}
                                        <button
                                            type="button"
                                            className="btn-explore"
                                            data-bs-toggle="modal"
                                            data-bs-target={`#cities-modal-${course.id}`}>
                                            {btn_more_city}
                                        </button>
                                    </div>
                                </div>

                                {/* Modal for course events */}
                                <div
                                    className="modal fade"
                                    id={`events-modal-${course.id}`}
                                    tabIndex="-1"
                                    aria-labelledby={`events-modal-${course.id}-label`}
                                    aria-hidden="true">
                                    <div className="modal-dialog  modal-dialog-centered">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h5
                                                    className="modal-title"
                                                    id={`events-modal-${course.id}-label`}>
                                                    {isEnglish
                                                        ? course.name.en
                                                        : course.name.ar}
                                                </h5>
                                                <button
                                                    type="button"
                                                    className="btn-close"
                                                    data-bs-dismiss="modal"
                                                    aria-label="Close"></button>
                                            </div>
                                            <div className="modal-body">
                                                <div className="row">
                                                    {/* Displaying events */}
                                                    {course.events
                                                        .filter((event) =>
                                                            moment(
                                                                event.start_date
                                                            ).isAfter(moment())
                                                        )
                                                        .map((event) => (
                                                            <div
                                                                className="col-3"
                                                                key={event.id}>
                                                                <CustomLink
                                                                    href={`/categories/${params.id}/${course.slug}/${event.id}`}
                                                                    className="item-model"
                                                                    lang={lang}>
                                                                    <span>
                                                                        {moment(
                                                                            event.start_date
                                                                        ).format(
                                                                            "DD/MM/YYYY"
                                                                        )}
                                                                    </span>
                                                                </CustomLink>
                                                            </div>
                                                        ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Modal for course cities */}
                                <div
                                    className="modal fade"
                                    id={`cities-modal-${course.id}`}
                                    tabIndex="-1"
                                    aria-labelledby={`cities-modal-${course.id}-label`}
                                    aria-hidden="true">
                                    <div className="modal-dialog   modal-dialog-centered">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h5
                                                    className="modal-title"
                                                    id={`cities-modal-${course.id}-label`}>
                                                    {isEnglish
                                                        ? course.name.en
                                                        : course.name.ar}
                                                </h5>
                                                <button
                                                    type="button"
                                                    className="btn-close"
                                                    data-bs-dismiss="modal"
                                                    aria-label="Close"></button>
                                            </div>
                                            <div className="modal-body">
                                                {/* Displaying cities */}
                                                <div className="row">
                                                    {course.events.map(
                                                        (event) => (
                                                            <div
                                                                className="col-3"
                                                                key={event.id}>
                                                                <CustomLink
                                                                    href={`/categories/${params.id}/${course.slug}/${event.id}`}
                                                                    className="item-model"
                                                                    lang={lang}>
                                                                    <span>
                                                                        {isEnglish
                                                                            ? event
                                                                                  .city
                                                                                  .name
                                                                                  .en
                                                                            : event
                                                                                  .city
                                                                                  .name
                                                                                  .ar}
                                                                    </span>
                                                                </CustomLink>
                                                            </div>
                                                        )
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {/* End Container  */}
        </>
    );
};

export default SingleCategory;
