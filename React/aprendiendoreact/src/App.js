import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./assets/css/App.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";

//                                  npm start
// npm install --save react-router-dom ---> este comando es para instalar los routers
// Importar Router
import Router from "./Router";

function App() {
  return (
    <div className="App">
      <Router />
      {/* <Peliculas /> */}
    </div>
  );
}

export default App;
