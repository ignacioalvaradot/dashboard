import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Layout from "../Layouts/Layout.js";
import Multimetrica from "./../Views/Multimetrica.js"
import Expresion from "./../Views/Expresion"
import Habla from "./../Views/Habla"

export default function AppRouter() {
    return (
<Layout>
        <Routes>
        <Route exact path="/" element={<Multimetrica/>}/>
        <Route exact path="/Expresiones" element={<Expresion/>}/>
        <Route exact path="/Habla" element={<Habla/>}/>
        </Routes>
</Layout>
    );}