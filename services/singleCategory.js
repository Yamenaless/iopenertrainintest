import customFetch from "../lib/axios";
export default async function getCategory({ id }) {
    try {
        const resp = await customFetch.get(
            `/category/${id}?with=courses.events.city,media`
        );
        return resp.data;
    } catch (error) {
        console.log(error);
    }
}
