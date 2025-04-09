import Link from "next/link";
import { i18n } from "@/i18n.config";

export default function CustomLink({ href, lang, ...props }) {
    const isDefaultLang = lang === i18n.defaultLocale;
    const path = isDefaultLang ? href : `/${lang}${href}`;
    return <a href={path} {...props} />;
}
