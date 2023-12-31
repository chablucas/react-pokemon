import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Pv from'./Pv.js';
import Pv2 from'./Pv2.js';
import "./Pokemon.css";




function Poke() {
  const [apiData, setApiData] = useState(null);
  const [poke, setPoke] = useState([]);
  const [poke2, setPoke2] = useState([]);
  const [index, setIndex] = useState(0);
  const [index2, setIndex2] = useState(0);
  const [message, setMessage] = useState("");


  const Change = (index) => {
    setIndex(index);
  };

  const Change2 = (index2) => {
    setIndex2(index2);
  };
  
  const Attaque = () => {
    setPoke2((prevPoke2) => [
      ...prevPoke2.slice(0, index2),
      { ...prevPoke2[index2], currentHp: prevPoke2[index2].currentHp - (((prevPoke2[index2]["Attack"] / 10) + 10)-(prevPoke2[index]["Defense"] / 10)) },
      ...prevPoke2.slice(index2 + 1),

    ]);
  };

  const SpeAtt = () => {
    setPoke2((prevPoke2) => [
      ...prevPoke2.slice(0, index2),
      { ...prevPoke2[index2], currentHp: prevPoke2[index2].currentHp - (((prevPoke2[index2]["Special Attack"] / 4)+10)-(prevPoke2[index]["Defense"] / 10)) },
      ...prevPoke2.slice(index2 + 1),

    ]);
  };

  const Attaque2 = () => {
    setPoke((prevPoke) => [
      ...prevPoke.slice(0, index),
      { ...prevPoke[index], currentHp: prevPoke[index].currentHp - (((prevPoke[index]["Attack"] / 10) + 10)-(prevPoke[index2]["Defense"] / 10)) },
      ...prevPoke.slice(index + 1),
    ]);
  };

  const SpeAtt2 = () => {
    setPoke((prevPoke) => [
      ...prevPoke.slice(0, index),
      { ...prevPoke[index], currentHp: prevPoke[index].currentHp - (((prevPoke[index]["Special Attack"] / 4)+10)-(prevPoke[index2]["Defense"] / 10)) },
      ...prevPoke.slice(index + 1),
    ]);
  };

  const PokeUp = () => {
    if (apiData) {
        if (poke.length < 6)
            setPoke((prevPoke) => [...prevPoke, apiData]);
      }  
    };

    const PokeUp2 = () => {
        if (apiData) {
            if (poke2.length < 6)
                setPoke2((prevPoke2) => [...prevPoke2, apiData]);
          }  
        };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/random');
        const pokemonData = response.data
        pokemonData.currentHp = pokemonData["HP"];
        setApiData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [poke][poke2]);

  useEffect(() => {
    setPoke((prevPoke) => prevPoke.filter((p) => p.currentHp > 0));
    setPoke2((prevPoke2) => prevPoke2.filter((p) => p.currentHp > 0));
  }, [poke, poke2]);

  useEffect(() => {
    setPoke((prevPoke) => prevPoke.filter((p) => p.currentHp > 0));
    setPoke2((prevPoke2) => prevPoke2.filter((p) => p.currentHp > 0));

    if (poke.length === 0) {
      setMessage("L'équipe adverse a gagné !");
    } else if (poke2.length === 0) {
      setMessage("Votre équipe a gagné !");
    } else {
      setMessage("");
    }
  }, [poke, poke2]);

  return (
    <div className="combat">
      <div className="vs">
        <h1>{message}</h1>
      </div>
      <div className="team">
          {console.log(poke)}
        <h1>Mon équipe de pokemons</h1>
        {poke.map((poke, index) => (
          <p key={index} ><button key={poke.index} onClick={() => Change(index)}><strong>{poke[" Name"]}</strong></button><br/>HP {poke["currentHp"]} - Att {poke["Attack"]} - Def {poke["Defense"]}</p>
          ))}
        <button onClick={PokeUp}>Ajouter un Pokémon</button>
        {poke.length > 0 && (
          <>
          <p><strong>{poke[index][" Name"]}</strong>- currentHP {poke[index]["currentHp"]} / HP {poke[index]["HP"]}</p>
          <Pv currentHp={poke[index]["currentHp"]} maxHp={poke[index]["HP"]}/>
          <button onClick={Attaque}>Attaque</button>
          <button onClick={SpeAtt}> Special Attaque</button>
          </>
        )}
        </div>
       <div className="team2">
            {console.log(poke2)}
            <h1>Les adversaires pokemons</h1>
            {poke2.map((poke2, index2) => (
            <p key={index2} ><button key={poke2.index2} onClick={() => Change2(index2)}><strong>{poke2[" Name"]}</strong></button><br/>HP {poke2["currentHp"]} - Att {poke2["Attack"]} - Def {poke2["Defense"]}</p>
            ))}
            <button onClick={PokeUp2}>Ajouter un Pokémon</button>
            {poke2.length > 0 && (
            <>
            <p><strong>{poke2[index2][" Name"]}</strong>- currentHP {poke2[index2]["currentHp"]} / HP {poke2[index2]["HP"]}</p>
            <Pv2 currentHp={poke2[index2]["currentHp"]} maxHp={poke2[index2]["HP"]}/>
            <button onClick={Attaque2}>Attaque</button>
            <button onClick={SpeAtt2}> Special Attaque</button>
            </>
            )}
          </div>
    </div>
  );
}

export default Poke;
