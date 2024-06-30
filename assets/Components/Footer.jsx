import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Footer() {
    return (
          <footer className="h-md-162 bg-primary mt-auto" id="footer">
        <div className="container">
        <div className="row py-4">
          <h3 className="col text-center fw-bold fs-3">
            <NavLink className="text-decoration-none text-white" to="/CGU">CGU</NavLink>
          </h3>
          <h3 className="col text-center fw-bold fs-3">
            <NavLink className="text-decoration-none text-white" to="/CGV">CGV</NavLink>
          </h3>
          <h3 className="col text-center fw-bold fs-3">
            <NavLink className="text-decoration-none text-white" to="/Legal">Mentions légales</NavLink>
          </h3>
        </div>

        <p className="text-center fs-6 mb-0" style={{color: "white"}}>
          Canopées Espaces Verts <br />
          42 Avenue des Canopées 75015 Paris, France <br />
          Téléphone : +33 1 23 45 67 89
        </p>
      </div>
    </footer>
  )
}