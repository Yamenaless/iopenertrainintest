import FilterAside from "@/components/layout/FilterAside";
import CustomLink from "@/components/tools/custom-link";
import moment from "moment";
import { getAllEventsSearch } from "@/utils/actions";

const EventsList = (events) => {
    // const res = await getAllEventsSearch();
    // const allEvents = res.data;
    // console.log(events);

    return (
        <div className="container  my-5">
            <div className="row">
                <div className="col-12 col-lg-3">
                    <FilterAside />
                </div>
                <div className="col-12 col-lg-9">
                    <div className="global-course">
                        <div className="row">
                            {events.map((event) => (
                                <div className="col-sm-12" key={event.id}>
                                    <div className="box">
                                        <CustomLink>
                                            <div className="row">
                                                <div className="col-12">
                                                    <h5 className="course-name">
                                                        {event.course.name.en}
                                                    </h5>
                                                </div>
                                                <div className="col-sm-12 col-md-6 col-lg-5  col-xl-3">
                                                    <i className="fa-solid fa-tags"></i>
                                                    <span>
                                                        {event.course.code}
                                                    </span>
                                                </div>
                                                <div className="col-sm-12 col-md-6 col-lg-5  col-xl-3">
                                                    <i className="fa-solid fa-map-location-dot"></i>
                                                    <span>
                                                        {event.city.name.en}
                                                    </span>
                                                </div>
                                                <div className="col-sm-12 col-md-6 col-lg-4  col-xl-4">
                                                    <i className="fa-regular fa-calendar-check"></i>
                                                    <span>
                                                        {moment(
                                                            event.start_date
                                                        ).format("DD/MMM/YYYY")}
                                                        -
                                                        {moment(
                                                            event.end_date
                                                        ).format("DD/MMM/YYYY")}
                                                    </span>
                                                </div>
                                                <div className="col-sm-12 col-md-6 col-lg-1  col-xl-2">
                                                    <i className="fa-regular fa-calendar-check"></i>
                                                    <span>
                                                        {event.course.weeks}{" "}
                                                        week
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
    );
};

export default EventsList;

// "use client";

// import { useEffect, useState } from "react";
// import FilterAside from "@/components/layout/FilterAside";
// import CustomLink from "@/components/tools/custom-link";
// import { getAllEventsSearch } from "@/services/allCategories";
// import { useSearchParams } from "next/navigation";

// const EventsList = () => {
//     const [eventsData, setEventsData] = useState(null); // State to hold the data
//     const searchParams = useSearchParams();

//     const keyword = searchParams.get("keyword") || "";
//     const category = searchParams.get("category") || "all";
//     const city = searchParams.get("city") || "all";
//     const month = searchParams.get("month") || "all";
//     const durations = searchParams.get("durations") || "all";

//     useEffect(() => {
//         const fetchData = async () => {
//             const res = await getAllEventsSearch(); // Await the asynchronous function
//             setEventsData(res.data); // Set data in state
//         };
//         fetchData();
//     }, []); // Empty dependency array means this effect will only run once, similar to componentDidMount

//     // Optionally, handle loading state or check if eventsData is null
//     if (!eventsData) {
//         return <div>Loading...</div>;
//     }

//     console.log(eventsData); // Now this should log the data correctly

//     return <div>{/* Render your component using eventsData */}</div>;
// };

// export default EventsList;
