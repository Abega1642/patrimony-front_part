export function Inputs({field, setField, type, label, placeholder}) {
    return (
        <div className='form-group mb-3'>
            <label className="form-label">{label}</label>
            <input 
                className="form-control"
                type={type}
                placeholder={placeholder}
                value={field}
                onChange={(e) => setField(e.target.value)}
            />
        </div>
    )
}