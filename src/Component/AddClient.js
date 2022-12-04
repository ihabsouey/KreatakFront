import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { url } from '../config'

export default function AddClient() {

    const [nomComplet, setNomComplet] = useState('')
    const [nbrGifts, setNbrGifts] = useState(0)
    const [remiseDefaut, setRemiseDefaut] = useState(0)
    const [Client, setClient] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        const Client = { nom_complet: nomComplet, nbr_gifts: nbrGifts, remise_defaut: remiseDefaut }
        axios.post(url + "/client", Client).then(() => {
        }
        )
    }

    useEffect(() => {
        axios.get(url + "/clients").then((res) => {
            setClient(res.data)
        })
    }, [Client])


    const handleDelete = (id) => {
        axios.delete(url + "/client/" + id).then(() => {
            console.log("deleted")
        })
    }
    const [clientSearch, setClientSearch] = useState('')
    let filtredByName
    if (Client) {
        filtredByName = Client.filter(client => {
            return client.nom_complet.toLowerCase().indexOf(clientSearch.toLowerCase()) !== -1
        })
    }


    return (
        <div>
            <div className='container'>
                <div className='row mt-4 justify-content-between'>
                    <div className="col-12 col-sm-4 col-md-3" >
                        <h1 className='text-primary'>Liste des clients</h1>



                        <form onSubmit={handleSubmit} >
                            <div className="form-group">
                                <label htmlFor="nomComplet">Nom et prénom</label>
                                <input type="text" className="form-control" name='nomComplet' value={nomComplet} onChange={(e) => { setNomComplet(e.target.value) }} required />
                            </div>
                            <div className="form-group ">
                                <label htmlFor="nbrGifts">Nombres des gifts</label>
                                <input type="number" min="0" className="form-control " name="nbrGifts" value={nbrGifts} onChange={(e) => setNbrGifts(e.target.value)} required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="remiseDefaut">Remise par default</label>
                                <input type="number" min="0" max="100" className="form-control" name="remiseDefaut" value={remiseDefaut} onChange={(e) => setRemiseDefaut(e.target.value)} required />
                            </div>
                            <button type="submit" className="btn btn-primary mt-2">Ajouter</button>
                        </form>
                    </div>

                    <div className='col-12 col-sm-8 '>
                        <div className="row align-items-center justify-content-between">
                            <h1 className='text-primary col-12 col-sm-6 '>Liste des clients</h1>
                            <div className="col-12 col-sm-4">
                                <input type="text" className="form-control" placeholder="Chercher un client" name="produitSearch" value={clientSearch} onChange={(e) => setClientSearch(e.target.value)} />
                            </div>
                        </div>
                        {filtredByName ?
                            <table className="table col-9" >
                                <thead>
                                    <tr>
                                        <th scope="col">Nom et prénom</th>
                                        <th scope="col">Nombres des gifts</th>
                                        <th scope="col">Remise par default</th>
                                        <th scope="col">Action</th>

                                    </tr>
                                </thead>
                                <tbody>

                                    {filtredByName.map((Client) => (
                                        <tr key={Client._id}>
                                            <td>{Client.nom_complet} </td>
                                            <td>{Client.nbr_gifts}</td>
                                            <td>{Client.remise_defaut} %</td>
                                            <td>
                                                <button className="btn btn-danger" onClick={() => handleDelete(Client._id)}><i className='bi bi-trash '> </i></button>
                                                <Link to={"/client/update/" + Client._id}> <button className="btn btn-warning" ><i className='bi bi-pen '> </i></button></Link>
                                            </td>

                                        </tr>
                                    ))
                                    }

                                </tbody>
                            </table>
                            : <h1>Chargement...</h1>

                        }

                    </div>
                </div>
            </div>
        </div>
    )
}
