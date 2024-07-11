import React, { useState } from "react";
import Fields from "../Components/forms/Fields";
import { useNavigate } from "react-router-dom";
import contactsAPI from "../Services/contactsAPI";
import { toast } from "react-toastify";
import Title from "../Components/Title";
import TextForDisplay from "../Components/TextForDisplay";

// ContactFormPage component for the contact form page
export default function ContactFormPage() {
  // State for contact form data
  const [contact, setContact] = useState({
    lastName: "",
    firstName: "",
    email: "",
    tel: "",
    message: "",
  });

  // State for form errors
  const [errors, setErrors] = useState({
    lastName: "",
    firstName: "",
    email: "",
    tel: "",
    message: "",
  });

  const navigate = useNavigate();

  // Handle change in form fields
  const handleChange = ({ currentTarget }) => {
    const { name, value } = currentTarget;
    setContact({ ...contact, [name]: value }); // Update contact state with field values
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    try {
      await contactsAPI.postContactMessage(contact);
      toast.success("Votre message a bien été envoyé"); // Show success notification
      navigate("/", { replace: true }); // Navigate to homepage after successful submission
      setErrors({}); // Reset errors state
    } catch (error) {
      console.error("An unexpected error occurred:", error); // Log error for debugging
      const { violations } = error.response.data;
      if (violations) {
        const apiErrors = {};
        violations.forEach(({ propertyPath, message }) => {
          apiErrors[propertyPath] = message; // Map API errors to fields
        });
        setErrors(apiErrors); // Update errors state with API errors
        toast.error("Des erreurs dans votre formulaire"); // Show error notification
      }
    }
  };

  return (
    <form
      className="container d-flex justify-content-center align-items-center row m-auto"
      onSubmit={handleSubmit} // Form submission handler
    >
      <Title text={"Laissez Nous Un Message"} />
      <Fields
        divClassName="col-12 col-md-6"
        name="lastName"
        label="Nom de famille*"
        placeholder="Votre nom de famille"
        value={contact.lastName} // Controlled component value from state
        onChange={handleChange} // Handler for changes in input
        error={errors.lastName} // Error message for validation feedback
      />
      <Fields
        divClassName="col-12 col-md-6"
        name="firstName"
        label="Prénom*"
        placeholder="Votre prénom"
        value={contact.firstName}
        onChange={handleChange}
        error={errors.firstName}
      />
      <Fields
        divClassName="col-12 col-md-6"
        name="email"
        label="Email*"
        placeholder="Votre email"
        type="email" // Specifies email input type for validation
        value={contact.email}
        onChange={handleChange}
        error={errors.email}
      />
      <Fields
        divClassName="col-12 col-md-6"
        name="tel"
        label="Téléphone*"
        placeholder="Votre numéro de téléphone"
        value={contact.tel}
        onChange={handleChange}
        error={errors.tel}
      />
      <Fields
        divClassName="col-12"
        name="message"
        label="Message*"
        placeholder="Votre message"
        type="textarea" // Specifies textarea for multi-line text input
        value={contact.message}
        onChange={handleChange}
        error={errors.message}
      />
      <div className="col-12">
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            value=""
            id="agreecgu"
            required // Makes accepting conditions a required action
          />
          <label className="form-check-label" htmlFor="agreecgu">
            * En cochant cette case, j'accepte les conditions particulières
            ci-dessous**
          </label>
        </div>
      </div>
      <div className="d-flex justify-content-center justify-content-md-end">
        <button className="btn btn-success col-6 mt-3 mb-5 flex-grow-1 flex-md-grow-0">
          Envoyer
        </button>
      </div>
      <TextForDisplay page={"Contact"} />
    </form>
  );
}
