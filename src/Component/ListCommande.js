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

    const [clientSearch, setClientSearch] = useState('')
    let filtredByName
    if (clients && Commande) {
        filtredByName = Commande.filter(commande => {
            return clients.find(client => client._id === commande.client)?.nom_complet.toLowerCase().includes(clientSearch.toLowerCase())
            // return  clients?.find(c => c._id === commande.client)?.nom_complete.toLowerCase().includes(clientSearch.toLowerCase())
            // return client.client.toLowerCase().indexOf(clientSearch.toLowerCase()) !== -1
        })
    }


    return (
        <div className='container '>
            <div className='row justify-content-around mt-3'>
                <Link to="/commande/add" className='btn btn-primary col-2 fs-10' >Ajouter une commande</Link>
                <div className="row col-9 align-items-center justify-content-between">
                    <h1 className='text-primary col-12 col-sm-6 '>Liste des commandes</h1>
                    <div className="col-12 col-sm-4">
                        <input type="text" className="form-control" placeholder="Chercher un Client" value={clientSearch} onChange={(e) => setClientSearch(e.target.value)} />
                    </div>
                </div>
            </div>
            <table className="table col-9" >
                <thead>
                    <tr>
                        <th scope="col">Nom </th>
                        <th scope="col">Produit</th>
                        <th scope="col">Prix</th>
                        <th scope="col">Prix aprés remise</th>
                        <th scope="col">Action</th>

                    </tr>
                </thead>
                <tbody>
                    {filtredByName ?
                        filtredByName.map((commande) => {
                            return (
                                <tr key={commande._id}>
                                    <td>{clients?.find(c => c._id === commande.client)?.nom_complet}</td>
                                    <td>
                                        {commande.produits.map((p) => (
                                            <div key={p[0].produitID}>{p[0].libelle}</div>
                                        ))}
                                    </td>
                                    <td> {commande.produits.map((p) => (
                                        <div key={p[0].produitID}>{p[0].prix_ttc} TND</div>
                                    ))}</td>
                                    <td> {commande.produits.map((p) => (
                                        <div key={p[0].produitID}>{p[0].prix_remise} TND</div>
                                    ))}</td>
                                    <td>
                                        <button className='btn btn-danger ' onClick={() => handleDelete(commande._id)}><i className='bi bi-trash '> </i></button>
                                        <Link to={`/commande/update/${commande._id}`} > <button className="btn btn-warning" ><i className='bi bi-pen '> </i></button> </Link>
                                    </td>
                                </tr>
                            )
                        })
                        :<tr>

                         <td>Chargement ...</td>
                        </tr>
                    }
                </tbody>
            </table>
        </div>

    )
}
