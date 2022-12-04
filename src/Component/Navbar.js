import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
    return (
        <nav className='navbar navbar-expand-lg navbar-light bg-light '>
        <div className='container '>
            <Link to="/" className="navbar-brand" >E -commmerce</Link>
            <ul className="navbar-nav ">
            <li className="nav-item ">
                    <Link to="/commande" className="nav-link" >Liste des commandes</Link>
                </li>
                <li className="nav-item">
                    <Link to="/CLient" className="nav-link" >Liste des clients</Link>
                </li>
                <li className="nav-item">
                    <Link to="/produit" className="nav-link" >Liste des produits</Link>
                </li>
            </ul>
        </div>
        </nav>
    )
}
