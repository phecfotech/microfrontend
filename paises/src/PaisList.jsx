import React from 'react'
import { paises } from './data.js';

export default function PaisList() {
  const listPais = paises.map(pais =>
    <li key={paises.id}>
    <p>
        <b>{paises.name}</b>
        <b>{paises.population}</b>
    </p>
    </li>);
    return (
      <div>
        <ul>{listPais}</ul>
      </div>
    )
  }

