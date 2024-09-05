import React from 'react';

function FluxRadio({ checked, name, onChange }) {
    return (
        <div className="form-check form-check-inline">
            <input
                type="radio"
                name="flux"
                value={name}
                checked={checked}
                onChange={onChange}
                id={name}
                className="form-check-input"
            />
            <label htmlFor={name} className="form-check-label">
                {name}
            </label>
        </div>
    );
}

export default FluxRadio;
