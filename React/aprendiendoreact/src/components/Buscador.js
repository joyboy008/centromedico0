import React, { Component } from "react";

function Buscador({ placeholder, value, onSearchChange }) {
  return (
    <div className="">
      <div className="d-flex justify-content-start">
        <div className="col-md-12 col-sm-12 d-flex align-items-center p-2">
          <input
            type="text"
            className="form-control h-100 m-0"
            placeholder={placeholder}
            onChange={onSearchChange}
            value={value}
          />
          <button className="btn btn-success p-3 m-0 ms-1">Buscar</button>
        </div>
      </div>
    </div>
  );
}

export default Buscador;
