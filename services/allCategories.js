import customFetch from "../lib/axios";

export async function getAllCategories() {
    try {
        const resp = await customFetch.get("/category/root?with=media,courses");
        return resp.data;
    } catch (error) {
        console.log(error);
    }
}

// export async function getAllCategories() {
//     try {
//         const resp = await customFetch.get("/category/root?with=media,courses");
//         return resp.data.data;
//     } catch (error) {
//         console.error("Error fetching categories:", error);
//         // Throw an error or return a default value here
//         throw error;
//     }
// }

export async function getAllCities() {
    try {
        const resp = await customFetch.get("/city?with=hotels.media,media");
        return resp.data.data;
    } catch (error) {
        console.log(error);
    }
}

export async function getCitiesByContinent() {
    const resp = await customFetch.get("/city?with=hotels.media,media");
    const cities = resp.data.data;

    const citiesByContinent = cities.reduce((acc, city) => {
        if (!acc[city.continent]) {
            acc[city.continent] = [];
        }
        acc[city.continent].push(city);
        return acc;
    }, {});

    return citiesByContinent;
}

export async function getAllMonths() {
    try {
        const resp = await customFetch.get("/event/months");
        return resp.data;
    } catch (error) {
        console.log(error);
    }
}
export async function getAllDurations() {
    try {
        const resp = await customFetch.get("/event/durations");
        return resp.data;
    } catch (error) {
        console.log(error);
    }
}

export async function getAllConfirmed() {
    try {
        const resp = await customFetch.get("/event/search?confirmed=1&with=city,course.media");
        return resp.data.data;
    } catch (error) {
        console.log(error);
    }
}

// {{base_url}}/event/search?with=city,course.category&city:slug=istanbul&weeks=2&start_date=2024-06-12&course:category_id=12&course:name=eeeeeeee
