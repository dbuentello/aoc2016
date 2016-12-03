const expect = require('expect');

function main(steps) {

  let marker = {x: 0, y: 0}; // starting positions in center of grid
  let _cordToggler = true; // used to toggle between coordinates
  let _lastDir; // last direction
  let funcProcessStep; // processes each step in sequence
  let funcToggleCoordinate; // keeps track of which coordinate (x or y) we are modifying
  let funcDirectionizer; // keeps track of left/right turns

  funcDirectionizer = (direction) => {
    let isSame = (direction === _lastDir);
    _lastDir = direction;
    return isSame
  };
  funcToggleCoordinate = () => {
    _cordToggler = !_cordToggler;
    return _cordToggler ? 'y' : 'x';
  };

  funcProcessStep = (step) => {
    let stepDirection = step.substr(0, 1); // L or R
    let stepAmount = parseInt(step.substr(1)); // number of steps

    let _currCord = funcToggleCoordinate();
    let _lastDir = funcDirectionizer(stepDirection);
    // same as last direction, subtract
    if (_lastDir) {
      marker[_currCord] = marker[_currCord] - stepAmount;
    } else {
      marker[_currCord] = marker[_currCord] + stepAmount;
    }
  };

  steps.forEach(funcProcessStep);
  console.log(marker);
  return Math.abs(marker.x) + Math.abs(marker.y);
}

expect(main(["R2", "L3"])).toEqual(5); // 2, 3
expect(main(["R2", "R2", "R2"])).toEqual(2); // 0, -2
expect(main(["R5", "L5", "R5", "R3"])).toEqual(12); // 10, 2
expect(main(["R2", "R2", "R2", "R2"])).toEqual(0); // 0, 0 FAIL!!