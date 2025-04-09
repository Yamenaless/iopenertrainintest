import Image from "next/image";

import customFetch from "@/lib/axios";
import { BaseDomain } from "@/lib/axios";
import { getDictionary } from "@/lib/dictionary";

import InnerHeader from "../../../components/layout/InnerHeader";

import city from "../../../public/media/header-page/cities.jpg";
import CustomLink from "@/components/tools/custom-link";

export const metadata = {
    title: "Venues",
    description: "iOpener Training Center",
};

const Cities = async ({ params: { lang } }) => {
    const { navigation } = await getDictionary(lang);
    const isEnglish = lang === "en";
    const responsive = await customFetch.get(`/city?with=hotels.media,media`);

    const cities = responsive.data.data;
    return (
        <>
            <InnerHeader
                image={city}
                textPage={navigation.Venues}
                altText={navigation.Venues}
                classHeader="slide-up-inner"
                lang={lang}
                navigation={navigation}
            />

            <div className="cities my-5">
                <div className="container">
                    <div className="row">
                        {cities.map((city) => (
                            <div className="col-12 col-lg-3 mb-3" key={city.id}>
                                <div className="box-city tow">
                                    <CustomLink
                                        href={`/cities/${city.id}`}
                                        title={
                                            isEnglish
                                                ? city.name.en
                                                : city.name.ar
                                        }
                                        lang={lang}>
                                        <Image
                                            src={
                                                city.media.length > 0
                                                    ? `${BaseDomain}/${city.media[0].file_path}`
                                                    : ""
                                            }
                                            alt=""
                                            className="w-100"
                                            width={306}
                                            height={255}
                                        />
                                        <span className="city-name">
                                            {isEnglish
                                                ? city.name.en
                                                : city.name.ar}
                                        </span>
                                    </CustomLink>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Cities;
