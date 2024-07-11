import React, { useEffect, useState } from "react";
import pricesAPI from "../Services/pricesAPI";
import TableLoader from "../Components/loaders/TableLoader";
import Title from "../Components/Title";
import TextForDisplay from "../Components/TextForDisplay";

export default function Prices() {
  const [prices, setPrices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    pricesAPI
      .getPrices()
      .then((data) => {
        setPrices(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error.response);
        setLoading(false);
      });
  }, []);

  return (
    <div className="container d-flex justify-content-center align-items-center row m-auto">
      <Title text={"Nos Tarifs"} />
      <div className="container my-5 table-responsive">
        <table className="table table-hover">
          <thead>
            <tr className="">
              <th>Opérations</th>
              <th className="text-center">Prix minimum/h</th>
              <th className="text-center">Prix moyen/h</th>
              <th className="text-center">Prix maximum/h</th>
            </tr>
          </thead>
          {!loading && (
            <tbody>
              {prices.map((price, index) => (
                <tr className="" key={index}>
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
          )}
          {loading && <TableLoader />}
        </table>
      </div>
      <TextForDisplay page={"Tarifs"} />
    </div>
  );
}
