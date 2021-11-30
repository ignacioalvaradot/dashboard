import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Layout from "../Layouts/Layout.js";
import Multimetrica from "./../Views/Multimetrica.js"
import Expresion from "./../Views/Expresion"

export default function AppRouter() {
    return (
<Layout>
        <Routes>
        <Route exact path="/" element={<Multimetrica/>}/>
        <Route exact path="/Expresiones" element={<Expresion/>}/>
        </Routes>
</Layout>
    );}