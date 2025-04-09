const FormRowTextarea = ({ name, value, labelText }) => {
    return (
        <>
            <div className="form-floating">
                <textarea
                    className="form-control"
                    placeholder={labelText}
                    name={name}
                    value={value}
                    id={name}></textarea>
                <label htmlFor={name}>{labelText || name}</label>
            </div>
        </>
    );
};

export default FormRowTextarea;
