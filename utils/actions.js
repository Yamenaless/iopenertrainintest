"use server";
import customFetch from "../lib/axios";

const searchKeysMap = {
    Keyword: "course:name",
    city: "city:slug",
    durations: "course:weeks",
    month: "start_date",
    category: "course:category_id",
};

export async function searchEvents(params) {
    const query = new URLSearchParams();
    params.forEach((value) => {
        query.set(searchKeysMap[value[0]], value[1]);
    });

    try {
        // search?with=course.category,city&page=1&count=2&course:name=&course:category_id=15&city:slug=&start_date=&course:weeks=
        // const url = `/event/search?with=city,course.category&${query.toString()}`;
        // console.log(url);
        const resp = await customFetch.get(
            `/event/search?with=city,course.category&course:hidden=0&${query.toString()}`
        );
        // console.log(resp.data);
        return resp.data.data;
    } catch (error) {
        console.log(error);
    }
}
