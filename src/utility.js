const SPRITE = 'sprite.jpeg';
const MARIO = 'mario.jpeg'; 

const validateRange = (ele, range) => {
    return ele >= range[0] && ele < range[1];
  }

export { SPRITE, MARIO, validateRange }