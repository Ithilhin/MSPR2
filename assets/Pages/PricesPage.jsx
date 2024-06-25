import axios from "axios";
import React, { useEffect, useState } from "react";
import getPrices from "../Services/pricesAPI";

export default function Prices() {
  const [prices, setPrices] = useState([]);

  useEffect(() => {
    getPrices()
    .then((data) => setPrices(data))
    // TODO notification flash success
    .catch((error) => console.log(error.response));
    // TODO notification flash error
  }, []);

  return (
    <div className="container d-flex justify-content-center align-items-center row m-auto">
      <img
        className="col-12 col-md-8 col-xl-6 mt-3"
        src="./image/logo-canopees.png"
        alt="logo Canopées"
      />
      <h2 className="text-center mt-4 mb-0 fw-bold">Nos Tarifs</h2>
      <div className="container my-5">
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Opérations</th>
              <th className="text-center">Prix minimum/h</th>
              <th className="text-center">Prix moyen/h</th>
              <th className="text-center">Prix maximum/h</th>
            </tr>
          </thead>
          <tbody>
            {prices.map((price, index) => (
              <tr key={index}>
                <td>{price.prestation.title}</td>
                <td className="text-center">
                  {price.minPrice.toFixed(2).toLocaleString()} €
                </td>
                <td className="text-center">
                  {price.meanPrice.toFixed(2).toLocaleString()} €
                </td>
                <td className="text-center">
                  {price.maxPrice.toFixed(2).toLocaleString()} €
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
