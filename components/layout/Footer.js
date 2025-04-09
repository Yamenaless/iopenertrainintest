import Link from "next/link";
import Image from "next/image";
import { getDictionary } from "@/lib/dictionary";
import { getAllCategories } from "../../services/allCategories";
import { social } from "../../utils/Links";
import logoWhite from "../../public/media/Logo/logo-withe.svg";
import CustomLink from "../tools/custom-link";

const Footer = async ({ lang }) => {
  const {
    navigation,
    copy_text,
    address,
    folow,
    terms,
    privacy,
    cancellationPolicy,
  } = await getDictionary(lang);
  const categories = await getAllCategories();

  // Check if navigation is undefined before accessing its properties
  const categoriesTitle = navigation && navigation.Categories;

  const isEnglish = lang === "en";
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-3">
            <div className="footer-logo">
              <Image
                src={logoWhite}
                alt="iopener training center"
                width={280}
                height={150}
              />
            </div>
            <h5 className="title-footer">{navigation && navigation.contact}</h5>

            <ul className="nav nav-iopener flex-column contact">
              <li className="nav-item">
                <Link
                  className="nav-link"
                  aria-current="page"
                  href="https://wa.me/+971503478728"
                >
                  <i className="fa-solid fa-phone for-p"></i>{" "}
                  <i className="fa-brands fa-whatsapp"></i>
                  <span className="mobile-num">
                    00971 (50) 3<span>4</span>7 8728
                  </span>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  aria-current="page"
                  href="https://wa.me/+971503678728"
                >
                  <i className="fa-solid fa-phone for-p"></i>{" "}
                  <i className="fa-brands fa-whatsapp"></i>
                  <span className="mobile-num">
                    00971 (50) 3<span>6</span>7 8728
                  </span>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  aria-current="page"
                  href="mailto:info@iopener-training.com"
                >
                  <i className="fa-regular fa-envelope for-p"></i>
                  <span>info@iopener-training.com</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  aria-current="page"
                  href="mailto:info@iopener-training.com"
                >
                  <i className="fa-solid fa-location-dot"></i>
                  <span>{address}</span>
                </Link>
              </li>
            </ul>
            <div className="FOLLOW-SECTION mb -sm-5">
              <h5 className="title-footer py-3 mt-5">{folow}</h5>
              <ul className="nav nav-iopener social">
                {social.map((link) => (
                  <li className="nav-item" key={link.id}>
                    <Link
                      className="nav-link"
                      aria-current="page"
                      target="_blank"
                      href={link.url}
                    >
                      {link.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {/* <div className="col-sm-12 col-md-9">
            <div className="box">
              <div className="row">
                {categories &&
                  categories.map((category) => (
                    <div key={category.id} className="col-md-4">
                      <h5 className="title-main-cat">
                        {isEnglish ? category.name.en : category.name.ar}
                      </h5>
                      <ul className="nav nav-iopener flex-column">
                        {category.children.map((child) => (
                          <li className="nav-item" key={child.id}>
                            <CustomLink
                              className="nav-link"
                              href={`/categories/${child.id}`}
                              title={isEnglish ? child.name.en : child.name.ar}
                              lang={lang}
                            >
                              {isEnglish ? child.name.en : child.name.ar}
                            </CustomLink>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
              </div>
            </div>
          </div> */}

          <div className="col-sm-12 col-md-9 d-none d-md-block">
            <div className="box">
              <div className="row">
                {categories &&
                  categories.map((category) => (
                    <div key={category.id} className="col-md-4">
                      <h5 className="title-main-cat">
                        {isEnglish ? category.name.en : category.name.ar}
                      </h5>
                      <ul className="nav nav-iopener flex-column">
                        {category.children.map((child) => (
                          <li className="nav-item" key={child.id}>
                            <CustomLink
                              className="nav-link"
                              href={`/categories/${child.id}`}
                              title={isEnglish ? child.name.en : child.name.ar}
                              lang={lang}
                            >
                              {isEnglish ? child.name.en : child.name.ar}
                            </CustomLink>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
        <div className="copy">
          <div className="row">
            <div className="col-lg-6">
              <ul className="nav nav-iopener ">
                <li className="nav-item">
                  <CustomLink
                    className="nav-link"
                    href={`/privacy`}
                    lang={lang}
                  >
                    {privacy.privacy_policy}
                  </CustomLink>
                </li>
                <li className="nav-item">
                  <CustomLink className="nav-link" href={`/terms`} lang={lang}>
                    {terms.terms_and_conditions}
                  </CustomLink>
                </li>
                <li className="nav-item">
                  <CustomLink
                    className="nav-link"
                    href={`/cancellation`}
                    lang={lang}
                  >
                    {cancellationPolicy.Cancellation_Policy_title}
                  </CustomLink>
                </li>
              </ul>
            </div>
            <div className="col-md-6">
              <div className="text">
                {copy_text} &copy; {currentYear}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
