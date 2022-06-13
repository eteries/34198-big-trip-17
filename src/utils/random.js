const validateRange = (from, to) => {
  if (from < 0 || to < 0) {
    throw new RangeError('The arguments can\'t be negative');
  }

  if (from > to) {
    throw new RangeError('The first argument must not be greater than the second one');
  }
};

const getRandomInt = (from, to) => {
  validateRange(from, to);

  return Math.round(from + Math.random() * (to - from));
};

const getUniqueRandomInt = (from, to) => {
  const taken = [];

  return function () {
    while (taken.length <= to - from) {
      const num = getRandomInt(from, to);

      if (taken.includes(num)) {
        continue;
      }

      taken.push(num);
      return num;
    }
  };
};

export { getRandomInt, getUniqueRandomInt };
