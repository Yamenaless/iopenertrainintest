import { getDictionary } from "@/lib/dictionary";
import InnerHeader from "../../../components/layout/InnerHeader";
import privacyHeader from "../../../public/media/header-page/privacy.png";

export const metadata = {
    title: "Privacy Policy",
    description: "iOpener Training Center",
};

export default async function PrivacyPage({ params: { lang } }) {
    const { navigation, privacy } = await getDictionary(lang);
    const isEnglish = lang === "en";

    return (
        <>
            <InnerHeader
                image={privacyHeader}
                textPage={privacy.privacy_policy}
                altText={privacy.privacy_policy}
                classHeader="slide-up-inner"
                lang={lang}
                navigation={navigation}
            />
            <div className="privacy about">
                <div className="container">
                    <h2 className="title-inn1">{privacy.introduction}</h2>
                    <p>{privacy.welcome}</p>
                    <h2 className="title-inn1">{privacy.info_collect_title}</h2>
                    <p>{privacy.info_collect_details}</p>
                    <ul className="list-iopener">
                        {privacy.info_collect_points.map((point, index) => (
                            <li key={index}>{point}</li>
                        ))}
                    </ul>
                    <h2 className="title-inn1">{privacy.legal_basis_title}</h2>
                    <p>{privacy.legal_basis_details}</p>
                    <ul className="list-iopener">
                        {privacy.legal_basis_points.map((point, index) => (
                            <li key={index}>{point}</li>
                        ))}
                    </ul>
                    <h2 className="title-inn1">{privacy.use_info_title}</h2>
                    <p>{privacy.use_info_details}</p>
                    <ul className="list-iopener">
                        {privacy.use_info_points.map((point, index) => (
                            <li key={index}>{point}</li>
                        ))}
                    </ul>
                    <h2 className="title-inn1">{privacy.protection_info_title}</h2>
                    <p>{privacy.protection_info_details}</p>
                    <h2 className="title-inn1">{privacy.data_retention_title}</h2>
                    <p>{privacy.data_retention_details}</p>
                    <h2 className="title-inn1">{privacy.user_rights_title}</h2>
                    <p>{privacy.user_rights_details}</p>
                    <ul className="list-iopener">
                        {privacy.user_rights_points.map((point, index) => (
                            <li key={index}>{point}</li>
                        ))}
                    </ul>
                    <h2 className="title-inn1">{privacy.non_disclosure_title}</h2>
                    <p>{privacy.non_disclosure_details}</p>
                    <h2 className="title-inn1">{privacy.third_party_title}</h2>
                    <p>{privacy.third_party_details}</p>
                    <h2 className="title-inn1">{privacy.cookies_title}</h2>
                    <p>{privacy.cookies_details}</p>
                    <h2 className="title-inn1">{privacy.feedback_title}</h2>
                    <p>{privacy.feedback_details}</p>
                    <h2 className="title-inn1">{privacy.changes_title}</h2>
                    <p>{privacy.changes_details}</p>
                </div>
            </div>
        </>
    );
}
