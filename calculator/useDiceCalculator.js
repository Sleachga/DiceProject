import { useState } from 'react';
import { last, slice } from 'lodash';

const useDiceCalculator = () => {
  const [formula, setFormula] = useState([]);

  const push = (item) => setFormula([...formula, item]);
  const pop = () => {
    const lastElement = last(formula);
    setFormula(slice(formula, 0, -1));
    return lastElement;
  };
  const clear = () => setFormula([]);

  const pushIfValid = (data) => {
    if (isValid(formula)) push(data);
  };

  return [formula, { push: pushIfValid, pop, clear, roll }];
};

const isValid = (formula) => {
  return true;
};

const roll = (formula) => {
  console.log('Rolled!');
};

export default useDiceCalculator;
