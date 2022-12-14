import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { url } from '../config'
import { useNavigate } from 'react-router-dom';


export default function AddCommande() {

    const navigate = useNavigate();



    const [checkedProduit, setCheckedProduit] = useState([])

    const handleChange = (e) => {
        var updatedList = [...checkedProduit];
        if (e.target.checked) {
            updatedList.push(e.target.value);
        } else {
            updatedList.splice(updatedList.indexOf(e.target.value), 1);
        }
        setCheckedProduit(updatedList);
    }

    const [ClientID, setClientID] = useState('')
    const [nbGifts, setNbGifts] = useState('')
    const [nbGiftsSelected, setNbGiftsSelected] = useState(0)

    const [Clients, setClients] = useState([])
    const [Produits, setProduits] = useState([])

    if (ClientID)
        axios.get(url + "/client/" + ClientID).then((res) => {
            setNbGifts(res.data.nbr_gifts)

        })

    useEffect(() => {
        axios.get(url + "/clients").then((res) => {
            setClients(res.data)
        })
    }, [])
    useEffect(() => {
        axios.get(url + "/produits").then((res) => {
            setProduits(res.data)
        })
    }, [])


    const handleSubmit = (e) => {
        e.preventDefault();

        let newProduits = []
        let Commande
        checkedProduit.map((id) => {
            const produitID = Produits.find(p => p._id === id)._id
            const libelle = Produits.find(p => p._id === id).libelle
            const prix_ttc = Produits.find(p => p._id === id).prix_ttc
            const is_gift = Produits.find(p => p._id === id).is_gift
            let prix_remise = 0
            let soldeGift = nbGiftsSelected * 100
            if (is_gift && nbGifts > 0 && prix_ttc < soldeGift) {
                prix_remise = prix_ttc * 0.3
                soldeGift -= prix_ttc
            } else if (is_gift && nbGifts > 0 && prix_ttc > soldeGift) {
                prix_remise = soldeGift * 0.3 + (prix_ttc - soldeGift) * (Clients.find(c => c._id === ClientID).remise_defaut) / 100
                soldeGift = 0
            } else {

                prix_remise = prix_ttc
            }
            prix_remise = prix_remise.toFixed(2)
            newProduits.push({ produitID, libelle, prix_ttc, prix_remise })

            if (soldeGift === 0) {
                axios.put(url + "/client/" + ClientID, { nbr_gifts: nbGifts - nbGiftsSelected })
                setNbGifts(nbGifts - nbGiftsSelected)

            } else {
                const newNbGifts = nbGifts - nbGiftsSelected + Math.floor(soldeGift / 100)
                setNbGifts(newNbGifts)
                axios.put(url + "/client/" + ClientID, { nbr_gifts: newNbGifts })
            }
        })

        Commande = { client: ClientID, produits: newProduits }

        axios.post(url + "/commande", Commande).then(() => {
            console.log("added")
        })

        alert("Commande ajout??e avec succ??s")
        navigate('/commande')


        
    }

    return (
        <div className='container col-12 col-md-6 mt-3 '>
            <form onSubmit={handleSubmit} >
                <div className="form-group">
                    <label htmlFor="Client"><h3 className='text-primary'>1) Choisir le client</h3></label>
                    <select className="form-control" name="Client" id="Client" value={ClientID} onChange={(e) => { setClientID(e.target.value) }} required>
                        <option value="">Choisir le client</option>
                        {Clients.map((client) => {
                            return (
                                <option key={client._id} value={client._id}>{client.nom_complet}</option>
                            )
                        })}
                    </select>
                </div>
                <div className="form-group mt-2">
                    <label htmlFor="Produit"><h3 className='text-primary'>2) Choisir les produits</h3></label>

                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">Libelle</th>
                                <th scope="col">Prix</th>
                                <th scope="col">En Stock</th>
                                <th scope="col">Is Gift</th>
                                <th scope="col">Choisir</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Produits.map((produit) => {
                                return (
                                    <tr key={produit._id}>
                                        <td>{produit.libelle}</td>
                                        <td>{produit.prix_ttc}</td>
                                        <td>{produit.en_stock ? <i className='bi bi-check-lg text-success fs-4 '> </i> : <i className='bi bi-x-lg text-danger fs-4' > </i>}</td>
                                        <td>{produit.is_gift ? <i className='bi bi-check-lg text-success fs-4 '> </i> : <i className='bi bi-x-lg text-danger fs-4' > </i>}</td>
                                        <td>
                                            {produit.en_stock ?
                                                <input type="checkbox" name="Produit" value={produit._id} onChange={handleChange} />
                                                :
                                                <input type="checkbox" name="Produit" value={produit._id} onChange={handleChange} disabled />

                                            }
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>

                </div>
                <div className="form-group mt-2">
                    <label htmlFor="nbGifts"><h4 className='text-primary'>3) Choisir le nombre de gifts ?? utiliser</h4></label>
                    <select className="form-control" name="nbGifts" id="nbGifts" value={nbGiftsSelected} onChange={(e) => setNbGiftsSelected(e.target.value)} required>
                        {[...Array(nbGifts + 1)?.keys()].map((i) => {
                            return (
                                <option key={i} value={i}>{i}</option>
                            )
                        })}
                    </select>


                </div>


                <div className="form-group mt-2">
                    <button type="submit" className="btn btn-primary">Ajouter</button>
                </div>
            </form>
        </div>



    )
}
