import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AddClient from './Component/AddClient';
import AddProduit from './Component/AddProduit';
import UpdateClient from './Component/UpdateClient';
import UpdateProduit from './Component/UpdateProduit';
import Home from './Component/Home';
import Navbar from './Component/Navbar';
import ListCommande from './Component/ListCommande';
import AddCommande from './Component/AddCommande';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/produit" element={<AddProduit />} />
          <Route path="/client" element={<AddClient />} />
          <Route path="/client/update/:id" element={<UpdateClient />} />
          <Route path="/produit/update/:id" element={<UpdateProduit />} />
          <Route path="/commande" element={<ListCommande />} />
          <Route path='/commande/add' element={<AddCommande />} />
          <Route path="*" element={<h1>404 Not Found</h1>} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
