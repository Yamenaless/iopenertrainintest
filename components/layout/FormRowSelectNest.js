const FormRowSelect = ({ labelText, name, handleChange, list }) => {
    return (
        <>
            <div className="form-floating mb-3">
                <select
                    className="form-select"
                    id={name}
                    name={name}
                    onChange={handleChange}
                    aria-label={name}>
                    {list.map((item, index) => {
                        if (typeof item === "string") {
                            return (
                                <option key={index} value={item}>
                                    {item}
                                </option>
                            );
                        } else {
                            return (
                                <option key={index} value={item.value}>
                                    {item.label}
                                </option>
                            );
                        }
                    })}

                    <option value="" disabled selected>
                        Select {labelText}
                    </option>
                </select>
                <label htmlFor={name}>{labelText || name}</label>
            </div>
        </>
    );
};

export default FormRowSelect;
