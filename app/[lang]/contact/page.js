import Link from "next/link";
import Image from "next/image";
import { getDictionary } from "@/lib/dictionary";

import { social } from "../../../utils/Links";

import FormRow from "@/components/layout/FormRow";
import InnerHeader from "../../../components/layout/InnerHeader";
import ContactForm from "@/components/layout/ContactForm";

import contactHeader from "../../../public/media/header-page/contact.jpg";

import Cover from "../../../public/media/cover-pdf.jpg";
import headerPdf from "../../../public/media/pdf-header.jpg";
import footerPdf from "../../../public/media/pdf-footer.jpg";

export const metadata = {
    title: "Contact us",
    description: "iOpener Training Center",
};

const contact = async ({ params: { lang } }) => {
    const { navigation, form_info, contact, address } = await getDictionary(lang);
    const isEnglish = lang === "en";
    return (
        <>
            <InnerHeader
                image={contactHeader}
                textPage={navigation.contact}
                altText={navigation.contact}
                classHeader="slide-up-inner"
                lang={lang}
                navigation={navigation}
            />
            <Image src={footerPdf} alt="" fill={true} className="d-none" />
            <Image src={headerPdf} alt="" fill={true} className="d-none" />
            <Image src={Cover} alt="" fill={true} className="d-none" />

            <div className="contact-us">
                <div className="container">
                    <div className="info-form">
                        <div className="info-data">
                            <div className="row">
                                <div className="col-sm-12 col-md-5">
                                    <div className="info">
                                        <h4> {navigation.contact} </h4>
                                        <h1>{contact.form_title}</h1>
                                        <div className="communicate">
                                            <div className="box">
                                                <div className="icon">
                                                    <i className="fas fa-phone-volume fa-lg"></i>
                                                </div>
                                                <div className="det">
                                                    <h4>{contact.call_us}</h4>
                                                    <span>
                                                        <Link
                                                            className="phone-num d-block"
                                                            title="Contact Number"
                                                            href="https://wa.me/+971503478728"
                                                            target="_blank">
                                                            00971503478728
                                                        </Link>
                                                        <Link className="phone-num d-block" title="Contact Number" href="https://wa.me/+971503678728">
                                                            00971503678728
                                                        </Link>
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="box">
                                                <div className="icon">
                                                    <i className="fas fa-envelope"></i>
                                                </div>
                                                <div className="det">
                                                    <h4>{contact.email}</h4>
                                                    <span>
                                                        <Link className="" title="" href="mailto:info@iopener-training.com" target="_blank">
                                                            info@iopener-training.com
                                                        </Link>
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="box">
                                                <div className="icon">
                                                    <i className="fas fa-map-marker-alt"></i>
                                                </div>
                                                <div className="det">
                                                    <h4>{contact.location}</h4>
                                                    <span>{address}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="social-us">
                                        <ul className="nav nav-iopener social">
                                            {social.map((link) => {
                                                const { id, url, text } = link;
                                                return (
                                                    <li className="" key={id}>
                                                        <Link className="nav-link" aria-current="page" target="_blank" href={url}>
                                                            {text}
                                                        </Link>
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-sm-12 col-md-7">
                                    <div className="about-form">
                                        <h3 className="title-form mb-3">{contact.contact_us}</h3>
                                        <ContactForm lang={lang} form_info={form_info} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default contact;
