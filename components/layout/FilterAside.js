import FormRow from "./FormRow";

import {
    getAllCategories,
    getAllCities,
    getAllMonths,
} from "../../services/allCategories";

const FilterAside = async () => {
    const parentCategories = await getAllCategories();
    const categories = parentCategories.flatMap((category) =>
        category.children.map((childCategory) => ({
            value: childCategory.id,
            label: childCategory.name.en,
        }))
    );
    const allCities = await getAllCities();

    const cities = allCities.map((city) => ({
        value: city.slug,
        label: city.name.en,
    }));

    const allMonths = await getAllMonths();
    const formattedMonths = allMonths.map((month) => {
        const [year, monthNumber] = month.split("-");
        return {
            value: month,
            label: moment(`${year}-${monthNumber}-01`).format("MMMM YYYY"),
        };
    });

    return (
        <div className="filter-side d-print-none" id="filter">
            <div className="filter-box">
                <h5 className="title-filter-main">
                    <i className="fas fa-sliders-h"></i> Filter
                </h5>
                <form
                    action="programs.php"
                    method="get"
                    className="filter-form home">
                    <input type="hidden" name="page" value="programs" />

                    <div className="first-fil">
                        {/* <div className="form-group mb-4">
                            <input type="text" name="Keyword" className="form-control form-control-sm" id="keyword" value="Keyword" />
                            <label for=""> Keyword</label>
                        </div> */}
                        <FormRow
                            type="text"
                            name="Keyword"
                            value=""
                            handleChange="keyword"
                        />
                        {/* <FormRow
                            type="text"
                            name="REf"
                            value=""
                            handleChange="REF"
                        /> */}
                    </div>

                    <div className="cat-fil my-4">
                        <h6 className="title-fil-sec">
                            <i className="fas fa-align-justify"></i> Categories
                        </h6>

                        <div className="form-floating mb-3">
                            <select
                                className="form-select"
                                id="category"
                                name="category">
                                {[
                                    { value: "", label: "Choose category" },
                                    ...categories,
                                ].map((category, index) => (
                                    <option key={index} value={category.value}>
                                        {category.label}
                                    </option>
                                ))}
                            </select>

                            <label htmlFor="category">Category</label>
                        </div>

                        {parentCategories.map((parentCategory) =>
                            parentCategory.children.map((child) => (
                                <div className="form-check" key={child.id}>
                                    <input
                                        className="form-check-input"
                                        name="category"
                                        type="checkbox"
                                        id="category"
                                        value="1"
                                    />
                                    <label
                                        className="form-check-label"
                                        for="category">
                                        {child.name.en}
                                    </label>
                                </div>
                            ))
                        )}
                    </div>

                    <div className="city-fil my-4">
                        <h6 className="title-fil-sec">
                            <i className="fas fa-align-justify"></i> Cities
                        </h6>
                        {allCities.map((city) => (
                            <div className="form-check" key={city.id}>
                                <input
                                    className="form-check-input"
                                    name="city"
                                    type="checkbox"
                                    id={city.id}
                                    value={city.id}
                                />
                                <label
                                    className="form-check-label"
                                    htmlFor={city.id}>
                                    {city.name.en}
                                </label>
                            </div>
                        ))}
                    </div>

                    <div className="mon-fil my-4">
                        <h6 className="title-fil-sec">
                            <i className="fas fa-align-justify"></i> Months
                        </h6>
                        {allMonths.map((month) => (
                            <div className="form-check" key={month}>
                                <input
                                    className="form-check-input"
                                    name="month"
                                    type="checkbox"
                                    id={month}
                                    value={month}
                                />
                                <label
                                    className="form-check-label"
                                    htmlFor={month}>
                                    {month}
                                </label>
                            </div>
                        ))}
                    </div>

                    <div className="dur-fil my-4">
                        <h6 className="title-fil-sec">
                            <i className="fas fa-align-justify"></i> Duration
                        </h6>

                        <div className="form-check">
                            <input
                                className="form-check-input"
                                name="duration"
                                type="checkbox"
                                id="duration"
                                value="1"
                            />
                            <label className="form-check-label" for="duration">
                                1 Week
                            </label>
                        </div>
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                name="duration"
                                type="checkbox"
                                id="duration"
                                value="1"
                            />
                            <label className="form-check-label" for="duration">
                                2 Weeks
                            </label>
                        </div>
                    </div>

                    {/* <button type="submit" className="btn btn-block btn-search-fil">
                        Search
                    </button> */}
                </form>
            </div>
        </div>
    );
};

