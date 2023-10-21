import React from "react";

function Select({ id, name, value, options, onChange }) {
  return (
    <select id={id} name={name} onChange={onChange}>
      {options.map((opt) => {
        if (opt.value === value) {
          return (
            <option value={opt.value} selected>
              {opt.label}
            </option>
          );
        }
        return <option value={opt.value}>{opt.label}</option>;
      })}
    </select>
  );
}
export default Select;
