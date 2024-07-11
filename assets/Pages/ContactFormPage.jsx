import React, { useState } from "react";
import Fields from "../Components/forms/Fields";
import { useNavigate } from "react-router-dom";
import contactsAPI from "../Services/contactsAPI";
import { toast } from "react-toastify";
import Title from "../Components/Title";
import TextForDisplay from "../Components/TextForDisplay";

export default function ContactFormPage() {
  const [contact, setContact] = useState({
    lastName: "",
    firstName: "",
    email: "",
    tel: "",
    message: "",
  });

  const [errors, setErrors] = useState({
    lastName: "",
    firstName: "",
    email: "",
    tel: "",
    message: "",
  });

  const navigate = useNavigate();

  const handleChange = ({ currentTarget }) => {
    const { name, value } = currentTarget;
    setContact({ ...contact, [name]: value });
    console.log(contact);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await contactsAPI.postContactMessage(contact);
      toast.success("Votre message a bien été envoyé");
      navigate("/", { replace: true });
      setErrors({});
    } catch (error) {
      console.error("An unexpected error occurred:", error);
      const { violations } = error.response.data;
      if (violations) {
        const apiErrors = {};
        violations.forEach(({ propertyPath, message }) => {
          apiErrors[propertyPath] = message;
        });
        setErrors(apiErrors);
        toast.error("Des erreurs dans votre formulaire");
      }
    }
  };

  return (
    <form
      className="container d-flex justify-content-center align-items-center row m-auto"
      onSubmit={handleSubmit}
    >
      <Title text={"Laissez Nous Un Message"} />
      <Fields
        divClassName="col-12 col-md-6"
        name="lastName"
        label="Nom de famille*"
        placeholder="Votre nom de famille"
        value={contact.lastName}
        onChange={handleChange}
        error={errors.lastName}
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
        type="email"
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
        type="textarea"
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
            required
          />
          <label className="form-check-label" htmlFor="agreecgu">
            * En cochant cette case, j'accepte les conditions particulières
            ci-dessous**
          </label>
        </div>
      </div>
      <div className="d-flex justify-content-center justify-content-md-end">
        <button className="btn btn-success col-6 mt-3 mb-5 flex-grow-1 flex-md-grow-0">Envoyer</button>
      </div>
      <TextForDisplay page={"Contact"} />
    </form>
  );
}
