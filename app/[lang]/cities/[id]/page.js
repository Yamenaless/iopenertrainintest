import Image from "next/image";
import moment from "moment";

import customFetch from "@/lib/axios";
import { BaseDomain } from "@/lib/axios";
import { getDictionary } from "@/lib/dictionary";

import InnerHeader from "../../../../components/layout/InnerHeader";
import FilterAside from "@/components/layout/FilterAside";
import CustomLink from "@/components/tools/custom-link";

export async function generateMetadata({ params }) {
  try {
    const res = await customFetch.get(`/city/${params.id}`);
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

const singleCity = async ({ params }) => {
  const lang = params.lang;
  const { navigation, weeks, week, Training_courses_in } = await getDictionary(
    lang
  );
  const isEnglish = lang === "en";
  const cityId = params.id;
  const res = await customFetch.get(
    `/city/${cityId}?with=media,events.course.category`
  );

  const singleCity = res.data;

  // Get today's date
  const today = moment();

  // Filter and sort events by the nearest start date
  const filteredEvents = singleCity.events
    .filter((event) => moment(event.start_date).isAfter(today))
    .sort((a, b) => moment(a.start_date).diff(moment(b.start_date)));

  return (
    <>
      {/* Start Header */}
      <div className="header-title">
        <Image
          src={
            singleCity.media.length > 0
              ? `${BaseDomain}/${singleCity.media[0].file_path}`
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
                      <CustomLink href={`/cities`} lang={lang}>
                        {navigation.Venues}
                      </CustomLink>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      {isEnglish ? singleCity.name.en : singleCity.name.ar}
                    </li>
                  </ol>
                </nav>
              </div>
              <div className="col-md-6">
                <div className="title-inn-slide">
                  <h1 title="">
                    <span> {Training_courses_in} </span>
                    {isEnglish ? singleCity.name.en : singleCity.name.ar}
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* End Header */}

      <div className="container  my-5">
        <div className="row">
          {/* <div className="col-12 col-lg-3">
                        <FilterAside />
                    </div> */}
          <div className="col-12 col-lg-12">
            <div className="global-course">
              <div className="row">
                {filteredEvents.map((event) => (
                  <div className="col-sm-12" key={event.id}>
                    <div className="box">
                      <CustomLink
                        href={`/categories/${event.course.category.id}/${event.course.slug}/${event.id}`}
                        lang={lang}
                      >
                        <div className="row">
                          <div className="col-12">
                            <h5 className="course-name">
                              {isEnglish
                                ? event.course.name.en
                                : event.course.name.ar}
                            </h5>
                          </div>
                          <div className="col-sm-12 col-md-6 col-lg-5  col-xl-3">
                            <i className="fa-solid fa-tags"></i>
                            <span>{event.course.code}</span>
                          </div>
                          <div className="col-sm-12 col-md-6 col-lg-5  col-xl-3">
                            <i className="fa-solid fa-map-location-dot"></i>
                            <span>
                              {isEnglish
                                ? singleCity.name.en
                                : singleCity.name.ar}
                            </span>
                          </div>
                          <div className="col-sm-12 col-md-6 col-lg-4  col-xl-4">
                            <i className="fa-regular fa-calendar-check"></i>
                            <span>
                              {moment(event.start_date).format("DD/MMM/YYYY")}
                              <br/>
                              {moment(event.end_date).format("DD/MMM/YYYY")}
                            </span>
                          </div>
                          <div className="col-sm-12 col-md-6 col-lg-1  col-xl-2">
                            <i className="fa-regular fa-calendar-check"></i>
                            <span>
                              {event.course.weeks}
                              {event.course.weeks > 1
                                ? ` ${weeks}`
                                : ` ${week}`}
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

export default singleCity;
