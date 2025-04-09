import LocaleSwitcher from "../tools/locale-switcher";
import CustomLink from "../tools/custom-link";

import { Locale } from "@/i18n.config";
import { getDictionary } from "@/lib/dictionary";
import Link from "next/link";
import { social } from "../../utils/Links";

import NavLinks from "./NavLinks";

import React from "react";
import ExcelFileDownloadBtn from "../btn/ExcelDownloadBtn";
const header = async ({ lang }) => {
  const { navigation } = await getDictionary(lang);

  return (
    <>
      <header>
        {/* Start Top Header */}
        <div className="top-header">
          <div className="container">
            <div className="row">
              <div className="col-lg-6">
                <div className="left-top">
                  <Link
                    href="mailto:info@iopener-training.com"
                    className="email-top"
                  >
                    info@iopener-training.com
                  </Link>
                  <Link
                    href="https://wa.me/+971503478728"
                    className="mobile-top"
                  >
                    00971503478728
                  </Link>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="right-top d-sm-block d-lg-flex justify-content-end ">
                  <ul className="nav nav-iopener social my-2 my-lg-0">
                    {social.map((link) => (
                      <li className="nav-item" key={link?.id}>
                        <Link
                          className="nav-link py-0"
                          aria-current="page"
                          target={`${link?.blank ? link?.blank : ""}`}
                          href={link?.url}
                        >
                          {link?.text}
                        </Link>
                      </li>
                    ))}
                  </ul>

                  {/* yamen updates */}

                  <ExcelFileDownloadBtn/>

                  {/* yamen updates */}

                  <LocaleSwitcher />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* End Top Header */}
        <div className="container">
          {/* Start Navbar */}
          <div className="nav-iopener">
            <NavLinks lang={lang} navigation={navigation} />
          </div>
          {/* End Navbar */}
        </div>
      </header>
    </>
  );
};

export default header;