export default FilterAside;
// import FormRow from "./FormRow";

// import {
//     getAllCategories,
//     getAllCities,
//     getAllMonths,
// } from "../../services/allCategories";

// const FilterAside = async () => {
//     const parentCategories = await getAllCategories();
//     const allCities = await getAllCities();
//     const allMonths = await getAllMonths();

//     return (
//         <div className="filter-side d-print-none" id="filter">
//             <div className="filter-box">
//                 <h5 className="title-filter-main">
//                     <i className="fas fa-sliders-h"></i> Filter
//                 </h5>
//                 <form
//                     action="programs.php"
//                     method="get"
//                     className="filter-form home">
//                     <input type="hidden" name="page" value="programs" />

//                     <div className="first-fil">
//                         {/* <div className="form-group mb-4">
//                             <input type="text" name="Keyword" className="form-control form-control-sm" id="keyword" value="Keyword" />
//                             <label for=""> Keyword</label>
//                         </div> */}
//                         <FormRow
//                             type="text"
//                             name="Keyword"
//                             value=""
//                             handleChange="keyword"
//                         />
//                         {/* <FormRow
//                             type="text"
//                             name="REf"
//                             value=""
//                             handleChange="REF"
//                         /> */}
//                     </div>

//                     <div className="cat-fil my-4">
//                         <h6 className="title-fil-sec">
//                             <i className="fas fa-align-justify"></i> Categories
//                         </h6>

//                         {parentCategories.map((parentCategory) =>
//                             parentCategory.children.map((child) => (
//                                 <div className="form-check" key={child.id}>
//                                     <input
//                                         className="form-check-input"
//                                         name="category"
//                                         type="checkbox"
//                                         id="category"
//                                         value="1"
//                                     />
//                                     <label
//                                         className="form-check-label"
//                                         for="category">
//                                         {child.name.en}
//                                     </label>
//                                 </div>
//                             ))
//                         )}
//                     </div>

//                     <div className="city-fil my-4">
//                         <h6 className="title-fil-sec">
//                             <i className="fas fa-align-justify"></i> Cities
//                         </h6>
//                         {allCities.map((city) => (
//                             <div className="form-check" key={city.id}>
//                                 <input
//                                     className="form-check-input"
//                                     name="city"
//                                     type="checkbox"
//                                     id={city.id}
//                                     value={city.id}
//                                 />
//                                 <label
//                                     className="form-check-label"
//                                     htmlFor={city.id}>
//                                     {city.name.en}
//                                 </label>
//                             </div>
//                         ))}
//                     </div>

//                     <div className="mon-fil my-4">
//                         <h6 className="title-fil-sec">
//                             <i className="fas fa-align-justify"></i> Months
//                         </h6>
//                         {allMonths.map((month) => (
//                             <div className="form-check" key={month}>
//                                 <input
//                                     className="form-check-input"
//                                     name="month"
//                                     type="checkbox"
//                                     id={month}
//                                     value={month}
//                                 />
//                                 <label
//                                     className="form-check-label"
//                                     htmlFor={month}>
//                                     {month}
//                                 </label>
//                             </div>
//                         ))}
//                     </div>

//                     <div className="dur-fil my-4">
//                         <h6 className="title-fil-sec">
//                             <i className="fas fa-align-justify"></i> Duration
//                         </h6>

//                         <div className="form-check">
//                             <input
//                                 className="form-check-input"
//                                 name="duration"
//                                 type="checkbox"
//                                 id="duration"
//                                 value="1"
//                             />
//                             <label className="form-check-label" for="duration">
//                                 1 Week
//                             </label>
//                         </div>
//                         <div className="form-check">
//                             <input
//                                 className="form-check-input"
//                                 name="duration"
//                                 type="checkbox"
//                                 id="duration"
//                                 value="1"
//                             />
//                             <label className="form-check-label" for="duration">
//                                 2 Weeks
//                             </label>
//                         </div>
//                     </div>

//                     {/* <button type="submit" className="btn btn-block btn-search-fil">
//                         Search
//                     </button> */}
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default FilterAside;
