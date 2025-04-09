"use client";
// import dynamic from "next/dynamic";
import { Suspense, useEffect, useState } from "react";
import { searchEvents } from "@/utils/actions";
import moment from "moment";

// import EventsList from "@/components/layout/EventsList";
// import FilterAside from "@/components/layout/FilterAside";
import CustomLink from "@/components/tools/custom-link";
import { useSearchParams } from "next/navigation";

const SearchPage = (context) => {
    const { params } = context;
    const { lang } = params;
    const [events, setEvents] = useState([]);
    const searchParams = useSearchParams();
    const isEnglish = lang === "en";
    // console.log(isEnglish);

    useEffect(() => {
        searchEvents(searchParams).then((data) => setEvents(data));
    }, [searchParams]);

    return (
        <>
            <div className="container  my-5">
                <div className="row">
                    {/* <div className="col-12 col-lg-3"> */}
                    {/* <FilterAside /> */}
                    {/* </div> */}
                    <div className="col-12 col-lg-12">
                        <div className="global-course">
                            <div className="row">
                                {events
                                    .filter((event) => moment(event.start_date).isAfter(moment()))
                                    .map((event) => (
                                        <div className="col-sm-12" key={event.id}>
                                            <div className="box">
                                                <CustomLink
                                                    href={`/categories/${event.course.category_id}/${event.course.slug}/${event.id}`}
                                                    lang={lang}>
                                                    <div className="row">
                                                        <div className="col-12">
                                                            <h5 className="course-name">{isEnglish ? event.course.name.en : event.course.name.ar}</h5>
                                                        </div>
                                                        <div className="col-sm-12 col-md-6 col-lg-5  col-xl-3">
                                                            <i className="fa-solid fa-tags"></i>
                                                            <span>{event.course.code}</span>
                                                        </div>
                                                        <div className="col-sm-12 col-md-6 col-lg-5  col-xl-3">
                                                            <i className="fa-solid fa-map-location-dot"></i>
                                                            <span>{isEnglish ? event.city.name.en : event.city.name.ar}</span>
                                                        </div>
                                                        <div className="col-sm-12 col-md-6 col-lg-4  col-xl-4">
                                                            <i className="fa-regular fa-calendar-check"></i>
                                                            <span>
                                                                {moment(event.start_date).format("DD/MMM/YYYY")}-
                                                                {moment(event.end_date).format("DD/MMM/YYYY")}
                                                            </span>
                                                        </div>
                                                        <div className="col-sm-12 col-md-6 col-lg-1  col-xl-2">
                                                            <i className="fa-regular fa-calendar-check"></i>
                                                            <span>
                                                                {event.course.weeks} {isEnglish ? "week" : "اسبوع"}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </CustomLink>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

const SearchPageLoading = (props) => (
    <Suspense fallback={<div>Loading...</div>}>
        <SearchPage {...props} />
    </Suspense>
);

export default SearchPageLoading;
