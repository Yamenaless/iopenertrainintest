import { Roboto, Noto_Kufi_Arabic } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

import "@fortawesome/fontawesome-free/css/all.css";
import "bootstrap/dist/css/bootstrap.css";
import BootstrapClient from "@/components/tools/BootstrapClient.js";
import Script from "next/script";
import "../../assets/sass/app.scss";

import { GoogleTagManager } from "@next/third-parties/google";

import { Locale, i18n } from "@/i18n.config";

import Header from "@/components/layout/header";
import Footer from "@/components/layout/Footer";

import whatsappImage from "@/public/media/whatsapp.png";
const roboto = Roboto({
    weight: ["300", "400", "500", "700", "900"],

    subsets: ["latin"],
});
const Kufi = Noto_Kufi_Arabic({
    weight: ["300", "400", "500", "700", "900"],
    subsets: ["arabic"],
});

export const metadata = {
    metadataBase: new URL("https://iopener-training.com"),
    title: {
        default: "iOpener Training",
        template: "%s - iOpener Training",
    },
    // description: "iOpener Training Center",
    description: {
        default: "iOpener Training Center",
        template: "%s ",
    },

    verification: {
        google: "google-site-verification=B76uH7jDTpAQ6lbDSN7jLOne5UHucz3Wy4y19Jc0ATQ",
    },
};
// export const metadata = {
//     title: "iOpener Training",
//     description: "iOpener Training Center",
// };

export async function generateStaticParams() {
    return i18n.locales.map((locale) => ({ lang: locale }));
}

export default function RootLayout({ children, params }) {
    const { lang } = params;
    const direction = lang === "ar" ? "rtl" : "ltr";

    let primaryFont, secondaryFont;

    if (lang === "ar") {
        primaryFont = Kufi;
    } else {
        primaryFont = roboto;
    }

    return (
        <html lang={lang} dir={direction}>
            <GoogleTagManager gtmId="GTM-MCZLRRF2" />
            <body className={primaryFont.className}>
                <Header lang={params.lang} />
                {children}
                <div className="whatsapp-box">
                    <Link href="https://wa.me/+971503478728" target="_blank">
                        <Image src={whatsappImage} alt="" />
                    </Link>
                </div>
                <Footer lang={params.lang} />
                <Script id="zoho-salesiq-script" type="text/javascript">
                    {`
                    var $zoho=$zoho || {};
                    $zoho.salesiq = $zoho.salesiq || {
                        widgetcode: "siq96e18466f4a86bcd061ddd5fb6355924090682caaf7e5b4ace308c3ad5b7ee0f206701cb6609c94a73be73e3363c0294", 
                        values:{},
                        ready:function(){}
                    };
                    var d=document;
                    var s=d.createElement("script");
                    s.type="text/javascript";
                    s.id="zsiqscript";
                    s.defer=true;
                    s.src="https://salesiq.zohopublic.eu/widget";
                    var t=d.getElementsByTagName("script")[0];
                    t.parentNode.insertBefore(s,t);
                    `}
                </Script>

                <BootstrapClient />
            </body>
        </html>
    );
}
