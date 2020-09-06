/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import Box from './Box';
import { SPRITE, MARIO , validateRange } from '../utility';

const Board = ({width, height}) => {
  const [totalBox, setTotalBox] = useState(width * height);
  const [boxes, setBoxes] = useState([]);
  const [marioLocation, setMarioLocation] = useState(Math.floor(Math.random() * (totalBox - 0) + 0));
  const [gameStartedFlag, setGameStartedFlag] = useState(false);
  const [moves, setMoves] = useState(0);
  const [xMoves, setXMoves] = useState(0);
  const [yMoves, setYMoves] = useState(0); 
  const [lastMove, setLastMove] = useState('+y'); 
  const [clickedFlag, setClickedFlag] = useState(false);

  useEffect(() => {
    if (!gameStartedFlag) {
      let spriteBoxes = [];
      for (let i = 0; i < Math.floor(Math.sqrt(totalBox) + 1); i++) {
        spriteBoxes.push(Math.floor(Math.random() * totalBox));
      }
      console.log('Sprite Boxes', spriteBoxes);
      let boxCount = 0;
      let box = JSON.parse(JSON.stringify(boxes));

      for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
          let element = boxCount === marioLocation ? MARIO : spriteBoxes.includes(boxCount) ? SPRITE : '';
          let display = spriteBoxes.includes(boxCount) || boxCount === marioLocation ? 'block' : 'none';
          box.push({ element, display, value: boxCount });
          boxCount++;
        }
      }
      setBoxes(box);
    }
  }, []);

  useEffect(() => {
    if (boxes.length && clickedFlag) {
      setTimeout(() => {
        checkForSprites();
      }, 200);
    }
  }, [boxes]);

  const getMarioRow = () => {
    let marioRow = [];
    for (let i = 0; i < height; i++) {
      if (marioLocation >= (i * width) && marioLocation < (i * width) + width) {
        marioRow = [i * width, i * width + width];
      }
    }
    return marioRow;
  };

  const moveY = (move) => {
    if (move === '+' && marioLocation + 1 - height > 0) {
      let localBoxes = JSON.parse(JSON.stringify(boxes));
      let newMarioLocation = marioLocation - height;
      localBoxes[marioLocation] = { element: '', display: 'none', value: marioLocation };
      localBoxes[newMarioLocation] = { element: MARIO, display: 'block', value: newMarioLocation };

      setGameStartedFlag(true);
      setMarioLocation(newMarioLocation);
      setBoxes(localBoxes);
      setMoves(prevMoves => prevMoves + 1);
      setYMoves(yMoves + 1);
      setXMoves(0);
      setLastMove('+y');
    } else if (move === '-' && (marioLocation + height) < totalBox) {
      let localBoxes = JSON.parse(JSON.stringify(boxes));

      let newMarioLocation = marioLocation + height;
      localBoxes[marioLocation] = { element: '', display: 'none', value: marioLocation };
      localBoxes[newMarioLocation] = { element: MARIO, display: 'block', value: newMarioLocation };

      setGameStartedFlag(true);
      setMarioLocation(newMarioLocation);
      setBoxes(localBoxes);
      setMoves(prevMoves => prevMoves + 1);
      setYMoves(yMoves + 1);
      setXMoves(0);
      setLastMove('-y');
    } else {
      lastMove === '+y' ? moveY('-') : lastMove === '-y' ? moveY('+') : setLastMove('+y');
    }
  };

  const moveX = (move) => {
    if (move === '+' && (marioLocation + 2) % width !== 1 && (marioLocation + 1) < totalBox) {
      let localBoxes = JSON.parse(JSON.stringify(boxes));

      let newMarioLocation = marioLocation + 1;
      localBoxes[marioLocation] = { element: '', display: 'none', value: marioLocation };
      localBoxes[newMarioLocation] = { element: MARIO, display: 'block', value: newMarioLocation };

      setGameStartedFlag(true);
      setMarioLocation(newMarioLocation);
      setBoxes(localBoxes);
      setMoves(prevMoves => prevMoves + 1);
      setXMoves(xMoves + 1);
      setYMoves(0);
      setLastMove('+x');
    } else if (move === '-' && (marioLocation % width) !== 0 && (marioLocation - 1) >= 0) {
      let localBoxes = JSON.parse(JSON.stringify(boxes));

      let newMarioLocation = marioLocation - 1;
      localBoxes[marioLocation] = { element: '', display: 'none', value: marioLocation };
      localBoxes[newMarioLocation] = { element: MARIO, display: 'block', value: newMarioLocation };

      setGameStartedFlag(true);
      setMarioLocation(newMarioLocation);
      setBoxes(localBoxes);
      setMoves(prevMoves => prevMoves + 1);
      setXMoves(xMoves + 1);
      setYMoves(0);
      setLastMove('-x');
    } else {
      lastMove === '+x' ? moveX('-') : lastMove === '-x' ? moveX('+') : setLastMove('+x');
    }
  };

  const makeMove = (spriteLocations) => {
    let spriteLocation = spriteLocations[0];
    let distance = Math.abs(spriteLocation - marioLocation);
    let marioRow = getMarioRow();

    if ((distance < width) && (spriteLocation < marioLocation) && validateRange(spriteLocation, marioRow)) moveX('-');
    else if ((distance < width) && (spriteLocation < marioLocation) && !validateRange(spriteLocation, marioRow)) moveY('+');
    else if ((distance < width) && (spriteLocation > marioLocation) && validateRange(spriteLocation, marioRow)) moveX('+');
    else if ((distance < width) && (spriteLocation < marioLocation) && !validateRange(spriteLocation, marioRow)) moveY('-');
    else if ((distance >= width) && (spriteLocation < marioLocation)) moveY('+');
    else moveY('-');
  };

  const checkForSprites = () => {
    if (boxes.length) {
      let sprites = boxes.filter((box) => box.element === SPRITE);
      if (sprites.length === 0) {
        alert(`Game over. Total moves to save princess: ${moves+1}`);
      } else {
        let spriteLocations = sprites.map((sprite) => sprite.value);
        makeMove(spriteLocations);
      }
    }
  };

  const onClick = (i) => {
    setClickedFlag(true);
    if (i === marioLocation) checkForSprites();
  };

  const makeBox = (i) => {
    if (boxes.length) return <Box key={i} value={i} element={boxes[i].element} display={boxes[i].display} onClick={() => onClick(i)} />;
  };

  const addRow = (boxes) => {
    return <div className='board-row'>{boxes}</div>;
  };

  const makeBoard = () => {
    let board = [];
    let rows = [];
    for (let i = 0, boxCount = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
        rows.push(makeBox(boxCount));
        boxCount++;
      }
      board.push(addRow(rows));
      rows = [];
    }
    return board;
  };

  return <div>{makeBoard()}</div>;
};

export default Board;
