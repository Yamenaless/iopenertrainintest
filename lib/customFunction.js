export function removeHtmlTags(str) {
    return str.replace(/<[^>]*>/g, "");
}
