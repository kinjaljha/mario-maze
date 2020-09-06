import React from 'react';

const Box = ({element, display, onClick}) =>{
    return (
      <button className="box" onClick={() => onClick()}>
        <img src={element} alt = 'NA' style={{ display: display }} />
      </button>
    );
}

export default Box;