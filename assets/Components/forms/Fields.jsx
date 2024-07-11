import React from "react";

// Defines a functional component named Fields that is exported by default.
// This component is designed to render a form field with various customizable properties.
export default function Fields({
  name, // A string that represents the name and id of the input element, used for identification.
  label, // A string that represents the label text for the input element.
  value, // The current value of the input element, making this a controlled component.
  onChange, // A function that handles the change event of the input, allowing the parent component to update the value.
  placeholder, // A string that provides a short hint that describes the expected value of the input field.
  type = "text", // Specifies the type of input. Defaults to "text" if not provided.
  error = "", // A string that represents validation error messages for the input. If present, alters input styling to indicate an error.
  divClassName = "", // An optional string for additional CSS classes to be applied to the wrapper div.
  inputClassName = "", // An optional string for additional CSS classes to be applied to the input element.
  labelClassName="" // An optional string for additional CSS classes to be applied to the label element.
}) {
  return (
    <div className={"form-group mb-3 " + divClassName}>
      {/* Renders the label element with dynamic content and CSS classes. */}
      <label className={labelClassName} htmlFor={name}>{label}</label>
      {/* Renders the input element with various props controlling its behavior and appearance.
          The className dynamically includes 'is-invalid' if there's an error, to style it accordingly. */}
      <input
        value={value}
        onChange={onChange}
        type={type}
        placeholder={placeholder}
        name={name}
        id={name}
        className={"form-control rounded" + inputClassName + " " +  (error && " is-invalid")}
      />
      {/* Conditionally renders a paragraph element to display the error message if an error exists. */}
      {error && <p className="invalid-feedback">{error}</p>}
    </div>
  );
}