import React, { useState } from "react";
import Fields from "../Components/forms/Fields";
import { useNavigate } from "react-router-dom";
import contactsAPI from "../Services/contactsAPI";
import { toast } from "react-toastify";
import axios from "axios";
import Title from "../Components/Title";

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
        violations.map(({propertyPath, message}) => {
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
      <Title />
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
      <div className="d-flex justify-content-end">
        <button className="btn btn-success col-6 mt-3">Envoyer</button>
      </div>
      <p className="col-12 fs-6">
        * Champs obligatoires <br />
        ** Les données personnelles communiquées sont nécessaires aux fins de
        vous contacter. Elles sont destinées à Acrocimes élagage et ses
        sous-traitants. Vous disposez de droits d’accès, de rectification,
        d’effacement, de portabilité, de limitation, d’opposition, de retrait de
        votre consentement à tout moment et du droit d’introduire une
        réclamation auprès d’une autorité de contrôle, ainsi que d’organiser le
        sort de vos données post-mortem. Vous pouvez exercer ces droits par voie
        postale à l'adresse 24 Rue Anatole France, 66670 Bages, France, ou par
        courrier électronique à l'adresse contact@acrocimes-elagage.fr. Un
        justificatif d'identité pourra vous être demandé. Nous conservons vos
        données pendant la période de prise de contact puis pendant la durée de
        prescription légale aux fins probatoires et de gestion des contentieux.
      </p>
    </form>
  );
}
