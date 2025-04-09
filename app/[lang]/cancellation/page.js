import { getDictionary } from "@/lib/dictionary";
import InnerHeader from "../../../components/layout/InnerHeader";
import privacyHeader from "../../../public/media/header-page/privacy.png";

export const metadata = {
  title: "Cancellation Policy",
  description: "iOpener Training Center Cancellation Policy",
};

export default async function CancellationPage({ params: { lang } }) {
  const { navigation, cancellationPolicy } = await getDictionary(lang);

  // Function to format content with bullet points
  const formatContent = (content) => {
    return content.split("\n").map((paragraph, index) => {
      if (paragraph.startsWith("●")) {
        return (
          <ul className="list-iopener items-center">
            {" "}
            <li key={index}>{paragraph.substring(1).trim()}</li>{" "}
          </ul>
        );
      }
      return (
        <p className="items-center" key={index}>
          {paragraph}
        </p>
      );
    });
  };

  return (
    <>
      <InnerHeader
        image={privacyHeader}
        textPage={cancellationPolicy.Cancellation_Policy_title}
        altText={cancellationPolicy.Cancellation_Policy_title}
        classHeader="slide-up-inner"
        lang={lang}
        navigation={navigation}
      />
      <div className="terms about">
        <div className="container">
          <h2 className="title-inn1">{cancellationPolicy.titles.Overview}</h2>
          <p>{cancellationPolicy.Overview}</p>

          <h2 className="title-inn1">{cancellationPolicy.titles.Participant_Initiated_Cancellations}</h2>
          <div>
            {formatContent(
              cancellationPolicy["Participant-Initiated Cancellations"]
            )}
          </div>

          <h2 className="title-inn1">{cancellationPolicy.titles.Rescheduling_Requests}</h2>
          <div>
            {formatContent(cancellationPolicy["Rescheduling Requests"])}
          </div>

          <h2 className="title-inn1">
            {
              cancellationPolicy.titles.iOpener_Training_Group_Initiated_Cancellations
            }
          </h2>
          <div>
            {formatContent(
              cancellationPolicy[
                "iOpener Training Group-Initiated Cancellations"
              ]
            )}
          </div>

          <h2 className="title-inn1">{cancellationPolicy.titles.Force_Majeure}</h2>
          <div>{formatContent(cancellationPolicy["Force Majeure"])}</div>

          <h2 className="title-inn1">{cancellationPolicy.titles.Contact_Information}</h2>
          <p>{cancellationPolicy.Contact_For}</p>
          <strong>
            <div>
              {formatContent(cancellationPolicy["Contact Information"])}
            </div>
          </strong>

          <h2 className="title-inn1">{cancellationPolicy.titles.Acknowledgment}</h2>
          <p>{cancellationPolicy.Acknowledgment}</p>
        </div>
      </div>
    </>
  );
}
