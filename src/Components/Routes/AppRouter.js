import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Layout from "../Layouts/Layout.js";
import Multimetrica from "./../Views/Multimetrica.js"

export default function AppRouter() {
    return (
<Layout>
        <Routes>
        <Route exact path="/" element={<Multimetrica/>}/>
        </Routes>
</Layout>
    );}