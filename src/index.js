import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import Board from './components/Board';

const Maze = () => {
  
  const validateInput = (inputData, dimension) => {
    inputData = parseInt(inputData);
    console.log("INPUT after parse", inputData);
    if(Number.isNaN(inputData)){
      return {
        validFlag: false,
        message: `${inputData} is invalid, Kindly enter a valid ${dimension}`
      }
    }
    else if(inputData < 0){
      return {
        validFlag: false,
        message: `${inputData} is invalid, Kindly enter a positive ${dimension}`
      }
    }
    else{
      return {
        validFlag: true,
        inputData
      }
    }

  } 

  let width = validateInput(prompt("Enter board width"),'width');
  while(!width.validFlag) width = validateInput(prompt(width.message), 'width');

  let height = validateInput(prompt("Enter board height"),'height');
  while(!height.validFlag) height = validateInput(prompt(height.message), 'height');

  return (
    <div className="maze">
        <div className="game-board"> 
          <Board width={width.inputData} height={height.inputData} />
        </div>
    </div>
  )

}

ReactDOM.render(
    <Maze />,
  document.getElementById('root')
);
