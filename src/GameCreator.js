import React, { useState } from 'react';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
//import Select from 'react-select'
import './Global.sass'
import './GameCreator.sass'

export function GameCreator(props) {
  const [host, setHost] = useState("Host");
  let options = [
    {
      value: 0,
      label: `[host] ${host}`
    },
    {
      value: 1,
      label: "Human"
    },
    {
      value: 2,
      label: "Arch 2"
    },
    {
      value: 3,
      label: "RandomMove"
    },
    {
      value: 4,
      label: "BrianBot"
    },
  ];

  const [pt, setPT] = useState([0, 4, 4, 4])
  const updatePosition = (pos, selected) => {
    const newPT = pt
    newPT[pos] = selected.value
    if (selected.value === 0) {
      for (var i = 0; i < 4; i++) {
        if (newPT[i] === 0 && i !== pos) {
          newPT[i] = 1
        }
      }
    }
    console.log(newPT);
    setPT([...newPT])
    console.log(pt);
    console.log(options[pt[0]]);
    console.log(options);

  }

  const setNorth = opt => updatePosition(0, opt)
  const setEast  = opt => updatePosition(1, opt)
  const setSouth = opt => updatePosition(2, opt)
  const setWest  = opt => updatePosition(3, opt)


  return (
    <div className="create-lobby-page">
      <div className="create-lobby-container">
      <div className="create-lobby">
        <input className="drl-text-input host-name" value={host} type="text" placeholder="Host name" onChange={e => {
          setHost(e.target.value)
        }} />
        <div className="tablez">
          <div className="player-position north">
            <Dropdown className='drl-dropdown cp' options={options} value={options[pt[0]]} onChange={setNorth} placeholder="Select an option" />
          </div>
          <div className="player-position east">
            <Dropdown className='drl-dropdown cp' options={options} value={options[pt[1]]} onChange={setEast} placeholder="Select an option" />
          </div>
          <div className="player-position west">
            <Dropdown className='drl-dropdown cp' options={options} value={options[pt[3]]} onChange={setWest} placeholder="Select an option" />
          </div>
          <div className="player-position south">
            <Dropdown className='drl-dropdown cp' options={options} value={options[pt[2]]} onChange={setSouth} placeholder="Select an option" />
          </div>

        </div>
        <button className="drl-button" onClick={() => props.create([host, pt])}>Launch Game</button>
      </div>
      </div>
    </div>
  )
}

/*

*/
