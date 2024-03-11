import './App.css';
import React, { useState, useEffect } from 'react'; // Import useEffect here
import Tenzies from './tenzies';
import Confetti from 'react-confetti'

function App() {
  const [array, setArray] = useState(allNewDice());
  const [tenzie, setTenzie] = useState(false);

  useEffect(() => {
    const allHeld  = array.every(die => die.isHeld === true)
    const firstValue = array[0].value 
    const allSameValue = array.every(die => die.value === firstValue)
    if (allHeld && allSameValue) {
        setTenzie(true);
        console.log('You won');
    }
  }, [array])
  function generateNewDie() {
    return { value: Math.floor(Math.random() * 6) + 1, isHeld: false };
  }

  function allNewDice() {
    const randomarr = [];
    for (let i = 0; i < 10; i++) {
      randomarr.push(generateNewDie());
    }
    return randomarr;
  }

  useEffect(() => {
    setArray(allNewDice()); // Initialize the dice when the component mounts
  }, []); // The empty array ensures this effect only runs once, on mount

  function rollDice() {
    if (!tenzie) {
        setArray(previousSet => previousSet.map(die => {
            return die.isHeld ?
              die :
              generateNewDie();
          }));
    } else {
        setTenzie(false) 
        setArray(allNewDice())
    }
    
  }

  function holdDice(index) {
    setArray(prevArray => prevArray.map((die, i) => {
      if (i === index) {
        return { ...die, isHeld: !die.isHeld };
      }
      return die;
    }));
  }

  const diceElements = array.map((element, index) => (
    <Tenzies
      key={index}
      values={element.value}
      isHeld={element.isHeld}
      handleClick={() => holdDice(index)}
    />
  ));

  return (
    <>
    {tenzie && <Confetti />}
    <div className="App">
      <h1>Tenzies</h1>
      <p>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className="gridContainer">
        {diceElements}
      </div>
      <button className="roll" onClick={rollDice}>{tenzie === true ? 'New Game' : 'Roll'}</button>
    </div>
    
    </>
   
  );
}

export default App;