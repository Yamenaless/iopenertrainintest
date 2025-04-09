import customFetch from "@/lib/axios";

export default async function sitemap() {
    const basUrl = "https://iopener-training.com";
    const courses = await customFetch.get(`/course`);
    // console.log(courses.data.data);
    const allCourses = courses.data.data;
    const courseUrl =
        allCourses.map((course) => {
            return {
                url: `${basUrl}/categories/${course.category_id}/${course.slug}`,
                lastModified: new Date(),
            };
        }) ?? [];

    return [
        {
            url: "https://iopener-training.com/en",
            lastModified: new Date(),
            changeFrequency: "yearly",
            priority: 1,
        },
        {
            url: "https://iopener-training.com/en/about",
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.8,
        },
        {
            url: "https://iopener-training.com/ar",
            lastModified: new Date(),
            changeFrequency: "yearly",
            priority: 1,
        },
        {
            url: "https://iopener-training.com/ar/about",
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.8,
        },
        ...courseUrl,
    ];
}

// import customFetch from "@/lib/axios";
// import { BaseDomain } from "@/lib/axios";

// export default async function sitemap() {
//     let courseUrl = [];
//     try {
//         const courses = await customFetch.get(`/course`);
//         if (Array.isArray(courses)) {
//             courseUrl = courses.map((course) => ({
//                 url: `${BaseDomain}/categories/${course.category_id}/${course.slug}`,
//                 lastModified: new Date(),
//             }));
//         } else {
//             console.error("Courses data is not an array:", courses);
//         }
//     } catch (error) {
//         console.error("Error fetching courses:", error);
//     }

//     return [
//         {
//             url: "https://iopener-training.com/en",
//             lastModified: new Date(),
//             changeFrequency: "yearly",
//             priority: 1,
//         },
//         {
//             url: "https://iopener-training.com/en/about",
//             lastModified: new Date(),
//             changeFrequency: "monthly",
//             priority: 0.8,
//         },
//         {
//             url: "https://iopener-training.com/ar",
//             lastModified: new Date(),
//             changeFrequency: "yearly",
//             priority: 1,
//         },
//         {
//             url: "https://iopener-training.com/ar/about",
//             lastModified: new Date(),
//             changeFrequency: "monthly",
//             priority: 0.8,
//         },
//         ...courseUrl,
//     ];
// }
