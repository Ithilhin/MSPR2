import axios from 'axios'
import React, { useEffect, useState } from 'react'

export default function Prices() {
        const [prices, setPrices] = useState([]);

        useEffect(() => {
                axios.get('http://localhost:8000/api/pricess')
                .then(response => response.data["hydra:member"])
                .then(data => setPrices(data))
                .catch(error => console.log(error.response))
        },[])
    return (
        <div className="container d-flex justify-content-center align-items-center row m-auto">
                <img className="col-12 col-md-8 col-xl-6 mt-3" src="./image/logo-canopees.png" alt="logo Canopées" />
                <h2 className="text-center mt-4 mb-0 fw-bold">Nos Tarifs</h2>
                <div className="container my-5">
        ²            <table className="table table-hover">
                        <thead>
                                <tr>
                                        <th>Opérations</th>
                                        <th className="text-center">Prix minimum/h</th>
                                        <th className="text-center">Prix moyen/h</th>
                                        <th className="text-center">Prix maximum/h</th>
                                </tr>
                        </thead>
                        <tbody>
                                {prices.map(price =>   
                                        <tr key={price.id}>
                                        <td>{price.prestation.title}</td>
                                        <td className="text-center">{price.minPrice.toFixed(2).toLocaleString()} €</td>
                                        <td className="text-center">{price.meanPrice.toFixed(2).toLocaleString()} €</td>
                                        <td className="text-center">{price.maxPrice.toFixed(2).toLocaleString()} €</td>
                                </tr>
                                )}    
                        </tbody>
                </table>
                </div>
                
        </div>
    )
}
