import Link from "next/link";
import Image from "next/image";
import moment from "moment";

import { Suspense } from "react";
import { BaseDomain } from "@/lib/axios";
import { getDictionary } from "@/lib/dictionary";

import {
  getAllConfirmed,
  getAllCategories,
  getAllCities,
  getAllMonths,
  getAllDurations,
} from "../../services/allCategories";

import Title from "@/components/layout/Title";
import ButtonIo from "@/components/layout/Button";
import MainSearch from "@/components/layout/MainSearch";
import CategoryCard from "@/components/layout/CategoryCard";
import ContactForm from "@/components/layout/ContactForm";

import CustomLink from "@/components/tools/custom-link";

import SlideImage from "../../public/media/new-slide.jpg";

export default async function Home({ params: { lang } }) {
  const { navigation, btn_more, home, form_info, about } = await getDictionary(
    lang
  );
  const isEnglish = lang === "en";

  const allConfirmed = await getAllConfirmed();

  // Get today's date
  const today = moment();

  // Filter all confirmed courses to show only those with dates after today
  const filteredConfirmed = allConfirmed.filter((confirmed) =>
    moment(confirmed.start_date).isAfter(today)
  );

  const lastTwoConfirmed = filteredConfirmed?.slice(-12) || [];

  const parentCategories = await getAllCategories();

  const cities = await getAllCities();
  const featuredCities = cities
    ? cities.filter((city) => city.featured === 1)
    : [];

  // Main Search data
  const allMonths = await getAllMonths();
  const allDurations = await getAllDurations();

  return (
    <>
      {/* Start Slider Home */}
      <div className="hero-slide">
        <Image src={SlideImage} alt="" fill={true} />
        {/* <div className="container">
                    <div className="info">
                        
                        <h1 className="title">
                            From <span>i</span>nsight to <span>i</span>mpact
                        </h1>
                        <h1 className="title"></h1>
                    </div>
                </div> */}
        <Suspense fallback={<div>Loading...</div>}>
          <div className="main-search">
            <MainSearch
              lang={lang}
              home={home}
              allCities={cities}
              allMonths={allMonths}
              allDurations={allDurations}
              parentCategories={parentCategories}
            />
          </div>

          {/* Other components or content */}
        </Suspense>
      </div>
      {/* End Slider Home */}

      {/* Start Upcoming course */}
      <div className="upcoming">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <Title
                className="section-title text-center"
                text={navigation.Confirmed}
              />
            </div>
            <div className="col-lg-6">
              <div className="cover-btn-home text-end pe-2">
                <ButtonIo
                  className="btn-io-link"
                  href="/upcoming"
                  text={btn_more}
                />
              </div>
            </div>
          </div>
          <div className="upcoming-container">
            <div className="row">
              {lastTwoConfirmed.map((confirmed) => (
                <div className="col-12 col-lg-3 mb-3" key={confirmed.id}>
                  <CustomLink
                    href={`/categories/${confirmed.course.category_id}/${confirmed.course.slug}/${confirmed.id}`}
                    lang={lang}
                  >
                    <div className="course-card">
                      <Image
                        src={
                          confirmed.course.media.length > 0
                            ? `${BaseDomain}/${confirmed.course.media[0].file_path}`
                            : ""
                        }
                        className="w-100"
                        height={180}
                        width={286}
                        alt="..."
                      />

                      <div className="card-body">
                        <span className="course-cat">
                          {/* {confirmed.course.category.name.en} */}
                        </span>
                        <h6 className="course-title">
                          {isEnglish
                            ? confirmed.course.name.en
                            : confirmed.course.name.ar}
                        </h6>
                      </div>
                      <div className="card-footer">
                        <div className="city">
                          <i className="fa-solid fa-location-dot"></i>
                          {confirmed.city.name.en}
                        </div>
                        <div className="date">
                          <i className="fa-regular fa-calendar-check"></i>
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
      </div>
      {/* End Upcoming course */}

      {/* Start Categories */}
      <div className="category">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <Title
                className="section-title text-center"
                text={navigation.Categories}
              />
            </div>
            <div className="col-lg-6">
              <div className="cover-btn-home text-end pe-2">
                <ButtonIo
                  className="btn-io-link"
                  href="/categories"
                  text={btn_more}
                />
              </div>
            </div>
          </div>
          <div className="category-container">
            <div className="row">
              {parentCategories &&
                parentCategories.map((parentCategory) =>
                  parentCategory.children
                    .filter((child) => child.featured === 1)
                    .map((child) => (
                      <div className="col-12 col-lg-3 mb-3" key={child.id}>
                        <CustomLink
                          href={`/categories/${child.id}`}
                          lang={lang}
                        >
                          <CategoryCard
                            image={
                              child.media.length > 0
                                ? `${BaseDomain}/${child.media[0].file_path}`
                                : ""
                            }
                            title={isEnglish ? child.name.en : child.name.ar}
                          />
                        </CustomLink>
                      </div>
                    ))
                )}
            </div>
          </div>
        </div>
      </div>
      {/* End Categories */}

      {/* Start Cities */}
      <div className="cities">
        <div className="container">
          <div className="row g-4">
            <div className="col-sm-12 col-lg-3">
              <div className="box-city info">
                <h4>{navigation.Venues}</h4>
                <h3> {home.city.title} </h3>
                <p>{home.city.text}</p>

                <ButtonIo
                  type="submit"
                  className="btn-io-bg"
                  text={btn_more}
                  href="/cities"
                />
              </div>
            </div>
            {featuredCities.map((city) => (
              <div className="col-12 col-lg-3 mb-3 bg-contain " key={city.id}>
                <div className="box-city tow ">
                  <CustomLink
                    href={`/cities/${city.id}`}
                    title={isEnglish ? city.name.en : city.name.ar}
                    lang={lang}
                  >
                    <Image
                    //   src={
                    //     city.media.length > 0
                    //       ? `${BaseDomain}/${city.media[0].file_path}`
                    //       : ""
                    //   }
                    src={"https://iopener-training.com/_next/image?url=https%3A%2F%2Fapi.iopener-training.com%2Fuploads%2Fcity%2F2024%2F03%2F23%2F33.jpg&w=384&q=75"}
                      alt=""
                      width={306}
                      height={255}
                      className="w-100 "
                    />
                    <span className="city-name">
                      {isEnglish ? city.name.en : city.name.ar}
                    </span>
                  </CustomLink>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Start Cities */}

      {/* Start About us */}
      <div className="about">
        <div className="container">
          <div className="row">
            <div className="col-12 col-lg-6">
              <div className="info">
                <Title
                  className="section-title text-center"
                  text={navigation.about}
                />
                <p className="io-paragraph">{about.text1}</p>
              </div>
            </div>
            <div className="col-12 col-lg-6">
              <div className="about-form">
                <h3 className="title-form"> {home.about.form_title} </h3>
                <ContactForm lang={lang} form_info={form_info} />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* End About us */}
    </>
  );
}
