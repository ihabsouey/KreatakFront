import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { url } from '../config'
import { useParams ,useNavigate  } from 'react-router-dom'

export default function UpdateProduit() {
    const { id } = useParams();
    const [Libelle, setLibelle] = useState('')
    const [Prix, setPrix] = useState('')
    const [enStock, setEnStock] = useState(false)
    const [isGift, setIsGift] = useState(false)

    const [Produit, setProduit] = useState('')

    const navigate = useNavigate();
    useEffect(() => {
        axios.get(url + "/produit/" + id).then((res) => {
            setProduit(res.data)
            setLibelle(res.data.libelle)
            setPrix(res.data.prix_ttc)
            setEnStock(res.data.en_stock)
            setIsGift(res.data.is_gift)
        })
    },[] )

    const handleSubmit = (e) => {
        e.preventDefault()
        const Produit = { libelle: Libelle, prix_ttc: Prix, en_stock: enStock, is_gift: isGift }
        axios.put(url + "/produit/" + id, Produit).then(() => {
        }
        )
        alert("Produit modifié")
        navigate('/produit')

    }


    return (
<div>

        <div className='container col-12 col-md-6'>
            <h1>Modifier le produit</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="Libelle">Libelle</label>
                    <input type="text" className="form-control" name='Libelle' value={Libelle} onChange={(e) => { setLibelle(e.target.value) }} required />
                </div>
                <div className="form-group">
                    <label htmlFor="Prix">Prix</label>
                    <input type="number" className="form-control" name="Prix" value={Prix} onChange={(e) => setPrix(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label htmlFor="enStock">En Stock</label>
                    <select className="form-control" name="enStock" value={enStock} onChange={(e) => setEnStock(e.target.value)} required>
                        <option value="true">Oui</option>
                        <option value="false">Non</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="isGift">Is Gift</label>
                    <select className="form-control" name="isGift" value={isGift} onChange={(e) => setIsGift(e.target.value)} required>
                        <option value="true">Oui</option>
                        <option value="false">Non</option>
                    </select>

                </div>

                <button type="submit" className="btn btn-primary mt-2">Modifier</button>
            </form>
        </div>
</div>

    )
}
