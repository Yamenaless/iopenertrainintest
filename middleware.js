import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

import { i18n } from "@/i18n.config";

import { match as matchLocale } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";

function getLocale(request) {
    const negotiatorHeaders = {};
    request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

    // @ts-ignore locales are readonly
    const locales = i18n.locales;
    const languages = new Negotiator({
        headers: negotiatorHeaders,
    }).languages();

    const locale = matchLocale(languages, locales, i18n.defaultLocale);
    return locale;
}

export function middleware(request) {
    const pathname = request.nextUrl.pathname;
    const pathnameIsMissingLocale = i18n.locales.every((locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`);

    // Redirect if there is no locale
    if (pathnameIsMissingLocale) {
        const locale = getLocale(request);

        // if (locale === i18n.defaultLocale) {
        //     return NextResponse.rewrite(
        //         new URL(
        //             `/${locale}${
        //                 pathname.startsWith("/") ? "" : "/"
        //             }${pathname}`,
        //             request.url
        //         )
        //     );
        // }

        return NextResponse.redirect(new URL(`/${locale}${pathname.startsWith("/") ? "" : "/"}${pathname}`, request.url));
    }
}

export const config = {
    // Matcher ignoring `/_next/` and `/api/`
    matcher: ["/((?!api|robots|_next/static|_next/image|favicon.ico).*)"],
};
