import React, { useState, useEffect } from 'react';
import Select from 'react-select';

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

  function handleState(e) {
    setState(e.target.value);
    fetch(
      `https://brasilapi.com.br/api/ibge/municipios/v1/${e.target.value}`,
    ).then((res) => {
      res.json().then((responseCitie) => {
        serListaCidades(responseCitie);
      });
    });
  }

  return (
    <main>
      <fieldset>
        <label>Estado </label>
        <select name="state" id="state" value={state} onChange={handleState}>
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
        <Select
          defaultValue={cities}
          onChange={(value) => {
            setCities(value.nome);
          }}
          getOptionValue={(item) => item.nome}
          getOptionLabel={(item) => item.nome}
          options={listaCidades}
        />
      </fieldset>
    </main>
  );
}

export default App;
