import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { url } from '../config'

export default function ListCommande() {
    const [Commande, setCommande] = useState('')
    useEffect(() => {
        axios.get(url + "/commandes").then((res) => {
            setCommande(res.data)
        })
    }, [])
    const [clients, setClients] = useState([])
    useEffect(() => {
        axios.get(url + "/clients").then((res) => {
            setClients(res.data)
        })
    }, [])



    const handleDelete = (id) => {
        axios.delete(url + "/commande/" + id).then((res) => {
            setCommande(Commande.filter((c) => c._id !== id))

        })
    }



    return (
        <div className='container '>
            <div className='row justify-content-between mt-3'>
                <h1 className='col-10'>Liste des commandes</h1>
                <Link to="/commande/add" className='btn btn-primary col-2' >Ajouter une commande</Link>
            </div>
            <table className="table col-9" >
                <thead>
                    <tr>
                        <th scope="col">Nom et prénom</th>
                        <th scope="col">Produit</th>
                        <th scope="col">Prix</th>
                        <th scope="col">Remise</th>
                        <th scope="col">Action</th>

                    </tr>
                </thead>
                <tbody>
                    {Commande  ?
                        
                        Commande.map((commande) => {
                            return (
                                <tr key={commande._id}>
                                    <td>{clients?.find(c => c._id === commande.client)?.nom_complet}</td>
                                    <td>
                                        {commande.produits.map((p) => (
                                            <div key={p._id}>{p[0].libelle}</div>
                                        ))}
                                    </td>
                                    <td> {commande.produits.map((p) => (
                                            <div key={p._id}>{p[0].prix_ttc}</div>
                                        ))}</td>
                                    <td> {commande.produits.map((p) => (
                                            <div key={p._id}>{p[0].prix_remise}</div>
                                        ))}</td>
                                    <td>
                                        <Link to={`/commande/edit/${commande.id}`} className='btn btn-primary'>Modifier</Link>
                                        <button className='btn btn-danger ml-2' onClick={() => handleDelete(commande._id)}>Supprimer</button>
                                    </td>
                                </tr>
                            )
                        })
                        : <h2>Chargement ...</h2>}
                </tbody>
            </table>



        </div>

    )
}
