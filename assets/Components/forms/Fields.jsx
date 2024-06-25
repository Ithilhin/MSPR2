import React from "react";

export default function Fields({name, label, value, onChange, placeholder, type = "text", error = "", divClassName = "", inputClassName = "", labelClassName=""}) {
  return (
    <div className={"form-group mb-3 " + divClassName}>
      <label className={labelClassName} htmlFor={name}>{label}</label>
      <input
        value={value}
        onChange={
          onChange
        }
        type={type}
        placeholder={placeholder}
        name={name}
        id={name}
        className={"form-control rounded" + inputClassName + " " +  (error && " is-invalid")}
      />
      {error && <p className="invalid-feedback">{error}</p>}
    </div>
  );
}
