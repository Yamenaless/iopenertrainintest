// "use client";

// import Link from "next/link";
// import { usePathname } from "next/navigation";

// import { i18n } from "@/i18n.config";

// export default function LocaleSwitcher() {
//     const pathName = usePathname();

//     const redirectedPathName = (locale) => {
//         if (!pathName) return "/";

//         const pathnameIsMissingLocale = i18n.locales.every(
//             (locale) =>
//                 !pathName.startsWith(`/${locale}/`) && pathName !== `/${locale}`
//         );

//         if (pathnameIsMissingLocale) {
//             if (locale === i18n.defaultLocale) return pathName;
//             return `/${locale}${pathName}`;
//         } else {
//             if (locale === i18n.defaultLocale) {
//                 const segments = pathName.split("/");
//                 const isHome = segments.length === 2;
//                 if (isHome) return "/";

//                 segments.splice(1, 1);
//                 return segments.join("/");
//             }

//             const segments = pathName.split("/");
//             segments[1] = locale;
//             return segments.join("/");
//         }
//     };

//     return (
//         <ul className="nav py-0">
//             {i18n.locales.map((locale) => {
//                 return (
//                     <li key={locale} className="nav-item">
//                         <Link
//                             href={redirectedPathName(locale)}
//                             className="nav-link py-0">
//                             {locale}
//                         </Link>
//                     </li>
//                 );
//             })}
//         </ul>
//     );
// }

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { i18n } from "@/i18n.config";

// Map of language codes to language names
const languageNames = {
    en: "English",
    ar: "عربي",
};

export default function LocaleSwitcher() {
    const pathName = usePathname();
    const currentLocale = pathName.split("/")[1];
    const redirectedPathName = (locale) => {
        if (!pathName) return "/";

        const pathnameIsMissingLocale = i18n.locales.every(
            (locale) =>
                !pathName.startsWith(`/${locale}/`) && pathName !== `/${locale}`
        );

        if (pathnameIsMissingLocale) {
            if (locale === i18n.defaultLocale) return pathName;
            return `/${locale}${pathName}`;
        } else {
            if (locale === i18n.defaultLocale) {
                const segments = pathName.split("/");
                const isHome = segments.length === 2;
                if (isHome) return "/";

                segments.splice(1, 1);
                return segments.join("/");
            }

            const segments = pathName.split("/");
            segments[1] = locale;
            return segments.join("/");
        }
    };

    return (
        <ul className="nav nav-lang py-0">
            {i18n.locales.map((locale) => {
                // Hide the current language from the UI
                if (locale === currentLocale) {
                    return null; // Return null to not render this language
                } else {
                    return (
                        <li key={locale} className="nav-item">
                            <Link
                                href={redirectedPathName(locale)}
                                className="nav-link py-0">
                                {languageNames[locale]}
                            </Link>
                        </li>
                    );
                }
            })}
        </ul>
    );
}
