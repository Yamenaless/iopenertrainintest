// const FormRow = ({ type, id, name, placeholder, label }) => {
//     return (
//         <div className="form-floating mb-3">
//             <input type={type} id={id} name={name} placeholder={placeholder} className="form-control" required />
//             <label htmlFor={id}>{label}</label>
//         </div>
//     );
// };

// export default FormRow;
// const FormRow = ({ type, name, labelText }) => {
//     return (
//         <>
//             <div className="form-floating mb-3">
//                 <input
//                     type={type}
//                     id={name}
//                     name={name}
//                     // onChange={handleChange}
//                     placeholder={labelText}
//                     className="form-control"
//                     required
//                 />
//                 <label htmlFor={name}>{labelText || name}</label>
//             </div>
//         </>
//     );
// };

// export default FormRow;

const FormRow = ({ type, id, name, placeholder }) => {
    console.log("Placeholder:", placeholder); // Add this line for debugging
    return (
        <>
            <div className="form-floating mb-3">
                <input
                    type={type}
                    id={id}
                    name={name}
                    placeholder={placeholder}
                    className="form-control"
                    required
                />
                <label htmlFor={id}>{placeholder || name}</label>
            </div>
        </>
    );
};

export default FormRow;
