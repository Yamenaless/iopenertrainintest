"use client";
import moment from "moment";
import ButtonIo from "../layout/Button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const MainSearch = ({ lang, home, allCities, allMonths, allDurations, parentCategories = [] }) => {
    const searchParams = useSearchParams();
    const keyword = searchParams.get("keyword") || "";
    const category = searchParams.get("category") || "";
    const city = searchParams.get("city") || "";
    const month = searchParams.get("month") || "";
    const durations = searchParams.get("durations") || "";

    const router = useRouter();
    const pathname = usePathname();

    const categories = parentCategories.flatMap((category) =>
        category.children.map((childCategory) => ({
            value: childCategory.id,
            label: childCategory.name.en,
        }))
    );

    const cities = allCities.map((city) => ({
        value: city.slug,
        label: city.name.en,
    }));

    // const formattedMonths = allMonths.map((month) => {
    //     const [year, monthNumber] = month.split("-");
    //     return {
    //         value: month,
    //         label: moment(`${year}-${monthNumber}-01`).format("MMMM YYYY"),
    //     };
    // });

    const currentMonth = moment().format("YYYY-MM");
    const formattedMonths = allMonths
        .filter((month) => moment(`${month}-01`).isSameOrAfter(moment(), "month"))
        .map((month) => {
            const [year, monthNumber] = month.split("-");
            return {
                value: month,
                label: moment(`${year}-${monthNumber}-01`).format("MMMM YYYY"),
            };
        });

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const keyword = formData.get("keyword");
        const category = formData.get("category");
        const city = formData.get("city");
        const month = formData.get("month");
        const durations = formData.get("durations");

        let params = new URLSearchParams();
        params.set("Keyword", keyword);
        params.set("category", category);
        params.set("city", city);
        params.set("month", month);
        params.set("durations", durations);

        router.push(`${pathname}/search/?${params.toString()}`);
    };

    return (
        <>
            <h4 className="title-search"> {home.search.title} </h4>
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col-12 col-lg-4">
                        <div className="form-floating mb-3">
                            <input
                                type="text"
                                id="keyword"
                                name="keyword"
                                placeholder="Find keyword"
                                className="form-control"
                                defaultValue={keyword}
                            />
                            <label htmlFor="keyword">{home.search.keyword}</label>
                        </div>
                    </div>
                    <div className="col-12 col-lg-4">
                        <div className="form-floating mb-3">
                            <select className="form-select" id="category" name="category" defaultValue={category}>
                                {[{ value: "", label: "Choose category" }, ...categories].map((category, index) => (
                                    <option key={index} value={category.value}>
                                        {category.label}
                                    </option>
                                ))}
                            </select>

                            <label htmlFor="category">Category</label>
                        </div>
                    </div>
                    <div className="col-12 col-lg-4">
                        <div className="form-floating mb-3">
                            <select className="form-select" id="city" name="city" defaultValue={city}>
                                {[{ value: "", label: "choose city" }, ...cities].map((city, index) => (
                                    <option key={index} value={city.value}>
                                        {city.label}
                                    </option>
                                ))}
                            </select>

                            <label htmlFor="city">City</label>
                        </div>
                    </div>
                    <div className="col-12 col-lg-4">
                        <div className="form-floating mb-3">
                            <select className="form-select" id="month" name="month" defaultValue={month}>
                                {[{ value: "", label: "Choose Month" }, ...formattedMonths].map((month, index) => (
                                    <option key={index} value={month.value}>
                                        {month.label}
                                    </option>
                                ))}
                            </select>

                            <label htmlFor="month">Month</label>
                        </div>
                    </div>
                    <div className="col-12 col-lg-4">
                        <div className="form-floating mb-3">
                            <select className="form-select" id="durations" name="durations" defaultValue={durations}>
                                {[
                                    { value: "", label: "Choose duration" },
                                    ...allDurations.map((duration) => ({
                                        value: duration,
                                        label: duration,
                                    })),
                                ].map((duration, index) => (
                                    <option key={index} value={duration.value}>
                                        {duration.label}
                                    </option>
                                ))}
                            </select>
                            <label htmlFor="durations">Duration</label>
                        </div>
                    </div>
                    <div className="col-12 col-lg-4">
                        <button type="submit" className="btn-io-bg d-block mb-3">
                            Search
                        </button>
                    </div>
                </div>
            </form>
        </>
    );
};

export default MainSearch;
