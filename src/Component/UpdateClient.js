import axios from 'axios'
import React, { useEffect ,useState } from 'react'
import { useParams } from 'react-router-dom'
import { url } from '../config'

export default function UpdateClient() {
    const {id} = useParams();
    const [Client, setClient] = useState('')
    const [nomComplet, setNomComplet] = useState("")
    const [nbrGifts, setNbrGifts] = useState(0)
    const [remiseDefaut, setRemiseDefaut] = useState(0)

    useEffect(() => {
        axios.get(url + "/client/"+id).then((res) => {
            setClient(res.data)
            setNomComplet(res.data.nom_complet)
            setNbrGifts(res.data.nbr_gifts)
            setRemiseDefaut(res.data.remise_defaut)

        })
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        const Client = { nom_complet: nomComplet, nbr_gifts: nbrGifts, remise_defaut: remiseDefaut }
        axios.put(url + "/client/"+id, Client).then(() => {
        }
        )
    }
    


  return (
<div>

    <div className='container col-12 col-md-6 '>
        <h1>Update Client</h1> 
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="nomComplet">Nom et prénom</label>
                <input type="text" className="form-control" value={nomComplet} onChange={(e)=>{setNomComplet(e.target.value)}} name='nomComplet' required />
            </div>
            <div>
                <label htmlFor="nbrGifts">Nombres des gifts</label>
                <input type="number" className="form-control" value={nbrGifts} onChange={(e)=>{setNbrGifts(e.target.value)}} name="nbrGifts" required />
            </div>
            <div>
                <label htmlFor="remiseDefaut">Remise par default</label>
                <input type="number" className="form-control" value={remiseDefaut} onChange={(e)=>{setRemiseDefaut(e.target.value)}} name="remiseDefaut" required />
            </div>
            <button type="submit" className="btn btn-primary">Modifier</button>
        </form>
    </div>
</div>


  )
}
