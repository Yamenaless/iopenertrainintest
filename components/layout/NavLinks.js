import Image from "next/image";
import Link from "next/link";

import customFetch from "@/lib/axios";
import { getDictionary } from "@/lib/dictionary";

import CustomLink from "../tools/custom-link";

import LogoDark from "../../public/media/Logo/logo.svg";
import "../../assets/sass/app.css";
import {
  getAllCategories,
  getCitiesByContinent,
} from "../../services/allCategories";

const NavLinks = async ({ lang }) => {
  const { navigation, continent } = await getDictionary(lang);

  const citiesByContinent = await getCitiesByContinent();
  const categories = await getAllCategories();

  const isEnglish = lang === "en";

  return (
    <nav className="navbar navbar-expand-lg ">
      <div className="container-fluid">
        <CustomLink className="navbar-brand" href="/" lang={lang}>
          <Image
            src={LogoDark}
            alt="iopener training center"
            width={185}
            height={90}
          />
        </CustomLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mb-2 mb-lg-0">
            <li className="nav-item">
              <CustomLink
                className="nav-link active"
                aria-current="page"
                href="/"
                lang={lang}
              >
                {navigation.home}
              </CustomLink>
            </li>
            <li className="nav-item">
              <CustomLink className="nav-link" href="/about" lang={lang}>
                {navigation.about}
              </CustomLink>
            </li>

            <li className="nav-item">
              <CustomLink className="nav-link" href="/cities/25" lang={lang}>
                {navigation.online}
              </CustomLink>
            </li>
            <li className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {navigation.Venues}
              </Link>
              <div className="mega-menu dropdown-menu dropdown-menu-center">
                <div className="row ">
                  {Object.entries(citiesByContinent).map(
                    ([continent, cities]) => (
                      <div key={continent} className="col-md-3">
                        <div className="mega-section">
                          <h6 className="title-mega-section ">
                            {isEnglish ? continent : continent[continent]}
                          </h6>
                          <ul className="list-unstyled">
                            {cities.map((city) => (
                              <li key={city.id}>
                                <CustomLink
                                  className="dropdown-item"
                                  href={`/cities/${city.id}`}
                                  title={
                                    isEnglish ? city.name.en : city.name.ar
                                  }
                                  lang={lang}
                                >
                                  {isEnglish ? city.name.en : city.name.ar}
                                </CustomLink>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            </li>
            <li className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle"
                href="/categories"
                role="button"
                // data-bs-toggle="dropdown"
                // aria-expanded="false"
              >
                {navigation.Categories}
              </Link>

              <div className="mega-menu dropdown-menu dropdown-menu-center our-width ">
                <div className="row custom-row">
                  {categories &&
                    categories.length > 0 &&
                    categories.map((category) => (
                      <div
                        key={category.id}
                        className="col-md-4 mt-2 custom-column our-column-width"
                      >
                        <div className="mega-section">
                          <h6 className="title-mega-section">
                            {isEnglish ? category.name.en : category.name.ar}
                          </h6>
                          <ul className="list-unstyled">
                            {category.children.map((child) => (
                              <li key={child.id}>
                                <CustomLink
                                  className="dropdown-item"
                                  href={`/categories/${child.id}`}
                                  title={
                                    isEnglish ? child.name.en : child.name.ar
                                  }
                                  lang={lang}
                                >
                                  {isEnglish ? child.name.en : child.name.ar}
                                </CustomLink>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </li>

            <li className="nav-item">
              <CustomLink className="nav-link" href="/upcoming" lang={lang}>
                {navigation.Confirmed}
              </CustomLink>
            </li>

            <li className="nav-item">
              <CustomLink className="nav-link" href="/contact" lang={lang}>
                {navigation.contact}
              </CustomLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavLinks;
