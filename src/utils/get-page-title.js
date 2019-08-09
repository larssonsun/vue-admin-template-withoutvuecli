import defaultSetting from "@/settings"

const title = defaultSetting.title || "Larsson Vue Template"
export default function getPageTitle(pageTitle) {
    if (pageTitle)
        return `${pageTitle} - ${title}`
    else
    return title
}