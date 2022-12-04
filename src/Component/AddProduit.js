import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { url } from '../config'

export default function AddProduit() {
    const [Libelle, setLibelle] = useState('')
    const [Prix, setPrix] = useState('')
    const [enStock, setEnStock] = useState(false)
    const [isGift, setIsGift] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        const Produit = { libelle: Libelle, prix_ttc: Prix, en_stock: enStock, is_gift: isGift }
        axios.post(url + "/produit", Produit).then(() => {
        }
        )
        setLibelle('')
        setPrix('')
        setEnStock(false)
        setIsGift(false)
    }
    const [Produit, setProduit] = useState('')

    useEffect(() => {
        axios.get(url + "/produits").then((res) => {
            setProduit(res.data)
        })
    }, [Produit])

    const handleDelete = (id) => {

        axios.delete(url + "/produit/" + id).then(() => {
            console.log("deleted")
        })
    }
    const [produitSearch, setProduitSearch] = useState('')
    let filtredByName
    if (Produit) {
        filtredByName = Produit.filter(produit => {
            return produit.libelle.toLowerCase().indexOf(produitSearch.toLowerCase()) !== -1
        })
    }

 
    return (
        <div>

            <div className='container'>
                <div className='row mt-4 justify-content-between'>
                    <div className='col-12  col-sm-4 col-md-3'>
                        <h1 className='text-primary'>Ajouter un produit</h1>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="Libelle">Libelle</label>
                                <input type="text" className="form-control" name='Libelle' value={Libelle} onChange={(e) => { setLibelle(e.target.value) }} required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="Prix">Prix</label>
                                <input type="number" min="0" className="form-control" name="Prix" value={Prix} onChange={(e) => setPrix(e.target.value)} required />
                            </div>

                            <div className="row">
                                <div className="form-group col-6">
                                    <label htmlFor="enStock">En Stock</label>
                                    <select className="form-control" name="enStock" value={enStock} onChange={(e) => setEnStock(e.target.value)} required>
                                        <option value="true">Oui</option>
                                        <option value="false">Non</option>
                                    </select>
                                </div>
                                <div className="form-group col-6">
                                    <label htmlFor="isGift">Is Gift</label>
                                    <select className="form-control" name="isGift" value={isGift} onChange={(e) => setIsGift(e.target.value)} required>
                                        <option value="true">Oui</option>
                                        <option value="false">Non</option>
                                    </select>
                                </div>
                            </div>
                            <button type="submit" className="btn btn-primary mt-2">Ajouter</button>
                        </form>
                    </div>

                    <div className='col-12 col-sm-8'>
                        <div className="container">
                            <div className="row align-items-center justify-content-between">
                                <h1 className='text-primary col-12 col-sm-6 '>Liste des produits</h1>
                                <div className="col-12 col-sm-4">
                                    <input type="text" className="form-control" placeholder="Chercher un produit" name="produitSearch" value={produitSearch} onChange={(e) => setProduitSearch(e.target.value)} />
                                </div>
                            </div>

                            {filtredByName ?
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">Libelle</th>
                                            <th scope="col">Prix</th>
                                            <th scope="col">En Stock</th>
                                            <th scope="col">Is Gift</th>
                                            <th scope="col">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filtredByName.map((filtredByName) => (
                                            <tr key={filtredByName._id}>
                                                <td>{filtredByName.libelle}</td>
                                                <td>{filtredByName.prix_ttc}</td>
                                                <td>{filtredByName.en_stock ? <i className='bi bi-check-lg text-success fs-4 '> </i> : <i className='bi bi-x-lg text-danger fs-4' > </i>}</td>
                                                <td>{filtredByName.is_gift ? <i className='bi bi-check-lg text-success fs-4'> </i> : <i className='bi bi-x-lg text-danger fs-4'> </i>}</td>
                                                <td>
                                                    <button className="btn btn-danger" onClick={() => handleDelete(filtredByName._id)} ><i className='bi bi-trash '> </i></button>
                                                    <Link to={"/produit/update/" + filtredByName._id} > <button className="btn btn-warning" ><i className='bi bi-pen '> </i></button> </Link>
                                                </td>

                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                : <h1>Chargement ...</h1>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
