import React, { useState, useEffect } from 'react';

import './App.css';
function App() {
  const [listaEstados, setListaEstados] = useState([]);
  const [listaCidades, serListaCidades] = useState([]);
  const [state, setState] = useState('');
  const [cities, setCities] = useState('');

  useEffect(() => {
    fetch('https://brasilapi.com.br/api/ibge/uf/v1').then((res) => {
      res.json().then((responseData) => {
        setListaEstados(responseData);
      });
    });
  }, []);

  useEffect(() => {
    if (state) {
      fetch(`https://brasilapi.com.br/api/ibge/municipios/v1/${state}`).then(
        (res) => {
          res.json().then((responseCitie) => {
            serListaCidades(responseCitie);
          });
        },
      );
    }
  }, [state]);

  return (
    <main>
      <fieldset>
        <label>Estado </label>
        <select
          name="state"
          id="state"
          value={state}
          onChange={(e) => setState(e.target.value)}
        >
          <option value="default">-SELECIONE-</option>
          {listaEstados.map((list, index) => {
            return (
              <option key={index} value={list.sigla}>
                {list.sigla}
              </option>
            );
          })}
        </select>

        <label>Cidade </label>
        <select
          name="city"
          id="cities"
          value={cities}
          onChange={(e) => setCities(e.target.value)}
        >
          <option value="default">-SELECIONE-</option>
          {listaCidades.map((list, index) => {
            return (
              <option key={index} value={list.nome}>
                {list.nome}
              </option>
            );
          })}
        </select>
      </fieldset>
    </main>
  );
}

export default App;
