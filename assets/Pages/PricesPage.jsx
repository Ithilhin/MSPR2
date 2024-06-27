import React, { useEffect, useState } from "react";
import pricesAPI from "../Services/pricesAPI";
import TableLoader from "../Components/loaders/TableLoader";
import Title from "../Components/Title";

export default function Prices() {
  const [prices, setPrices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    pricesAPI.getPrices()
      .then((data) => setPrices(data))
      .catch((error) => console.log(error.response)); 
    setLoading(false);
  }, []);

  return (
    <div className="container d-flex justify-content-center align-items-center row m-auto">
      <Title />
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
          {!loading && <tbody>
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
          </tbody>}
        </table>
        {loading && <TableLoader />}
      </div>
    </div>
  );
}
