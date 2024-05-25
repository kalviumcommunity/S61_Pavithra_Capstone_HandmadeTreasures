import React from 'react';
import './App.css'
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {Routes, Route } from 'react-router-dom';
import Crafts from './Components/Crafts';
import Navbar from './Components/Navbar';
import Home from './Components/ImageSlider';
import Candles from './Components/Crafts/Candles';
import Soap from './Components/Crafts/Soap';
import PaperCrafts from './Components/Crafts/PaperCrafts';
import WoodenItems from './Components/Crafts/WoodenItems';
import Weaving from './Components/Crafts/Weaving';
import Necklace from './Components/Jewellery/Necklace';
import Earring from './Components/Jewellery/Earring';
import Bangles from './Components/Jewellery/Bangles';
import Bracelet from './Components/Jewellery/Bracelet';
import JewellerySet from './Components/Jewellery/JewellerySet';
import Mug from './Components/Pottery/Mug';
import Bowl from './Components/Pottery/Bowl';
import Planter from './Components/Pottery/Planter';
import Vase from './Components/Pottery/Vase';
import CanvasPainting from './Components/Painting/CanvasPainting';
import PaperPainting from './Components/Painting/PaperPainting';
import OilPainting from './Components/Painting/OilPainting';
import WatercolorPainting from './Components/Painting/WatercolorPainting';
import Footer from './Components/Footer/footer';
import Login from './Components/Login/Login';


function App() {
  return (
    <>
      <Navbar />
      <Home/>
      <Routes>
      <Route/>
        <Route path="/Crafts" element={<Crafts />} />
        <Route path="/crafts/candles" element={<Candles/>} />
        <Route path="/crafts/soap" element={<Soap/>} />
        <Route path="/crafts/papercrafts" element={<PaperCrafts/>} />
        <Route path="/crafts/woodenitems" element={<WoodenItems/>} />
        <Route path="/crafts/weaving" element={<Weaving/>} />
        <Route path="/jewellery/necklace" element={<Necklace />} />
        <Route path="/jewellery/earring" element={<Earring />} />
        <Route path="/jewellery/bangles" element={<Bangles />} />
        <Route path="/jewellery/bracelet" element={<Bracelet />} />
        <Route path="/jewellery/jewelleryset" element={<JewellerySet />} /> 
        <Route path="/pottery/mug" element={<Mug />} />
        <Route path="/pottery/bowl" element={<Bowl />} />
        <Route path="/pottery/planter" element={<Planter />} />
        <Route path="/pottery/vase" element={<Vase />} />
        <Route path="/painting/canvaspainting" element={<CanvasPainting />} />
        <Route path="/painting/paperpainting" element={<PaperPainting />} />
        <Route path="/painting/oilpainting" element={<OilPainting />} />
        <Route path="/painting/watercolorpainting" element={<WatercolorPainting />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App;
