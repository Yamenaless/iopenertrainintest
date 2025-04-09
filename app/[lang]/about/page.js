import Image from "next/image";
import { getDictionary } from "@/lib/dictionary";

import InnerHeader from "../../../components/layout/InnerHeader";

import aboutHeader from "../../../public/media/header-page/about.jpg";
import visionImage from "../../../public/media/about/value-n.jpg";
import missionImage from "../../../public/media/about/mision-n.jpg";
import ObjectivesImage from "../../../public/media/about/vision-n.jpg";

export const metadata = {
    title: "About us",
    description: "iOpener Training Center",
};

export default async function About({ params: { lang } }) {
    const { navigation, about } = await getDictionary(lang);
    const isEnglish = lang === "en";

    return (
        <>
            <InnerHeader
                image={aboutHeader}
                textPage={navigation.about}
                altText={navigation.about}
                classHeader="slide-up-inner"
                lang={lang}
                navigation={navigation}
            />
            <div className="about" id="about">
                {/* about */}
                <div className="about-inn">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-12 col-md-12">
                                <h2 className="title-inn1"> {about.title1} </h2>
                                <p> {about.text1} </p>
                            </div>

                            <div className="col-sm-12">
                                <h2 className="title-inn1"> {about.title2} </h2>
                                <p> {about.text2} </p>
                            </div>
                            <div className="col-sm-12">
                                <h2 className="title-inn1"> {about.title3} </h2>
                                <ul className="list-iopener">
                                    <li>
                                        <strong>{about.title31}: </strong>
                                        {about.text31}
                                    </li>
                                    <li>
                                        <strong>{about.title32}:</strong>
                                        {about.text32}
                                    </li>
                                    <li>
                                        <strong>{about.title33}:</strong>
                                        {about.text33}
                                    </li>
                                </ul>
                                <p> {about.text34} </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* values  */}
                <div className="container" id="vision">
                    <div className="vision">
                        <div className="row">
                            <div className="col-sm-12 col-md-8">
                                <div className="info">
                                    <h3> {about.values} </h3>
                                    <ul className="list-iopener">
                                        <li>
                                            <strong>{about.values_title1}:</strong>
                                            {about.values_text1}
                                        </li>
                                        <li>
                                            <strong>{about.values_title2}:</strong>
                                            {about.values_text2}
                                        </li>
                                        <li>
                                            <strong>{about.values_title3}:</strong>
                                            {about.values_text3}
                                        </li>
                                        <li>
                                            <strong>{about.values_title4}:</strong>
                                            {about.values_text4}
                                        </li>
                                        <li>
                                            <strong>{about.values_title15}:</strong>
                                            {about.values_text5}
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-sm-12 col-md-4">
                                <div className="image">
                                    <Image src={ObjectivesImage} alt="" className="w-100 h-100" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mission */}
                <div className="container">
                    <div className="Mission" id="mission">
                        <div className="row">
                            <div className="col-sm-12 col-md-4">
                                <div className="image">
                                    <Image src={missionImage} alt="" className="w-100 h-100" />
                                </div>
                            </div>
                            <div className="col-sm-12 col-md-8">
                                <div className="info">
                                    <h3> {about.mission_title} </h3>
                                    <p>{about.mission_text}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container">
                    <div className="Objectives" id="objectives">
                        <div className="row">
                            <div className="col-sm-12 col-md-8">
                                <div className="info">
                                    <h3> {about.vision_title} </h3>
                                    <p> {about.vision_text} </p>
                                </div>
                            </div>
                            <div className="col-sm-12 col-md-4">
                                <div className="image">
                                    <Image src={visionImage} alt="" className="w-100 h-100" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="about-inn">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-12 col-md-12">
                                <h2 className="title-inn1"> {about.title5} </h2>
                                <p> {about.text5} </p>
                            </div>

                            <div className="col-sm-12">
                                <h2 className="title-inn1"> {about.title6} </h2>
                                <p> {about.text6} </p>
                            </div>
                            <div className="col-sm-12">
                                <h2 className="title-inn1"> {about.title7} </h2>
                                <p> {about.text7} </p>
                            </div>
                            <div className="col-sm-12">
                                <p> {about.text8} </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
