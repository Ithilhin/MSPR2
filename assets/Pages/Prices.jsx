import React from 'react'

export default function Prices() {
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
                                <tr>
                                        <td>Conception/realisation</td>
                                        <td className="text-center">12.25€/h</td>
                                        <td className="text-center">25.25€/h</td>
                                        <td className="text-center">37.25€/h</td>
                                </tr>
                        </tbody>
                </table>
                </div>
                
        </div>
    )
}
