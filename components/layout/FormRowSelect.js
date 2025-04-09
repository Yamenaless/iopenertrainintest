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
                    {list.map((itemValue, index) => {
                        return (
                            <option key={index} value={itemValue} selected>
                                {itemValue}
                            </option>
                        );
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
