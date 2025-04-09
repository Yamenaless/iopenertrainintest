import Link from "next/link";
import Image from "next/image";
import moment from "moment";

import { BaseDomain } from "@/lib/axios";
import { getDictionary } from "@/lib/dictionary";

import CustomLink from "@/components/tools/custom-link";
import InnerHeader from "@/components/layout/InnerHeader";

import { getAllConfirmed } from "../../../services/allCategories";

import Upcoming from "../../../public/media/header-page/upcoming.jpg";

export const metadata = {
    title: "Scheduled Courses",
    description: "iOpener Training Center",
};

const upcoming = async ({ params: { lang } }) => {
    const { navigation } = await getDictionary(lang);

    const allConfirmed = await getAllConfirmed();

    // console.log(allConfirmed);

    const isEnglish = lang === "en";

    // Get today's date
    const today = moment();

    return (
        <>
            <InnerHeader
                image={Upcoming}
                textPage={navigation.Confirmed}
                altText={navigation.Confirmed}
                classHeader="slide-up-inner"
                lang={lang}
                navigation={navigation}
            />

            <div className="confirmed my-5">
                <div className="container">
                    <div className="row">
                        {allConfirmed
                            .filter((confirmed) => moment(confirmed.start_date).isAfter(today))
                            .map((confirmed) => (
                                <div className="col-12 col-lg-3 mb-3" key={confirmed.id}>
                                    <CustomLink
                                        href={`/categories/${confirmed.course.category_id}/${confirmed.course.slug}/${confirmed.id}`}
                                        lang={lang}
                                    >
                                        <div className="course-card">
                                            <Image
                                                src={confirmed.course.media.length > 0 ? `${BaseDomain}/${confirmed.course.media[0].file_path}` : ""}
                                                className="w-100"
                                                height={180}
                                                width={286}
                                                alt="..."
                                            />

                                            <div className="card-body">
                                                <span className="course-cat">{/* {confirmed.course.category.name.en} */}</span>
                                                <h6 className="course-title">{isEnglish ? confirmed.course.name.en : confirmed.course.name.ar}</h6>
                                            </div>
                                            <div className="card-footer">
                                                <div className="city">
                                                    <i className="fa-solid fa-location-dot"></i>
                                                    {confirmed.city.name.en}
                                                </div>
                                                <div className="date">
                                                    <i className="fa-regular fa-calendar-check"></i>
                                                    {/* {confirmed.start_date} */}
                                                    {moment(confirmed.start_date).format("DD/MM/YYYY")}
                                                </div>
                                            </div>
                                        </div>
                                    </CustomLink>
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default upcoming;
