import { getDictionary } from "@/lib/dictionary";
import InnerHeader from "../../../components/layout/InnerHeader";
import privacyHeader from "../../../public/media/header-page/privacy.png";

export const metadata = {
    title: "Terms and Conditions",
    description: "iOpener Training Center",
};

export default async function TermsPage({ params: { lang } }) {
    const { navigation, terms } = await getDictionary(lang);

    return (
        <>
            <InnerHeader
                image={privacyHeader}
                textPage={terms.terms_and_conditions}
                altText={terms.terms_and_conditions}
                classHeader="slide-up-inner"
                lang={lang}
                navigation={navigation}
            />
            <div className="terms about">
                <div className="container">
                    <h2 className="title-inn1">{terms.introduction}</h2>
                    <p>{terms.intro_text}</p>

                    <h2 className="title-inn1">{terms.eligibility_title}</h2>
                    <p>{terms.eligibility_text}</p>

                    <h2 className="title-inn1">{terms.license_title}</h2>
                    <p>{terms.license_text}</p>

                    <h2 className="title-inn1">{terms.prohibited_actions_title}</h2>
                    <ul className="list-iopener">
                        {terms.prohibited_actions_points.map((point, index) => (
                            <li key={index}>{point}</li>
                        ))}
                    </ul>

                    <h2 className="title-inn1">{terms.restricted_access_title}</h2>
                    <p>{terms.restricted_access_text}</p>

                    <h2 className="title-inn1">{terms.no_warranties_title}</h2>
                    <p>{terms.no_warranties_text}</p>

                    <h2 className="title-inn1">{terms.severability_title}</h2>
                    <p>{terms.severability_text}</p>

                    <h2 className="title-inn1">{terms.variation_title}</h2>
                    <p>{terms.variation_text}</p>

                    <h2 className="title-inn1">{terms.entire_agreement_title}</h2>
                    <p>{terms.entire_agreement_text}</p>
                </div>
            </div>
        </>
    );
}
